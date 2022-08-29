use prost_build;
fn main() {
    prost_build::compile_protos(&["../vanilla.proto"],
                                &["../"]).unwrap();
}