import { Product } from './Product';

export class EBook extends Product {
  private _totalDownload: number = 0;
  private _downloadLink: string = `https:// Amazon.com/Amazon/pdf`;
  constructor(
    public id: number,
    public title: string,
    protected _price: number,
    protected _stock: number,
    private downloadLink: string,
  ) {
    super(id, title, _price, _stock);
  }

  override get Descriptions(): string {
    return `${this.title}, price: $${this.price}, stock: ${this.stock}, 
      total downloads: ${this._totalDownload}, download link: ${this._downloadLink}`;
  }
  download() {
    this._totalDownload++;
    console.log(`You have successfully downloaded ${this.title}. 
      Total downloads: ${this._totalDownload}`);
  }
}
