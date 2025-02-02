export class Book {
  constructor(
    public id: number,
    public title: string,
    public author: string,
    private _price: number,
    private _stock: number,
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
}

export class Magazine {
  constructor(
    public id: number,
    public title: string,
    public author: string,
    private _price: number,
    private _stock: number,
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
}

export class EBook {
  private _downloadCount: number = 0;
  constructor(
    public id: number,
    public title: string,
    public author: string,
    private _price: number,
    private _downloadLink: string,
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
  downloadCount() {
    this._downloadCount++;
    return this._downloadLink;
  }
  incrementDownloadCount(): void {
    this._downloadCount++;
  }
  get totalDownloadCount(): number {
    return this._downloadCount;
  }
}

const inventory = [
  new Book(1, 'Book Title', 'Author Name', 10, 100),
  new Magazine(2, 'Magazine Title', 'Author Name', 5, 50),
  new EBook(3, 'EBook Title', 'Author Name', 20, 'https://example.com/ebook'),
];
