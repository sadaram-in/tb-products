export class GetProductsQuery {
  constructor(readonly showInactive: boolean = false) {}
}

export class GetValidProductsQuery {
  constructor(readonly date: Date = new Date()) {}
}
