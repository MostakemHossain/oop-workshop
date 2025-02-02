import { Product } from './Product';

export class Book extends Product {
  constructor(
    public id: number,
    public title: string,
    public author: string,
    protected _price: number,
    protected _stock: number,
    public isbn: string,
    public pages: number,
    public genre: string,
  ) {
    super(id, title, _price, _stock);
  }

  override get Descriptions(): string {
    return ` ISBN: ${this.isbn}, pages: ${this.pages}, genre: ${this.genre}`;
  }
  buy() {
    console.log(
      `You have successfully bought ${this.title} by ${this.author}.`,
    );
  }
}
