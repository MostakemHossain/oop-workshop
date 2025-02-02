import { Product } from './Product';

export class Magazine extends Product {
  constructor(
    public id: number,
    public title: string,

    protected _price: number,
    protected _stock: number,
    public issueNumber: number,
    public publisher: string,
    public releaseDate: Date,
  ) {
    super(id, title, _price, _stock);
  }

  override get Descriptions(): string {
    return `Issue number: ${this.issueNumber}, publisher: ${this.publisher}, 
      release date: ${this.releaseDate.toLocaleDateString()}`;
  }
  override applyDiscount(percentage: number): void {
    super.applyDiscount(percentage);
    this._price = Math.round(this._price * (1 - percentage / 100));
  }
  rent() {
    console.log(
      `You have successfully rented ${this.title} by ${this.publisher}.`,
    );
  }
}
