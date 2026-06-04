import { DomainException } from '@/domain/shared/exceptions/domain.exception';

export interface ProductPricesProps {
  detal: number;
  mayor: number;
  mayorMin: number;
}

export class ProductPrices {
  private constructor(
    private readonly detal: number,
    private readonly mayor: number,
    private readonly mayorMin: number,
  ) {}

  static create(props: ProductPricesProps): ProductPrices {
    if (!Number.isInteger(props.detal) || props.detal <= 0) {
      throw new DomainException('detal price must be a positive integer');
    }
    if (!Number.isInteger(props.mayor) || props.mayor <= 0) {
      throw new DomainException('mayor price must be a positive integer');
    }
    if (!Number.isInteger(props.mayorMin) || props.mayorMin < 1) {
      throw new DomainException('mayorMin must be an integer >= 1');
    }
    return new ProductPrices(props.detal, props.mayor, props.mayorMin);
  }

  getDetal(): number {
    return this.detal;
  }

  getMayor(): number {
    return this.mayor;
  }

  getMayorMin(): number {
    return this.mayorMin;
  }

  toPlain(): ProductPricesProps {
    return { detal: this.detal, mayor: this.mayor, mayorMin: this.mayorMin };
  }
}
