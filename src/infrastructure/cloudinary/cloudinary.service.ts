import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

export interface SignatureResult {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
}

@Injectable()
export class CloudinaryService {
  constructor(private readonly cfg: ConfigService) {
    cloudinary.config({
      cloud_name: cfg.getOrThrow('CLOUDINARY_CLOUD_NAME'),
      api_key: cfg.getOrThrow('CLOUDINARY_API_KEY'),
      api_secret: cfg.getOrThrow('CLOUDINARY_API_SECRET'),
    });
  }

  generateSignature(folder: string, publicId?: string): SignatureResult {
    const timestamp = Math.round(Date.now() / 1000);
    const params: Record<string, string | number> = { folder, timestamp };
    if (publicId) params.public_id = publicId;

    const signature = cloudinary.utils.api_sign_request(
      params,
      this.cfg.getOrThrow('CLOUDINARY_API_SECRET'),
    );

    return {
      signature,
      timestamp,
      apiKey: this.cfg.getOrThrow('CLOUDINARY_API_KEY'),
      cloudName: this.cfg.getOrThrow('CLOUDINARY_CLOUD_NAME'),
    };
  }

  async deleteImage(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
  }
}
