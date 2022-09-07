import Rgb from "../color";
import { Chunk, Entity, Vec2, World } from "../world";
import * as n from "./vanilla";

export const init = (initPacket: n.Init) => {
  if (initPacket.type !== "vanilla")
    console.warn(
      "[mkrwds] The server that you are connecting to isn't running vanilla mikroworlds."
    );
  if (initPacket.version !== "0.1.0")
    console.warn("[mkrwds] The server isn't running the same version as you");
};

export const chunkNetToChunk = (chunkNet: n.Chunk): Chunk => {
  const chunk: Chunk = {
    pos: new Vec2(chunkNet.x, chunkNet.y),
    background: chunkNet.background
      ? Rgb.fromBytes(chunkNet.background)
      : new Rgb(0, 0, 0),
    pixels: Array.from(Array(32), () => new Array(32)),
  };

  const pallete: Rgb[] = [];

  for (let i = 0; i < chunkNet.pallete.length; i += 3) {
    pallete.push(Rgb.fromBytes(chunkNet.pallete, i));
  }

  for (let i = 0; i < chunkNet.pixels.length; i++) {
    const x = i % 32;
    const y = Math.floor(i / 32);
    const byte = chunkNet.pixels[i];
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
  for (const chunkNet of updateChunksPacket.chunks) {
    const chunk = chunkNetToChunk(chunkNet);
    world.chunks.set(chunk.pos.clone(), chunk);
  }
};

export const entityNetToEntity = (entityNet: n.Entity): Entity => {
  const entity: Entity = {
    id: entityNet.id,
    pos: new Vec2(entityNet.x, entityNet.y),
    size: new Vec2(entityNet.width, entityNet.height),
  }

  return entity
}

export const updateEntities = (world: World, updateEntitiesPacket: n.UpdateEntities) => {
  for (const entityNet of updateEntitiesPacket.entities) {
    const entity: Entity = entityNetToEntity(entityNet);
    world.entities.set(entity.id, entity);
  }
}

export const handlePacket = (world: World, message: Uint8Array) => {
  const packetType = message.slice(0, 1)[0];
  const packet = message.subarray(1);
  switch (packetType) {
    case 1:
      return init(n.Init.fromBinary(packet));
    case 2:
      return updateChunks(world, n.UpdateChunks.fromBinary(packet));
    case 3:
      return updateEntities(world, n.UpdateEntities.fromBinary(packet));
  }
};
