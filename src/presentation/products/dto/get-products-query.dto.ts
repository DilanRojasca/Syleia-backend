import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator';

const VALID_CATEGORIES = ['scrunchies', 'combo-descanso', 'gorros', 'fundas'];

export class GetProductsQueryDto {
  @ApiPropertyOptional({
    description: 'Filter by product category',
    enum: VALID_CATEGORIES,
  })
  @IsOptional()
  @IsString()
  @IsIn(VALID_CATEGORIES, {
    message: `category must be one of: ${VALID_CATEGORIES.join(', ')}`,
  })
  category?: string;

  @ApiPropertyOptional({
    description: 'Filter to featured products only',
    type: Boolean,
  })
  @IsOptional()
  @Transform(({ value }: { value: unknown }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  featured?: boolean;
}
