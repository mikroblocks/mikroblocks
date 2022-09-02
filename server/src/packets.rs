use crate::{
    vanilla::*,
    world::{EncodeNet, World},
};
use glam::IVec2;
use prost::Message;

pub fn init() -> Vec<u8> {
    let mut buf = Vec::new();
    let init = Init {
        r#type: String::from("vanilla"),
        version: String::from("0.1.0"),
    };

    buf.push(1);
    buf.reserve(init.encoded_len());
    init.encode(&mut buf).unwrap();

    buf
}

pub fn update_chunks(world: World, pos: Vec<IVec2>) -> Vec<u8> {
    let mut buf = Vec::new();
    let mut update_chunks = UpdateChunks { chunks: Vec::new() };

    for p in pos {
        if let Some(chunk) = world.chunks.get(&p) {
            update_chunks.chunks.push(chunk.encode_net());
        }
    }

    buf.push(1);
    buf.reserve(update_chunks.encoded_len());
    update_chunks.encode(&mut buf).unwrap();

    buf
}
