import { ApiProperty } from '@nestjs/swagger';

export class ProductColorResponseDto {
  @ApiProperty({ example: 'Rosado Palo' })
  name: string;

  @ApiProperty({ example: '#F4C5C0' })
  hex: string;

  @ApiProperty({ example: 'rosado-palo' })
  slug: string;
}

export class ProductPricesResponseDto {
  @ApiProperty({ example: 9000, description: 'Retail price (COP)' })
  detal: number;

  @ApiProperty({ example: 6000, description: 'Wholesale price (COP)' })
  mayor: number;

  @ApiProperty({ example: 6, description: 'Minimum units for wholesale price' })
  mayorMin: number;
}

export class ProductResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-...' })
  id: string;

  @ApiProperty({ example: 'scrunchie-satin-rosado-palo' })
  slug: string;

  @ApiProperty({ example: 'Scrunchie Satín Rosado Palo' })
  name: string;

  @ApiProperty({ example: 'El favorito clásico en un tono suave y romántico.' })
  shortDescription: string;

  @ApiProperty()
  description: string;

  @ApiProperty({
    example: 'scrunchies',
    enum: ['scrunchies', 'combo-descanso', 'gorros', 'fundas'],
  })
  category: string;

  @ApiProperty({ type: ProductPricesResponseDto })
  prices: ProductPricesResponseDto;

  @ApiProperty({ type: [ProductColorResponseDto] })
  colors: ProductColorResponseDto[];

  @ApiProperty({ type: [String], example: ['https://...'] })
  images: string[];

  @ApiProperty({ example: false })
  featured: boolean;

  @ApiProperty({ example: true })
  inStock: boolean;

  @ApiProperty({ example: false, required: false })
  isNew: boolean;

  @ApiProperty({ type: [String], example: ['scrunchie', 'satin'] })
  tags: string[];
}
