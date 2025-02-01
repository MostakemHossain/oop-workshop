class TextProcessor {
  constructor(private text: string) {}

  truncate(maxLength: number): TextProcessor {
    this.text =
      this.text.length > maxLength
        ? this.text.substring(0, maxLength - 3) + '...'
        : this.text;
    return this;
  }

  sanitizeHTML(): TextProcessor {
    this.text = this.text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return this;
  }

  capitalizeWords(): TextProcessor {
    this.text = this.text.replace(/\b\w/g, (char) => char.toUpperCase());
    return this;
  }

  removeExtraSpaces(): TextProcessor {
    this.text = this.text.replace(/\s+/g, ' ').trim();
    return this;
  }

  static getWordCount(text: string): number {
    return text.trim().split(/\s+/).length;
  }

  value(): string {
    return this.text;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static generateRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from(
      { length },
      () => characters[Math.floor(Math.random() * characters.length)],
    ).join('');
  }

  static isValidURL(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  static generateURLSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  }

  static extractMentions(text: string): string[] {
    const matches = text.match(/@[a-zA-Z0-9_]+/g);
    return matches ? matches : [];
  }

  static extractHashtags(text: string): string[] {
    const matches = text.match(/#[a-zA-Z0-9_]+/g);
    return matches ? matches : [];
  }
  // slugs a
  static slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/(-)\1+/g, '');
  }
}

// Usage
const comment =
  'some <b>html</b> <i>text</i> with extra spaces and <script>alert("xss")</script> #test @user #example';

const textProcessor = new TextProcessor(comment);

const text = textProcessor
  .sanitizeHTML()
  .truncate(100)
  .capitalizeWords()
  .value();

console.log(text);
console.log(TextProcessor.extractMentions(comment));
console.log(TextProcessor.slugify('HelloWwdd sssk sse swpw'));
console.log(
  TextProcessor.isValidURL(
    'https://www.example.com/path/to/page?param=value#anchor',
  ),
);
console.log(TextProcessor.getWordCount('sjjj shhs shsjjs'));
