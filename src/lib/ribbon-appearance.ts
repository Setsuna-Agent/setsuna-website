import {
  Color,
  DataTexture,
  LinearFilter,
  LinearMipmapLinearFilter,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PlaneGeometry,
  PMREMGenerator,
  RepeatWrapping,
  RGBAFormat,
  Scene,
  Vector2,
  type WebGLRenderer,
} from "three";

/** Fine, directional machining marks. Both maps contain linear material data. */
function createBrushedMaps(renderer: WebGLRenderer) {
  const width = 256;
  const height = 512;
  const normalPixels = new Uint8Array(width * height * 4);
  const roughnessPixels = new Uint8Array(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const u = (x / width) * Math.PI * 2;
      const v = (y / height) * Math.PI * 2;
      // Integer frequencies make the machining marks tile without a visible seam.
      const grain =
        Math.sin(v * 97 + Math.sin(u * 2) * 0.3) * 0.6 +
        Math.sin(v * 173 - Math.cos(u * 3) * 0.2) * 0.4;
      const variation = Math.sin(u * 17 + v * 211) * 0.012;
      const offset = (y * width + x) * 4;
      const roughness = Math.round((0.76 + grain * 0.055 + variation) * 255);

      normalPixels.set([128, Math.round(128 + grain * 15), 255, 255], offset);
      roughnessPixels.set([roughness, roughness, roughness, 255], offset);
    }
  }

  const normalMap = new DataTexture(normalPixels, width, height, RGBAFormat);
  const roughnessMap = new DataTexture(
    roughnessPixels,
    width,
    height,
    RGBAFormat,
  );
  for (const texture of [normalMap, roughnessMap]) {
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.magFilter = LinearFilter;
    texture.minFilter = LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
    texture.needsUpdate = true;
  }

  return { normalMap, roughnessMap };
}

export function createRibbonAppearance(renderer: WebGLRenderer) {
  // A dark studio with large softboxes gives metal deliberate bright and dark
  // reflections. These panels only enter the environment map, not the hero.
  const studio = new Scene();
  studio.background = new Color(0x161616);
  const panelGeometry = new PlaneGeometry();
  const panelMaterials: MeshBasicMaterial[] = [];

  function addSoftbox(
    position: [number, number, number],
    size: [number, number],
    color: number,
    intensity: number,
  ) {
    const material = new MeshBasicMaterial({
      color: new Color(color).multiplyScalar(intensity),
    });
    const panel = new Mesh(panelGeometry, material);
    panel.position.set(...position);
    panel.scale.set(size[0], size[1], 1);
    panel.lookAt(0, 0, 0);
    studio.add(panel);
    panelMaterials.push(material);
  }

  addSoftbox([-3, 2, 4], [2.8, 5], 0xf5f5f5, 4);
  addSoftbox([3, 0.5, 2], [0.5, 5], 0xe3e3e3, 5);
  addSoftbox([-1, 1, -4], [3.5, 3], 0xe8e8e8, 2);
  addSoftbox([0, 5, 0], [4, 1.4], 0xffffff, 2.5);
  addSoftbox([0, -3, 4], [4, 1.6], 0xe5e5e5, 0.5);

  const pmrem = new PMREMGenerator(renderer);
  const environment = pmrem.fromScene(studio, 0.035);
  panelGeometry.dispose();
  panelMaterials.forEach((material) => material.dispose());
  pmrem.dispose();

  const { normalMap, roughnessMap } = createBrushedMaps(renderer);
  const material = new MeshPhysicalMaterial({
    color: 0xcecece,
    metalness: 1,
    roughness: 0.38,
    roughnessMap,
    normalMap,
    normalScale: new Vector2(0.25, 0.35),
    anisotropy: 0.7,
    clearcoat: 0.15,
    clearcoatRoughness: 0.3,
    envMapIntensity: 1.1,
  });

  return {
    material,
    environment: environment.texture,
    dispose() {
      normalMap.dispose();
      roughnessMap.dispose();
      material.dispose();
      environment.dispose();
    },
  };
}
