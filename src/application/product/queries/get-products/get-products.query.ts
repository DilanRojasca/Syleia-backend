export class GetProductsQuery {
  constructor(
    public readonly category?: string,
    public readonly featured?: boolean,
  ) {}
}
