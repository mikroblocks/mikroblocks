export default `precision mediump float;
uniform vec2 u_resolution;
uniform mat4 u_matrix;

attribute vec2 a_position;
attribute vec4 a_color;
varying vec4 v_color;

void main() {     
  gl_Position = vec4((vec4(a_position, 0, 1) * u_matrix).xy, 0, 1);
  v_color = a_color;
}`;
