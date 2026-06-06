import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Matches } from 'class-validator';

export class SignUploadDto {
  @ApiProperty({ example: 'products' })
  @IsString()
  @Matches(/^[a-z0-9_/-]+$/, { message: 'folder must be lowercase alphanumeric with / _ -' })
  folder: string;

  @ApiPropertyOptional({ example: 'scrunchie-saten-negro' })
  @IsOptional()
  @IsString()
  publicId?: string;
}
