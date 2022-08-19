export default `precision mediump float;
uniform vec2 u_resolution;

attribute vec2 a_position;
attribute vec4 a_color;

varying vec4 v_color;

void main() {
    vec2 zeroToOne = a_position / u_resolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;
    gl_Position = vec4(clipSpace, 0.0, 1.0);
    v_color = vec4(a_position.xyx, 1);
}`;
