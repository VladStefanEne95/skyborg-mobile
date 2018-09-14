export class Product {
    _id: string;
    name: string;
    ASIN: string;
    SKU: string;
    thumbUrl: string;
    status: string;
    salesRanks: any[];
    brandName: string;
    parentASIN: string;
    childrenASINS: string[];
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    costs: object;
}
