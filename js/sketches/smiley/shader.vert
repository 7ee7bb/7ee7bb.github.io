// Get the position attribute of the geometry
attribute vec3 aPosition;

// Get the texture coordinate attribute from the geometry
attribute vec2 aTexCoord;

// Get the vertex normal attribute from the geometry
attribute vec3 aNormal;

// When we use 3d geometry, we need to also use some builtin variables that p5 provides
// Most 3d engines will provide these variables for you. They are 4x4 matrices that define
// the camera position / rotation, and the geometry position / rotation / scale
// There are actually 3 matrices, but two of them have already been combined into a single one
// This pre combination is an optimization trick so that the vertex shader doesn't have to do as much work

// uProjectionMatrix is used to convert the 3d world coordinates into screen coordinates 
uniform mat4 uProjectionMatrix;

// uModelViewMatrix is a combination of the model matrix and the view matrix
// The model matrix defines the object position / rotation / scale
// Multiplying uModelMatrix * vec4(aPosition, 1.0) would move the object into it's world position

// The view matrix defines attributes about the camera, such as focal length and camera position
// Multiplying uModelViewMatrix * vec4(aPosition, 1.0) would move the object into its world position in front of the camera
uniform mat4 uModelViewMatrix;

// Get the framecount uniform
uniform float uFrameCount;
uniform float clickDelta;

varying vec2 vTexCoord;
varying vec3 vNormal;

void main() {

  // copy the position data into a vec4, using 1.0 as the w component
  vec3 p = vec3(aPosition);

  // Frequency and Amplitude will determine the look of the displacement
  float frequency = 20.0;

  float distortion = sin(p.y * frequency - uFrameCount * 0.1)* clickDelta;
  p = p*(1.0+(distortion*0.05));

  // Send the normal to the fragment shader
  vNormal = aNormal;

  // Move our vertex positions into screen space
  // The order of multiplication is always projection * view * model * position
  // In this case model and view have been combined so we just do projection * modelView * position
  
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(p, 1);

  // Send the texture coordinates to the fragment shader
  vTexCoord = aTexCoord;
}