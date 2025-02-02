import { Book } from './practice/Book';
import { EBook } from './practice/Ebook';
import { Magazine } from './practice/Magazine';
import { Product } from './practice/Product';

const ebook = new EBook(
  1,
  'J.D. Salinger',
  19,
  100,
  'http://algorithms.google.com/',
);
ebook.applyDiscount(10);
const book = new Book(
  2,
  'To Kill a Mockingbird',
  'Harper Lee',
  15,
  100,
  '9780060937555',
  393,
  'Fiction',
);
book.applyDiscount(20);
// const magazine = new Magazine(3, 'The New York Times', 'Stephen King', 5, 50);

// const inventory: Product[] = [ebook, book, magazine];

// inventory.forEach((product) => {
//   console.log(product.Descriptions);
// });

const magazine = new Magazine(
  3,
  'The New York Times',
  5,
  50,
  1000,
  '1000',
  new Date(),
);
magazine.applyDiscount(30);

const inventory: Product[] = [ebook, book, magazine];

inventory.forEach((product) => {
  if (product instanceof Book) {
    product.buy();
  }
  if (product instanceof Magazine) {
    product.rent();
  }
  if (product instanceof EBook) {
    product.download();
  }
});
