import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'products', timestamps: true })
export class ProductDocument extends Document {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  shortDescription: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ type: Object, required: true })
  prices: { detal: number; mayor: number; mayorMin: number };

  @Prop({ type: [Object], required: true })
  colors: { name: string; hex: string; slug: string }[];

  @Prop({ type: [String], required: true })
  images: string[];

  @Prop({ required: true, default: false })
  featured: boolean;

  @Prop({ required: true, default: true })
  inStock: boolean;

  @Prop({ default: false, name: 'isNew' })
  isNewProduct: boolean;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: Date, default: null })
  deletedAt: Date | null;

  // Added by timestamps: true
  createdAt: Date;
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(ProductDocument);

ProductSchema.index({ slug: 1 }, { unique: true, name: 'products_unique_slug' });
ProductSchema.index({ category: 1, deletedAt: 1 }, { name: 'products_category_deleted' });
ProductSchema.index({ featured: 1, deletedAt: 1 }, { name: 'products_featured_deleted' });
