import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class ProductEntity {
    @PrimaryColumn('uuid')
    id: string;
  
    @Column({ length: 255 })
    name: string;
}
