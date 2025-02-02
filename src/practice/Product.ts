export class Product {
  private _discount: number = 0;
  constructor(
    public id: number,
    public title: string,
    protected _price: number,
    protected _stock: number,
  ) {}
  get price(): number {
    return this._price;
  }
  set price(value: number) {
    if (value >= 0) {
      this._price = value;
    } else {
      throw new Error('Price must be a positive number');
    }
  }

  get stock(): number {
    return this._stock;
  }
  addStock(value: number) {
    if (value >= 0) {
      this._stock += value;
    } else {
      throw new Error('Stock must be a positive number');
    }
  }
  removeStock(value: number) {
    if (value <= this._stock) {
      this._stock -= value;
    } else {
      throw new Error('Not enough stock');
    }
  }
  checkStock(value: number) {
    return this._stock >= value;
  }
  get Descriptions(): string {
    return `${this.title} , price: $${this.price}, stock: ${this.stock} (${this._discount}%) 
    `;
  }
  applyDiscount(percentage: number) {
    if (percentage >= 0 && percentage <= 100) {
      this._discount = percentage;
    } else {
      throw new Error('Discount percentage must be between 0 and 100');
    }
  }
}
