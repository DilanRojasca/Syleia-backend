import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CloudinaryService, SignatureResult } from '@/infrastructure/cloudinary/cloudinary.service';
import { SignUploadDto } from './dto/sign-upload.dto';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly cloudinary: CloudinaryService) {}

  @Post('sign')
  @ApiOperation({ summary: 'Generate a signed upload URL for Cloudinary (requires JWT)' })
  @ApiOkResponse({ description: 'Signature params to upload directly from the browser' })
  sign(@Body() dto: SignUploadDto): SignatureResult {
    return this.cloudinary.generateSignature(dto.folder, dto.publicId);
  }
}
