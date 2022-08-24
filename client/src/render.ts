import * as twgl from "twgl.js";
import vert from "./glsl/vertex";
import frag from "./glsl/fragment";
import * as w from "./world";
import Rgb from "./color";
import { setChunk, setWorld } from "./graphics/world";
import { buildChunk } from "./chunk";

twgl.setDefaults({ attribPrefix: "a_" });

const canvas = document.getElementById("game")! as HTMLCanvasElement;
const gl = canvas.getContext("webgl");
if (!gl) throw new Error("Your browser does not support WebGL.");

const programInfo = twgl.createProgramInfo(gl, [vert, frag]);

const arrays = {
  position: {
    numComponents: 2,
    data: [],
  },
  color: { numComponents: 4, data: [] },
};

const world: w.World = {
  chunks: [
    buildChunk(
      [
        { pos: new w.Vec2(0, 0), color: new Rgb(255, 0, 0) },
        { pos: new w.Vec2(1, 0), color: new Rgb(255, 255, 0) },
      ],
      new w.Vec2(0, 0)
    ),
    buildChunk(
      [
        { pos: new w.Vec2(0, 0), color: new Rgb(255, 0, 0) },
        { pos: new w.Vec2(1, 0), color: new Rgb(255, 255, 255) },
      ],
      new w.Vec2(1, 0)
    ),
  ],
};

setWorld(gl, arrays, world);
const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

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
