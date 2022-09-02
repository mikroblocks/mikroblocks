use crate::vanilla;
use glam::Vec2;
use prost::Message;
use std::collections::HashMap;

trait EncodeNet {
    type Output: prost::Message;
    fn encode_net(&self) -> Self::Output;
    fn encode_ws(&self) -> Vec<u8> {
        let mut buf = Vec::new();
        let net_struct = self.encode_net();
        buf.reserve(net_struct.encoded_len());
        net_struct.encode(&mut buf).unwrap();

        buf

    }
}

pub struct World {
    pub chunks: HashMap<Vec2, Chunk>,
    pub background: [u8; 3],
}

impl EncodeNet for World {
    type Output = vanilla::UpdateWorld;
    fn encode_net(&self) -> Self::Output {
        let mut update_world_packet = vanilla::UpdateWorld {
            chunks: Vec::new(),
            background: None,
        };

        for (pos, chunk) in self.chunks.iter() {
            update_world_packet.chunks.push(chunk.encode_net());
        }

        update_world_packet
    }
}

pub struct Chunk {
    pub pos: Vec2,
    pub background: [u8; 3],
    pub pixels: [[Option<Pixel>; 32]; 32],
    // For caching. expected to be correct
    pub pallete: Vec<[u8; 3]>,
    pub colors: [[u8; 32]; 32],
}

impl Chunk {
    fn rebuild_cache(&mut self) {
        // Maybe clear the pallete just in case?
        let mut colors = self.colors.flatten_mut();
        for (i, p) in self.pixels.flatten().iter().enumerate() {
            if let Some(pixel) = p {
                if let Some(pallete_index) = self.pallete.iter().position(|&i| i == pixel.color) {
                    colors[i] = pallete_index as u8 + 1;
                } else {
                    assert!(self.pallete.len() > 255);
                    self.pallete.push(pixel.color);
                    colors[i] = self.pallete.len() as u8;
                }
            } else {
                colors[i] = 0;
            }
        }
    }
}

impl EncodeNet for Chunk {
    type Output = vanilla::Chunk;
    fn encode_net(&self) -> Self::Output {
        self.rebuild_cache();
        let mut chunk_net = vanilla::Chunk {
            x: self.pos.x as i32,
            y: self.pos.y as i32,
            background: Some(self.background.to_vec()),
            pixels: Vec::new(),
            pallete: Vec::new(),
        };
        chunk_net.pallete = self.pallete.flatten().to_vec();
        chunk_net.pixels = self.colors.flatten().to_vec();

        chunk_net
    }
}

pub struct Pixel {
    color: [u8; 3],
    pos: Vec2,
    solid: bool,
}
