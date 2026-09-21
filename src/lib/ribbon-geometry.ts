import { BufferGeometry, Float32BufferAttribute, Vector3 } from "three";

/** A thin, rounded metal ribbon with one half-twist around its elliptical loop. */
export function createRibbonGeometry() {
  const pathSegments = 256;
  const profileSegments = 48;
  const stride = profileSegments + 1;
  const radius = 1.6;
  const halfWidth = 0.46;
  const halfThickness = 0.045;
  const positions: number[] = [];
  const normals: number[] = [];
  const tangents: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const pathTangent = new Vector3();
  const profileTangent = new Vector3();
  const normal = new Vector3();

  // Duplicate the UV seams; analytical normals keep the metal reflection smooth
  // where the half-twist brings the opposite sides of the profile together.
  for (let segment = 0; segment <= pathSegments; segment++) {
    const angle = (segment / pathSegments) * Math.PI * 2;
    const twist = angle / 2 - Math.PI / 6;

    for (let point = 0; point <= profileSegments; point++) {
      const profileAngle = (point / profileSegments) * Math.PI * 2;
      const across = Math.cos(profileAngle) * halfWidth;
      const thickness = Math.sin(profileAngle) * halfThickness;
      const radialOffset =
        across * Math.cos(twist) - thickness * Math.sin(twist);
      const depth = across * Math.sin(twist) + thickness * Math.cos(twist);

      positions.push(
        (radius + radialOffset) * Math.cos(angle),
        (radius + radialOffset) * Math.sin(angle) * 1.12,
        depth + Math.sin(angle * 2) * 0.12,
      );

      const radialDerivative = -depth / 2;
      pathTangent.set(
        radialDerivative * Math.cos(angle) -
          (radius + radialOffset) * Math.sin(angle),
        (radialDerivative * Math.sin(angle) +
          (radius + radialOffset) * Math.cos(angle)) *
          1.12,
        radialOffset / 2 + Math.cos(angle * 2) * 0.24,
      );
      const widthDerivative = -Math.sin(profileAngle) * halfWidth;
      const thicknessDerivative = Math.cos(profileAngle) * halfThickness;
      const profileRadialDerivative =
        widthDerivative * Math.cos(twist) -
        thicknessDerivative * Math.sin(twist);
      profileTangent.set(
        profileRadialDerivative * Math.cos(angle),
        profileRadialDerivative * Math.sin(angle) * 1.12,
        widthDerivative * Math.sin(twist) +
          thicknessDerivative * Math.cos(twist),
      );
      normal.crossVectors(pathTangent, profileTangent).normalize();
      pathTangent.normalize();
      normals.push(normal.x, normal.y, normal.z);
      tangents.push(pathTangent.x, pathTangent.y, pathTangent.z, 1);
      // Two repeats across the profile also match at the half-turn seam.
      uvs.push(segment / pathSegments, (point / profileSegments) * 2);

      if (segment < pathSegments && point < profileSegments) {
        const a = segment * stride + point;
        const b = a + stride;
        indices.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new Float32BufferAttribute(normals, 3));
  geometry.setAttribute("tangent", new Float32BufferAttribute(tangents, 4));
  geometry.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  return geometry;
}
