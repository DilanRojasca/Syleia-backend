import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { Product } from '@/domain/product/entities/product.entity';
import { ProductCategory } from '@/domain/product/value-objects/product-category.vo';
import { ProductColor } from '@/domain/product/value-objects/product-color.vo';
import { ProductPrices } from '@/domain/product/value-objects/product-prices.vo';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '@/domain/product/repositories/product.repository';

// All 10 products from the Syleia frontend mock
const SEED_PRODUCTS = [
  {
    slug: 'scrunchie-satin-rosado-palo',
    name: 'Scrunchie Satín Rosado Palo',
    shortDescription: 'El favorito clásico en un tono suave y romántico.',
    description:
      'Elaborado en satén de alta calidad, este scrunchie cuida tu cabello mientras le da un toque elegante a cualquier look. Su tono rosado palo es versátil y atemporal.',
    category: 'scrunchies',
    prices: { detal: 9000, mayor: 6000, mayorMin: 6 },
    colors: [
      { name: 'Rosado Palo', hex: '#F4C5C0', slug: 'rosado-palo' },
      { name: 'Champagne', hex: '#F5E6C8', slug: 'champagne' },
      { name: 'Nude', hex: '#E8D5C0', slug: 'nude' },
    ],
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
    ],
    featured: true,
    inStock: true,
    isNew: false,
    tags: ['scrunchie', 'satin', 'rosado', 'clasico'],
  },
  {
    slug: 'scrunchie-satin-lila',
    name: 'Scrunchie Satín Lila',
    shortDescription: 'Un toque de color con todo el lujo del satén.',
    description:
      'El tono lila aporta personalidad y frescura. Confeccionado en satén suave que no daña el cabello y se adapta a cualquier peinado.',
    category: 'scrunchies',
    prices: { detal: 9000, mayor: 6000, mayorMin: 6 },
    colors: [
      { name: 'Lila', hex: '#C9B8E8', slug: 'lila' },
      { name: 'Rosado Palo', hex: '#F4C5C0', slug: 'rosado-palo' },
    ],
    images: [
      'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800',
    ],
    featured: true,
    inStock: true,
    isNew: true,
    tags: ['scrunchie', 'satin', 'lila', 'color'],
  },
  {
    slug: 'scrunchie-satin-champagne',
    name: 'Scrunchie Satín Champagne',
    shortDescription: 'Elegancia neutral para cualquier ocasión.',
    description:
      'El champagne es el neutro más sofisticado. Este scrunchie de satén combina con todo y añade un brillo sutil que eleva cualquier look.',
    category: 'scrunchies',
    prices: { detal: 9000, mayor: 6000, mayorMin: 6 },
    colors: [
      { name: 'Champagne', hex: '#F5E6C8', slug: 'champagne' },
      { name: 'Dorado', hex: '#D4B896', slug: 'dorado' },
    ],
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
    ],
    featured: true,
    inStock: true,
    isNew: false,
    tags: ['scrunchie', 'satin', 'champagne', 'neutro'],
  },
  {
    slug: 'scrunchie-satin-verde-menta',
    name: 'Scrunchie Satín Verde Menta',
    shortDescription: 'Frescura y estilo en un solo accesorio.',
    description:
      'El verde menta es la tendencia que no pasa de moda. Satén de calidad en un color que refresca cualquier peinado.',
    category: 'scrunchies',
    prices: { detal: 9000, mayor: 6000, mayorMin: 6 },
    colors: [
      { name: 'Verde Menta', hex: '#C5DDD3', slug: 'verde-menta' },
      { name: 'Champagne', hex: '#F5E6C8', slug: 'champagne' },
    ],
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
    ],
    featured: false,
    inStock: true,
    isNew: false,
    tags: ['scrunchie', 'satin', 'verde', 'menta'],
  },
  {
    slug: 'scrunchie-satin-nude',
    name: 'Scrunchie Satín Nude',
    shortDescription: 'El básico imprescindible en tu colección.',
    description:
      'El nude es el comodín perfecto. Combina con todo y el satén le da esa textura lujosa que lo hace especial.',
    category: 'scrunchies',
    prices: { detal: 9000, mayor: 6000, mayorMin: 6 },
    colors: [
      { name: 'Nude', hex: '#E8D5C0', slug: 'nude' },
      { name: 'Champagne', hex: '#F5E6C8', slug: 'champagne' },
    ],
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
    ],
    featured: false,
    inStock: true,
    isNew: false,
    tags: ['scrunchie', 'satin', 'nude', 'basico'],
  },
  {
    slug: 'pack-x6-scrunchies-satin',
    name: 'Pack × 6 Scrunchies Satín',
    shortDescription: 'Los 6 colores icónicos de Syleia en un solo pack.',
    description:
      'El pack perfecto para completar tu colección o regalar. Incluye los 6 colores clásicos de Syleia en satén de alta calidad.',
    category: 'scrunchies',
    prices: { detal: 50000, mayor: 32000, mayorMin: 3 },
    colors: [
      { name: 'Rosado Palo', hex: '#F4C5C0', slug: 'rosado-palo' },
      { name: 'Champagne', hex: '#F5E6C8', slug: 'champagne' },
      { name: 'Verde Menta', hex: '#C5DDD3', slug: 'verde-menta' },
      { name: 'Nude', hex: '#E8D5C0', slug: 'nude' },
      { name: 'Dorado', hex: '#D4B896', slug: 'dorado' },
      { name: 'Lila', hex: '#C9B8E8', slug: 'lila' },
    ],
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
    ],
    featured: true,
    inStock: true,
    isNew: true,
    tags: ['pack', 'scrunchie', 'satin', 'set', 'regalo'],
  },
  {
    slug: 'combo-descanso-champagne',
    name: 'Combo Descanso Champagne',
    shortDescription: 'Gorro + funda de almohada para un descanso de lujo.',
    description:
      'El duo perfecto para cuidar tu cabello y piel mientras duermes. Gorro de satén + funda de almohada en satén champagne. Despierta sin frizz y con la piel hidratada.',
    category: 'combo-descanso',
    prices: { detal: 48000, mayor: 34000, mayorMin: 2 },
    colors: [
      { name: 'Champagne', hex: '#F5E6C8', slug: 'champagne' },
      { name: 'Rosado Palo', hex: '#F4C5C0', slug: 'rosado-palo' },
    ],
    images: [
      'https://images.unsplash.com/photo-1631390291042-0a70c5cf50c3?w=800',
    ],
    featured: true,
    inStock: true,
    isNew: false,
    tags: ['combo', 'descanso', 'gorro', 'funda', 'champagne'],
  },
  {
    slug: 'combo-descanso-nude',
    name: 'Combo Descanso Nude',
    shortDescription: 'El ritual de belleza nocturno en tono nude.',
    description:
      'Cuida tu cabello y piel con el combo de satén más elegante. El tono nude es perfecto para un ambiente sereno en tu habitación.',
    category: 'combo-descanso',
    prices: { detal: 48000, mayor: 34000, mayorMin: 2 },
    colors: [
      { name: 'Nude', hex: '#E8D5C0', slug: 'nude' },
      { name: 'Dorado', hex: '#D4B896', slug: 'dorado' },
    ],
    images: [
      'https://images.unsplash.com/photo-1631390291042-0a70c5cf50c3?w=800',
    ],
    featured: false,
    inStock: true,
    isNew: false,
    tags: ['combo', 'descanso', 'gorro', 'funda', 'nude'],
  },
  {
    slug: 'gorro-satin-rosado-palo',
    name: 'Gorro de Satén Rosado Palo',
    shortDescription: 'Protege tu cabello mientras duermes con estilo.',
    description:
      'El gorro de satén protege tu cabello del frizz y la rotura mientras duermes. Elástico ajustable para todas las tallas. En el romántico tono rosado palo.',
    category: 'gorros',
    prices: { detal: 25000, mayor: 18000, mayorMin: 4 },
    colors: [
      { name: 'Rosado Palo', hex: '#F4C5C0', slug: 'rosado-palo' },
      { name: 'Lila', hex: '#C9B8E8', slug: 'lila' },
      { name: 'Nude', hex: '#E8D5C0', slug: 'nude' },
    ],
    images: [
      'https://images.unsplash.com/photo-1631390291042-0a70c5cf50c3?w=800',
    ],
    featured: false,
    inStock: true,
    isNew: false,
    tags: ['gorro', 'satin', 'noche', 'cabello'],
  },
  {
    slug: 'funda-almohada-satin-nude',
    name: 'Funda de Almohada Satén Nude',
    shortDescription: 'Duerme sobre satén puro. Tu piel y cabello te lo agradecerán.',
    description:
      'La funda de almohada de satén reduce el frizz, minimiza las marcas en la piel y mantiene la hidratación durante el sueño. Medida estándar, fácil de lavar.',
    category: 'fundas',
    prices: { detal: 32000, mayor: 22000, mayorMin: 4 },
    colors: [
      { name: 'Nude', hex: '#E8D5C0', slug: 'nude' },
      { name: 'Champagne', hex: '#F5E6C8', slug: 'champagne' },
      { name: 'Rosado Palo', hex: '#F4C5C0', slug: 'rosado-palo' },
    ],
    images: [
      'https://images.unsplash.com/photo-1631390291042-0a70c5cf50c3?w=800',
    ],
    featured: false,
    inStock: true,
    isNew: false,
    tags: ['funda', 'almohada', 'satin', 'piel', 'cabello'],
  },
];

async function seed(): Promise<void> {
  console.log('🌱 Starting Syleia database seed...');

  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });

  const repo = app.get<IProductRepository>(PRODUCT_REPOSITORY);

  let seeded = 0;
  let skipped = 0;

  for (const data of SEED_PRODUCTS) {
    const existing = await repo.findBySlug(data.slug);
    if (existing) {
      console.log(`  ⏭  Skipped (already exists): ${data.name}`);
      skipped++;
      continue;
    }

    const product = Product.create({
      slug: data.slug,
      name: data.name,
      shortDescription: data.shortDescription,
      description: data.description,
      category: ProductCategory.create(data.category),
      prices: ProductPrices.create(data.prices),
      colors: data.colors.map((c) => ProductColor.create(c)),
      images: data.images,
      featured: data.featured,
      inStock: data.inStock,
      isNew: data.isNew,
      tags: data.tags,
    });

    await repo.save(product);
    console.log(`  ✅ Seeded: ${data.name}`);
    seeded++;
  }

  console.log(`\n🎉 Seed complete — ${seeded} inserted, ${skipped} skipped`);
  await app.close();
}

void seed().catch((err: unknown) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
