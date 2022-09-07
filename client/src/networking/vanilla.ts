// @generated by protobuf-ts 2.8.0
// @generated from protobuf file "vanilla.proto" (package "mikroblocks.vanilla", syntax proto3)
// tslint:disable
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * id: 1
 *
 * @generated from protobuf message mikroblocks.vanilla.Init
 */
export interface Init {
    /**
     * What type of server this is (vanilla)
     *
     * @generated from protobuf field: string type = 1;
     */
    type: string;
    /**
     * What version the server is running
     *
     * @generated from protobuf field: string version = 2;
     */
    version: string;
}
/**
 * @generated from protobuf message mikroblocks.vanilla.Chunk
 */
export interface Chunk {
    /**
     * @generated from protobuf field: int32 x = 1;
     */
    x: number;
    /**
     * @generated from protobuf field: int32 y = 2;
     */
    y: number;
    /**
     * Each pixel is represented by 1 byte which corresponds to an id in the pallete.
     * If the byte equal 0, it is considered nothing
     *
     * @generated from protobuf field: bytes pixels = 3;
     */
    pixels: Uint8Array;
    /**
     * The pallete is a list of colors. At most, a pallete can only have 255 colors.
     *
     * @generated from protobuf field: bytes pallete = 4;
     */
    pallete: Uint8Array;
    /**
     * Three bytes
     *
     * @generated from protobuf field: optional bytes background = 5;
     */
    background?: Uint8Array;
}
/**
 * @generated from protobuf message mikroblocks.vanilla.Entity
 */
export interface Entity {
    /**
     * @generated from protobuf field: uint32 id = 1;
     */
    id: number;
    /**
     * @generated from protobuf field: double x = 2;
     */
    x: number;
    /**
     * @generated from protobuf field: double y = 3;
     */
    y: number;
    /**
     * In pixels
     *
     * @generated from protobuf field: uint32 width = 4;
     */
    width: number;
    /**
     * @generated from protobuf field: uint32 height = 5;
     */
    height: number;
}
/**
 * id: 2
 *
 * @generated from protobuf message mikroblocks.vanilla.UpdateChunks
 */
export interface UpdateChunks {
    /**
     * @generated from protobuf field: repeated mikroblocks.vanilla.Chunk chunks = 1;
     */
    chunks: Chunk[];
}
/**
 * id: 3
 *
 * @generated from protobuf message mikroblocks.vanilla.UpdateEntities
 */
export interface UpdateEntities {
    /**
     * @generated from protobuf field: repeated mikroblocks.vanilla.Entity entities = 1;
     */
    entities: Entity[];
}
/**
 * id: 4
 *
 * @generated from protobuf message mikroblocks.vanilla.KeyboardInput
 */
