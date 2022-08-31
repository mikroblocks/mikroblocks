import { BinaryReader } from "@protobuf-ts/runtime";
import Rgb from "../color";
import { Chunk, Vec2, World } from "../world";
import * as n from "./vanilla";

export const init = (initPacket: n.Init) => {
  if (initPacket.type !== "vanilla")
    console.warn(
      "[mkrwds] The server that you are connecting to isn't running vanilla mikroworlds."
    );
  if (initPacket.version !== "0.1.0")
    console.warn("[mkrwds] The server isn't running the same version as you");
};

export const chunkBytesToChunk = (chunkBytes: n.Chunk): Chunk => {
  const chunk: Chunk = {
    pos: new Vec2(chunkBytes.x, chunkBytes.y),
    background: chunkBytes.background
      ? Rgb.fromBytes(chunkBytes.background)
      : new Rgb(0, 0, 0),
    pixels: Array.from(Array(32), () => new Array(32)),
  };

  const pallete: Rgb[] = [];

  for (let i = 0; i < chunkBytes.pallete.length; i += 3) {
    pallete.push(Rgb.fromBytes(chunkBytes.pallete, i));
  }

  for (let i = 0; i < chunkBytes.pixels.length; i++) {
    const x = i % 32;
    const y = Math.floor(i / 32);
    const byte = chunkBytes.pixels[i];
    if (byte === 0) {
      chunk.pixels[y][x] = null;
    } else {
      chunk.pixels[y][x] = {
        pos: chunk.pos.mul(32).add(new Vec2(x, y)),
        color: pallete[byte - 1].clone(),
      };
    }
  }

  return chunk;
};

export const updateChunks = (
  world: World,
  updateChunksPacket: n.UpdateChunks
) => {
  for (const chunkBytes of updateChunksPacket.chunks) {
    const chunk = chunkBytesToChunk(chunkBytes);
    world.chunks.set(chunk.pos.clone(), chunk);
  }
};

export const handlePacket = (world: World, packet: Uint8Array) => {
  const packetType = packet.slice(0, 1)[0];
  const message = packet.subarray(1);
  switch (packetType) {
    case 2:
      return updateChunks(
        world,
        n.UpdateChunks.fromBinary(new Uint8Array(message))
      );
  }
};
