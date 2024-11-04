import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Product } from "../../domain/product";
import { GetProductsQuery } from "./get-products.query";
import { IProductRepository } from "../../domain/ports/products.repository";

@QueryHandler(GetProductsQuery)
export class GetProductsQueryHandler implements IQueryHandler<GetProductsQuery, Product[]>{
    constructor(private readonly productRepository: IProductRepository){}
    async execute(query: GetProductsQuery): Promise<Product[]> {
        return this.productRepository.findAll();
    }
}