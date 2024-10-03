import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { Product } from "../product"


@Injectable()
export class ProductFactory {
  create(name: string) {
    const id = randomUUID();
   
    return new Product(id, name);
  }
}
