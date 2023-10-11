precision mediump float;

varying vec2 vTexCoord;
uniform float hoverDelta;

// Get the normal from the vertex shader
varying vec3 vNormal;

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {
  vec3 colorA = vec3(0.5, 0.9, 0.73);
  float r1 = map(vNormal.y, 1., -1., 0.5-0.2, 0.5+0.19);
  float g1 = map(vNormal.y, 1., -1., 0.9-0.2, 0.9+0.19);
  float b1 = map(vNormal.y, 1., -1., 0.73-0.2, 0.73+0.19);
  vec3 colorB = vec3(r1, g1, b1);
  vec3 color = mix(colorA, colorB, hoverDelta);

  // Lets just draw the texcoords to the screen
  gl_FragColor = vec4(color, 1.0);
}
