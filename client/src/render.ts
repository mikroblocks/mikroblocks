import * as twgl from "twgl.js";
import vert from "./glsl/vertex";
import frag from "./glsl/fragment";

twgl.setDefaults({ attribPrefix: "a_" });

const canvas = document.getElementById("game")! as HTMLCanvasElement;
const gl = canvas.getContext("webgl");
if (!gl) throw new Error("Your browser does not support WebGL.");

const programInfo = twgl.createProgramInfo(gl, [vert, frag]);

const arrays = {
  position: {
    numComponents: 2,
    data: [
      10,  10,
      110, 10,
      10, 110,
      10, 110,
      110, 10,
      110, 110,
    ],
  },
  color: { numComponents: 4, data: [1, 0, 0, 1] },
};

const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

console.log(bufferInfo);

// make a function to render a single chunck
export const render = (dt: number) => {
  twgl.resizeCanvasToDisplaySize(gl.canvas);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  const uniforms = {
    u_dt: dt * 0.001,
    u_resolution: [gl.canvas.width, gl.canvas.height],
  };

  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(programInfo.program);

  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
  twgl.setUniforms(programInfo, uniforms);

  twgl.drawBufferInfo(gl, bufferInfo);

  requestAnimationFrame(render);
};