export interface KeyboardInput {
    /**
     * @generated from protobuf field: uint32 char = 1;
     */
    char: number;
}
// @generated message type with reflection information, may provide speed optimized methods
class Init$Type extends MessageType<Init> {
    constructor() {
        super("mikroblocks.vanilla.Init", [
            { no: 1, name: "type", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "version", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<Init>): Init {
        const message = { type: "", version: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Init>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Init): Init {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string type */ 1:
                    message.type = reader.string();
                    break;
                case /* string version */ 2:
                    message.version = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Init, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string type = 1; */
        if (message.type !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.type);
        /* string version = 2; */
        if (message.version !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.version);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message mikroblocks.vanilla.Init
 */
export const Init = new Init$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Chunk$Type extends MessageType<Chunk> {
    constructor() {
        super("mikroblocks.vanilla.Chunk", [
            { no: 1, name: "x", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "y", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "pixels", kind: "scalar", T: 12 /*ScalarType.BYTES*/ },
            { no: 4, name: "pallete", kind: "scalar", T: 12 /*ScalarType.BYTES*/ },
            { no: 5, name: "background", kind: "scalar", opt: true, T: 12 /*ScalarType.BYTES*/ }
        ]);
    }
    create(value?: PartialMessage<Chunk>): Chunk {
        const message = { x: 0, y: 0, pixels: new Uint8Array(0), pallete: new Uint8Array(0) };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Chunk>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Chunk): Chunk {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* int32 x */ 1:
                    message.x = reader.int32();
                    break;
                case /* int32 y */ 2:
                    message.y = reader.int32();
                    break;
                case /* bytes pixels */ 3:
                    message.pixels = reader.bytes();
                    break;
                case /* bytes pallete */ 4:
                    message.pallete = reader.bytes();
                    break;
                case /* optional bytes background */ 5:
                    message.background = reader.bytes();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Chunk, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* int32 x = 1; */
        if (message.x !== 0)
            writer.tag(1, WireType.Varint).int32(message.x);
        /* int32 y = 2; */
        if (message.y !== 0)
            writer.tag(2, WireType.Varint).int32(message.y);
        /* bytes pixels = 3; */
        if (message.pixels.length)
            writer.tag(3, WireType.LengthDelimited).bytes(message.pixels);
        /* bytes pallete = 4; */
        if (message.pallete.length)
            writer.tag(4, WireType.LengthDelimited).bytes(message.pallete);
        /* optional bytes background = 5; */
        if (message.background !== undefined)
            writer.tag(5, WireType.LengthDelimited).bytes(message.background);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message mikroblocks.vanilla.Chunk
 */
export const Chunk = new Chunk$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Entity$Type extends MessageType<Entity> {
    constructor() {
        super("mikroblocks.vanilla.Entity", [
            { no: 1, name: "id", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 2, name: "x", kind: "scalar", T: 1 /*ScalarType.DOUBLE*/ },
            { no: 3, name: "y", kind: "scalar", T: 1 /*ScalarType.DOUBLE*/ },
            { no: 4, name: "width", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 5, name: "height", kind: "scalar", T: 13 /*ScalarType.UINT32*/ }
        ]);
    }
    create(value?: PartialMessage<Entity>): Entity {
        const message = { id: 0, x: 0, y: 0, width: 0, height: 0 };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Entity>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Entity): Entity {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* uint32 id */ 1:
                    message.id = reader.uint32();
                    break;
                case /* double x */ 2:
                    message.x = reader.double();
                    break;
                case /* double y */ 3:
                    message.y = reader.double();
                    break;
                case /* uint32 width */ 4:
                    message.width = reader.uint32();
                    break;
                case /* uint32 height */ 5:
                    message.height = reader.uint32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Entity, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* uint32 id = 1; */
        if (message.id !== 0)
            writer.tag(1, WireType.Varint).uint32(message.id);
        /* double x = 2; */
        if (message.x !== 0)
            writer.tag(2, WireType.Bit64).double(message.x);
        /* double y = 3; */
        if (message.y !== 0)
            writer.tag(3, WireType.Bit64).double(message.y);
        /* uint32 width = 4; */
        if (message.width !== 0)
            writer.tag(4, WireType.Varint).uint32(message.width);
        /* uint32 height = 5; */
        if (message.height !== 0)
            writer.tag(5, WireType.Varint).uint32(message.height);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message mikroblocks.vanilla.Entity
 */
export const Entity = new Entity$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateChunks$Type extends MessageType<UpdateChunks> {
    constructor() {
        super("mikroblocks.vanilla.UpdateChunks", [
            { no: 1, name: "chunks", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Chunk }
        ]);
    }
    create(value?: PartialMessage<UpdateChunks>): UpdateChunks {
        const message = { chunks: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<UpdateChunks>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UpdateChunks): UpdateChunks {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated mikroblocks.vanilla.Chunk chunks */ 1:
                    message.chunks.push(Chunk.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: UpdateChunks, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated mikroblocks.vanilla.Chunk chunks = 1; */
        for (let i = 0; i < message.chunks.length; i++)
            Chunk.internalBinaryWrite(message.chunks[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message mikroblocks.vanilla.UpdateChunks
 */
export const UpdateChunks = new UpdateChunks$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateEntities$Type extends MessageType<UpdateEntities> {
    constructor() {
        super("mikroblocks.vanilla.UpdateEntities", [
            { no: 1, name: "entities", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Entity }
        ]);
    }
    create(value?: PartialMessage<UpdateEntities>): UpdateEntities {
        const message = { entities: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<UpdateEntities>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UpdateEntities): UpdateEntities {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated mikroblocks.vanilla.Entity entities */ 1:
                    message.entities.push(Entity.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: UpdateEntities, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated mikroblocks.vanilla.Entity entities = 1; */
        for (let i = 0; i < message.entities.length; i++)
            Entity.internalBinaryWrite(message.entities[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message mikroblocks.vanilla.UpdateEntities
 */
export const UpdateEntities = new UpdateEntities$Type();
// @generated message type with reflection information, may provide speed optimized methods
class KeyboardInput$Type extends MessageType<KeyboardInput> {
    constructor() {
        super("mikroblocks.vanilla.KeyboardInput", [
            { no: 1, name: "char", kind: "scalar", T: 13 /*ScalarType.UINT32*/ }
        ]);
    }
    create(value?: PartialMessage<KeyboardInput>): KeyboardInput {
        const message = { char: 0 };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<KeyboardInput>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: KeyboardInput): KeyboardInput {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* uint32 char */ 1:
                    message.char = reader.uint32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: KeyboardInput, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* uint32 char = 1; */
        if (message.char !== 0)
            writer.tag(1, WireType.Varint).uint32(message.char);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message mikroblocks.vanilla.KeyboardInput
 */
export const KeyboardInput = new KeyboardInput$Type();
