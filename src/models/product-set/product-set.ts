import { Product } from '../product/product';

export class ProductSet {
    _id: string;
    name: string;
    products: Product[];
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}
