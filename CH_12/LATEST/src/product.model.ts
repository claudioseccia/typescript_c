import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class Product {
  @IsNotEmpty() //DECORATOR FACTORIES, NEED TO EXECUTE THEM
  title: string;
  @IsNumber()
  @IsPositive()
  price: number;
  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
  getInformation() {
    return [this.title, `$${this.price}`];
  }
}
