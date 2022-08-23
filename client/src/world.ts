import Rgb from "./color";

export class Vec2 {
  constructor(public x: number, public y: number) {}

  clone() {
    return new Vec2(this.x, this.y);
  }

  get magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  set magnitude(len: number) {
    if (this.magnitude === 0) return;
    this.x *= len / this.magnitude;
    this.y *= len / this.magnitude;
  }

  normalize() {
    this.magnitude = 1;
  }

  add(other: Vec2) {
    return new Vec2(this.x + other.x, this.y + other.y);
  }

  sub(other: Vec2) {
    return new Vec2(this.x - other.x, this.y - other.y);
  }

  mul(scalar: number) {
    return new Vec2(this.x * scalar, this.y * scalar);
  }

  div(scalar: number) {
    return new Vec2(this.x / scalar, this.y / scalar);
  }
}

export interface Pixel {
  color: Rgb;
  pos: Vec2;
  solid?: boolean;
}

export interface Chunk {
  pos: Vec2;
  background: Rgb;
  pixels: (Pixel | null)[][];
}

export interface World {
  chunks: Chunk[];
}
