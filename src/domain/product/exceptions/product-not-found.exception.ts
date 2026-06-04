import { DomainException } from '@/domain/shared/exceptions/domain.exception';

export class ProductNotFoundException extends DomainException {
  constructor(identifier: string) {
    super(`Product '${identifier}' not found`);
    this.name = 'ProductNotFoundException';
  }
}
