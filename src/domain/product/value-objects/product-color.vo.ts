import { DomainException } from '@/domain/shared/exceptions/domain.exception';

export interface ProductColorProps {
  name: string;
  hex: string;
  slug: string;
}

const HEX_REGEX = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

export class ProductColor {
  private constructor(
    private readonly name: string,
    private readonly hex: string,
    private readonly slug: string,
  ) {}

  static create(props: ProductColorProps): ProductColor {
    if (!props.name || props.name.trim().length === 0) {
      throw new DomainException('ProductColor name cannot be empty');
    }
    if (!HEX_REGEX.test(props.hex)) {
      throw new DomainException(
        `ProductColor hex '${props.hex}' is not a valid hex color`,
      );
    }
    if (!props.slug || props.slug.trim().length === 0) {
      throw new DomainException('ProductColor slug cannot be empty');
    }
    return new ProductColor(props.name.trim(), props.hex, props.slug.trim());
  }

  getName(): string {
    return this.name;
  }

  getHex(): string {
    return this.hex;
  }

  getSlug(): string {
    return this.slug;
  }

  toPlain(): ProductColorProps {
    return { name: this.name, hex: this.hex, slug: this.slug };
  }
}
