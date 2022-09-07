import * as twgl from "twgl.js";
import Rgb from "../color";
import { Chunk, Entity, Pixel, World } from "../world";
import * as prim from "./primitives";

type Arrays = {
  [key: string]: twgl.FullArraySpec;
};

export const setPixel = (
  gl: WebGLRenderingContext,
  arrays: Arrays,
  pixel: Pixel
) => {
  prim.setRect(gl, arrays, pixel.pos.mul(8), 8, 8, pixel.color);
};

export const setChunk = (
  gl: WebGLRenderingContext,
  arrays: Arrays,
  chunk: Chunk
) => {
  if (chunk.background)
    prim.setRect(
      gl,
      arrays,
      chunk.pos.mul(32 * 8),
      32 * 8,
      32 * 8,
      chunk.background
    );

  for (const x in chunk.pixels) {
    for (const y in chunk.pixels[x]) {
      const pixel = chunk.pixels[x][y];
      if (!pixel) continue;
      setPixel(gl, arrays, pixel);
    }
  }
};

export const setEntity = (
  gl: WebGLRenderingContext,
  arrays: Arrays,
  entity: Entity
) => {
  prim.setRect(
    gl,
    arrays,
    entity.pos.mul(8).sub(entity.size.mul(4)),
    entity.size.x * 8,
    entity.size.y * 8,
    new Rgb(255, 0, 0)
  );
};

export const setWorld = (
  gl: WebGLRenderingContext,
  arrays: Arrays,
  world: World
) => {
  for (const chunk of world.chunks.values()) {
    setChunk(gl, arrays, chunk);
  }

  for (const entity of world.entities.values()) {
    setEntity(gl, arrays, entity);
  }
};
