export default class Rgb {
  constructor(public r: number, public g: number, public b: number) {}

  static fromBytes(bytes: Uint8Array, offset = 0) {
    return new Rgb(bytes[0 + offset], bytes[1 + offset], bytes[2 + offset]);
  }

  clone() {
    return new Rgb(this.r, this.g, this.b);
  }

  toGL(): [number, number, number, number] {
    return [this.r / 255, this.g / 255, this.b / 255, 1]
  }
}
