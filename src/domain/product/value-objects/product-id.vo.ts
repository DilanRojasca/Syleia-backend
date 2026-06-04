import { v4 as uuidv4 } from 'uuid';

export class ProductId {
  private constructor(private readonly value: string) {}

  static create(): ProductId {
    return new ProductId(uuidv4());
  }

  static createFromString(value: string): ProductId {
    return new ProductId(value);
  }

  toString(): string {
    return this.value;
  }

  equals(other: ProductId): boolean {
    return this.value === other.value;
  }
}
