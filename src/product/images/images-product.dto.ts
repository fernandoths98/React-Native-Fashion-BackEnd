import { Column, PrimaryGeneratedColumn } from "typeorm";

export class ImagesDto {
  @PrimaryGeneratedColumn()
  id_images: number;

  @Column()
  image_product: string;
}
