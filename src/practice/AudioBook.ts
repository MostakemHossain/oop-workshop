import { Product } from './Product';

export class AudioBook extends Product {
  override get Descriptions(): string {
    return `This is an audio book, you can listen to it\n`;
  }
}
