export default class Rgb {
  constructor(public r: number, public g: number, public b: number) {}

  clone() {
    return new Rgb(this.r, this.g, this.b);
  }
}
