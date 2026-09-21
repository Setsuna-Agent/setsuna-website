"use client";

import { useEffect, useRef } from "react";

export function HeroSculpture() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    // Keep WebGL out of the initial route bundle; the page works without it.
    async function mountScene() {
      const [THREE, { createRibbonAppearance }, { createRibbonGeometry }] =
        await Promise.all([
          import("three"),
          import("@/lib/ribbon-appearance"),
          import("@/lib/ribbon-geometry"),
        ]);
      if (disposed || !host) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
      } catch {
        return; // Retain the static orbit when WebGL is unavailable.
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 30);
      camera.position.set(0, 0, 8.6);

      const appearance = createRibbonAppearance(renderer);
      scene.environment = appearance.environment;

      const geometry = createRibbonGeometry();
      const sculpture = new THREE.Mesh(geometry, appearance.material);
      const restingRotation = new THREE.Euler(0.28, -0.48, -0.48);
      sculpture.rotation.copy(restingRotation);
      scene.add(sculpture);

      const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
      const pointer = { x: 0, y: 0 };
      const smoothPointer = { x: 0, y: 0 };
      let visible = true;
      let frame = 0;
      let time = 0;
      let lastTime = 0;

      function render() {
        renderer.render(scene, camera);
      }

      function animate(now: number) {
        frame = 0;
        if (disposed || !visible || document.hidden || motion.matches) return;
        // Clamp elapsed time so returning to a hidden tab never jumps the sculpture.
        const delta = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0;
        time += delta;
        lastTime = now;
        const easing = 1 - Math.exp(-delta * 4);
        smoothPointer.x += (pointer.x - smoothPointer.x) * easing;
        smoothPointer.y += (pointer.y - smoothPointer.y) * easing;
        sculpture.rotation.x =
          restingRotation.x +
          Math.sin(time * 0.2) * 0.06 +
          smoothPointer.y * 0.08;
        sculpture.rotation.y =
          restingRotation.y +
          Math.sin(time * 0.16) * 0.16 +
          smoothPointer.x * 0.14;
        sculpture.rotation.z = restingRotation.z + Math.sin(time * 0.12) * 0.04;
        sculpture.position.y = Math.sin(time * 0.55) * 0.055;
        render();
        frame = requestAnimationFrame(animate);
      }

      function syncAnimation() {
        cancelAnimationFrame(frame);
        frame = 0;
        lastTime = 0;
        if (motion.matches) {
          sculpture.rotation.copy(restingRotation);
          sculpture.position.y = 0;
          render();
        } else if (visible && !document.hidden) {
          frame = requestAnimationFrame(animate);
        }
      }

      function onPointerMove(event: PointerEvent) {
        const bounds = host!.getBoundingClientRect();
        pointer.x = (event.clientX - bounds.left) / bounds.width - 0.5;
        pointer.y = (event.clientY - bounds.top) / bounds.height - 0.5;
      }

      function onPointerLeave() {
        pointer.x = 0;
        pointer.y = 0;
      }

      const resize = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect;
        if (!width || !height) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        render();
      });
      resize.observe(host);

      // Pause GPU work as soon as the hero leaves the viewport.
      const visibility = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        syncAnimation();
      });
      visibility.observe(host);
      host.addEventListener("pointermove", onPointerMove);
      host.addEventListener("pointerleave", onPointerLeave);
      document.addEventListener("visibilitychange", syncAnimation);
      motion.addEventListener("change", syncAnimation);
      host.dataset.ready = "true";
      syncAnimation();

      cleanup = () => {
        cancelAnimationFrame(frame);
        resize.disconnect();
        visibility.disconnect();
        host.removeEventListener("pointermove", onPointerMove);
        host.removeEventListener("pointerleave", onPointerLeave);
        document.removeEventListener("visibilitychange", syncAnimation);
        motion.removeEventListener("change", syncAnimation);
        geometry.dispose();
        appearance.dispose();
        renderer.dispose();
        renderer.domElement.remove();
        delete host.dataset.ready;
      };
    }

    void mountScene().catch(() => {
      // Decorative enhancement: a blocked chunk must not interrupt navigation.
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div className="sculpture-scene" aria-hidden="true">
      <div className="sculpture-halo" />
      <div className="sculpture-canvas" ref={hostRef}>
        <div className="sculpture-fallback">
          <i />
        </div>
      </div>
      <div className="sculpture-shadow" />
    </div>
  );
}
