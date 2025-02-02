import { Book } from './Book';
import { EBook } from './Ebook';
import { Magazine } from './Magazine';
import { Product } from './Product';

export class InventoryManager {
  private products: Map<string, Product> = new Map();
  private salesHistory: Array<{
    productId: string;
    quantity: number;
    revenue: number;
    date: Date;
  }> = [];

  addProduct(product: Product): void {
    this.products.set(product.title, product);
  }
  removeProduct(productId: string): boolean {
    return this.products.delete(productId);
  }
  getProductById(productId: string): Product | undefined {
    return this.products.get(productId);
  }
  getAllProducts(): Array<Product | undefined> {
    return Array.from(this.products.values());
  }

  recordSale(productId: string, quantity: number): void {
    const product = this.products.get(productId);
    if (product && product.checkStock(quantity)) {
      product.removeStock(quantity);
      const revenue = product.price * quantity;
      this.salesHistory.push({
        productId,
        quantity,
        revenue,
        date: new Date(),
      });
    } else {
      console.error('Invalid product or insufficient stock');
    }
  }

  getTotalInventoryValue(): number {
    return Array.from(this.products.values()).reduce((total, product) => {
      const value = product.price * product.stock;
      return isFinite(value) ? total + value : total;
    }, 0);
  }
  getBooks(): Book[] {
    return Array.from(this.products.values()).filter(
      (product) => product instanceof Book,
    ) as Book[];
  }
  getMagazine(): Magazine[] {
    return Array.from(this.products.values()).filter(
      (product) => product instanceof Magazine,
    ) as Magazine[];
  }
  getEBook(): EBook[] {
    return Array.from(this.products.values()).filter(
      (product) => product instanceof EBook,
    ) as EBook[];
  }

  generateInventoryReport(): string {
    let report = '=== Inventory Report ===\n';
    report += `Total Products: ${this.products.size}\n`;

    const totalValue = this.getTotalInventoryValue();
    report += `Total Value: ${
      isFinite(totalValue) ? '$' + totalValue.toFixed(2) : 'N/A'
    }\n\n`;

    this.products.forEach((product) => {
      report += `${product.Descriptions}\n`;
      report += `Stock Status: ${product.checkStock(1)}\n\n`;
    });

    return report;
  }

  generateSalesReport(startDate?: Date, endDate?: Date): string {
    let filteredSales = this.salesHistory;
    if (startDate && endDate) {
      filteredSales = this.salesHistory.filter(
        (sale) => sale.date >= startDate && sale.date <= endDate,
      );
    }

    const totalRevenue = filteredSales.reduce(
      (sum, sale) => sum + sale.revenue,
      0,
    );
    const totalItems = filteredSales.reduce(
      (sum, sale) => sum + sale.quantity,
      0,
    );

    let report = '=== Sales Report ===\n';
    report += `Period: ${startDate?.toLocaleDateString() || 'All time'} to ${
      endDate?.toLocaleDateString() || 'present'
    }\n`;
    report += `Total Revenue: $${totalRevenue.toFixed(2)}\n`;
    report += `Items Sold: ${totalItems}\n`;

    return report;
  }
}
