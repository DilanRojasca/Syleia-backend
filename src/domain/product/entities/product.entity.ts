import { DomainException } from '@/domain/shared/exceptions/domain.exception';
import { ProductCategory } from '@/domain/product/value-objects/product-category.vo';
import { ProductColor } from '@/domain/product/value-objects/product-color.vo';
import { ProductId } from '@/domain/product/value-objects/product-id.vo';
import { ProductPrices } from '@/domain/product/value-objects/product-prices.vo';

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export interface ProductProps {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: ProductCategory;
  prices: ProductPrices;
  colors: ProductColor[];
  images: string[];
  featured: boolean;
  inStock: boolean;
  isNew?: boolean;
  tags: string[];
}

export interface ProductReconstituteData {
  id: ProductId;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: ProductCategory;
  prices: ProductPrices;
  colors: ProductColor[];
  images: string[];
  featured: boolean;
  inStock: boolean;
  isNew: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ProductUpdateProps {
  name?: string;
  shortDescription?: string;
  description?: string;
  prices?: ProductPrices;
  colors?: ProductColor[];
  images?: string[];
  featured?: boolean;
  inStock?: boolean;
  isNew?: boolean;
  tags?: string[];
}

export class Product {
  private readonly _id: ProductId;
  private _slug: string;
  private _name: string;
  private _shortDescription: string;
  private _description: string;
  private _category: ProductCategory;
  private _prices: ProductPrices;
  private _colors: ProductColor[];
  private _images: string[];
  private _featured: boolean;
  private _inStock: boolean;
  private _isNew: boolean;
  private _tags: string[];
  private readonly _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date | null;

  private constructor(data: ProductReconstituteData) {
    this._id = data.id;
    this._slug = data.slug;
    this._name = data.name;
    this._shortDescription = data.shortDescription;
    this._description = data.description;
    this._category = data.category;
    this._prices = data.prices;
    this._colors = data.colors;
    this._images = data.images;
    this._featured = data.featured;
    this._inStock = data.inStock;
    this._isNew = data.isNew;
    this._tags = data.tags;
    this._createdAt = data.createdAt;
    this._updatedAt = data.updatedAt;
    this._deletedAt = data.deletedAt;
  }

  static create(props: ProductProps): Product {
    if (!SLUG_REGEX.test(props.slug)) {
      throw new DomainException(
        `Slug '${props.slug}' must be lowercase kebab-case (e.g. "my-product")`,
      );
    }
    if (!props.name || props.name.trim().length === 0) {
      throw new DomainException('Product name cannot be empty');
    }
    if (props.name.trim().length > 200) {
      throw new DomainException('Product name cannot exceed 200 characters');
    }
    if (!props.images || props.images.length === 0) {
      throw new DomainException('Product must have at least one image');
    }
    if (!props.colors || props.colors.length === 0) {
      throw new DomainException('Product must have at least one color');
    }

    const now = new Date();
    return new Product({
      id: ProductId.create(),
      slug: props.slug,
      name: props.name.trim(),
      shortDescription: props.shortDescription,
      description: props.description,
      category: props.category,
      prices: props.prices,
      colors: props.colors,
      images: props.images,
      featured: props.featured,
      inStock: props.inStock,
      isNew: props.isNew ?? false,
      tags: props.tags,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });
  }

  static reconstitute(data: ProductReconstituteData): Product {
    return new Product(data);
  }

  update(props: ProductUpdateProps): void {
    if (props.name !== undefined) {
      if (!props.name.trim()) throw new DomainException('Product name cannot be empty');
      if (props.name.trim().length > 200) throw new DomainException('Product name cannot exceed 200 characters');
      this._name = props.name.trim();
    }
    if (props.shortDescription !== undefined) this._shortDescription = props.shortDescription;
    if (props.description !== undefined) this._description = props.description;
    if (props.prices !== undefined) this._prices = props.prices;
    if (props.colors !== undefined) {
      if (props.colors.length === 0) throw new DomainException('Product must have at least one color');
      this._colors = props.colors;
    }
    if (props.images !== undefined) {
      if (props.images.length === 0) throw new DomainException('Product must have at least one image');
      this._images = props.images;
    }
    if (props.featured !== undefined) this._featured = props.featured;
    if (props.inStock !== undefined) this._inStock = props.inStock;
    if (props.isNew !== undefined) this._isNew = props.isNew;
    if (props.tags !== undefined) this._tags = props.tags;
    this._updatedAt = new Date();
  }

  softDelete(): void {
    this._deletedAt = new Date();
    this._updatedAt = new Date();
  }

  isDeleted(): boolean {
    return this._deletedAt !== null;
  }

  getId(): ProductId { return this._id; }
  getSlug(): string { return this._slug; }
  getName(): string { return this._name; }
  getShortDescription(): string { return this._shortDescription; }
  getDescription(): string { return this._description; }
  getCategory(): ProductCategory { return this._category; }
  getPrices(): ProductPrices { return this._prices; }
  getColors(): ProductColor[] { return this._colors; }
  getImages(): string[] { return this._images; }
  isFeatured(): boolean { return this._featured; }
  isInStock(): boolean { return this._inStock; }
  getIsNew(): boolean { return this._isNew; }
  getTags(): string[] { return this._tags; }
  getCreatedAt(): Date { return this._createdAt; }
  getUpdatedAt(): Date { return this._updatedAt; }
  getDeletedAt(): Date | null { return this._deletedAt; }
}
