import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '@/domain/product/entities/product.entity';
import { ProductId } from '@/domain/product/value-objects/product-id.vo';
import { ProductCategory } from '@/domain/product/value-objects/product-category.vo';
import { ProductColor } from '@/domain/product/value-objects/product-color.vo';
import { ProductPrices } from '@/domain/product/value-objects/product-prices.vo';
import {
  IProductRepository,
  ProductFilters,
} from '@/domain/product/repositories/product.repository';
import { ProductDocument, ProductDocumentType } from '../schemas/product.schema';

@Injectable()
export class MongoProductRepository implements IProductRepository {
  constructor(
    @InjectModel(ProductDocument.name)
    private readonly model: Model<ProductDocumentType>,
  ) {}

  async findAll(filters: ProductFilters): Promise<Product[]> {
    const query: Record<string, unknown> = { deletedAt: null };
    if (filters.category) query.category = filters.category;
    if (filters.featured !== undefined) query.featured = filters.featured;

    const docs = await this.model.find(query).exec();
    return docs.map((doc) => this.toDomainEntity(doc));
  }

  async findBySlug(slug: string): Promise<Product | null> {
    const doc = await this.model.findOne({ slug, deletedAt: null }).exec();
    return doc ? this.toDomainEntity(doc) : null;
  }

  async findById(id: ProductId): Promise<Product | null> {
    const doc = await this.model
      .findOne({ _id: id.toString(), deletedAt: null })
      .exec();
    return doc ? this.toDomainEntity(doc) : null;
  }

  async save(product: Product): Promise<void> {
    const id = product.getId().toString();
    const data = {
      _id: id,
      slug: product.getSlug(),
      name: product.getName(),
      shortDescription: product.getShortDescription(),
      description: product.getDescription(),
      category: product.getCategory().toString(),
      prices: product.getPrices().toPlain(),
      colors: product.getColors().map((c) => c.toPlain()),
      images: product.getImages(),
      featured: product.isFeatured(),
      inStock: product.isInStock(),
      isNewProduct: product.getIsNew(),
      tags: product.getTags(),
      deletedAt: product.getDeletedAt(),
      updatedAt: product.getUpdatedAt(),
    };

    await this.model
      .findOneAndUpdate(
        { _id: id },
        { $set: data },
        { upsert: true, returnDocument: 'after' },
      )
      .exec();
  }

  async delete(id: ProductId): Promise<void> {
    await this.model.findByIdAndDelete(id.toString()).exec();
  }

  private toDomainEntity(doc: ProductDocumentType): Product {
    return Product.reconstitute({
      id: ProductId.createFromString(doc._id as string),
      slug: doc.slug,
      name: doc.name,
      shortDescription: doc.shortDescription,
      description: doc.description,
      category: ProductCategory.create(doc.category),
      prices: ProductPrices.create(doc.prices),
      colors: doc.colors.map((c) => ProductColor.create(c)),
      images: doc.images,
      featured: doc.featured,
      inStock: doc.inStock,
      isNew: doc.isNewProduct ?? false,
      tags: doc.tags ?? [],
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      deletedAt: doc.deletedAt ?? null,
    });
  }
}
