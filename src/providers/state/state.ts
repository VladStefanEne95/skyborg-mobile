import { HttpClient } from '@angular/common/http';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Hijack } from '../../models/hijack/hijack';

import { UserProvider } from '../user/user';
import { ProductProvider } from '../product/product';
import { ProductSetProvider } from '../product-set/product-set';
import { HijacksProvider } from '../hijacks/hijacks';
import { HandleErrorProvider } from '../handle-error/handle-error';


import { Product } from '../../models/product/product';
import { ProductSet } from '../../models/product-set/product-set';




@Injectable()
export class StateProvider {

	loading = false;
	products: Product[] = [];
	productsTracker: any[] = [];
	productSets: ProductSet[] = [];
	hijacks: any;

  constructor(public http: HttpClient, public ProductProvider: ProductProvider,
	public ProductSetProvider: ProductSetProvider, public UserProvider: UserProvider,
	public HandleErrorProvider: HandleErrorProvider, public HijacksProvider: HijacksProvider ) {
	console.log('Hello StateProvider Provider');
	this.refresh();
  }

  getProducts(): Promise<Product[]> {
	return this.ProductProvider.find()
		.then(products => {
			this.products = products;

			return Promise.resolve(products);
		})
		.catch(err => this.HandleErrorProvider.handle(err));
}

getProductSets(): Promise<ProductSet[]> {
	return this.ProductSetProvider.find()
		.then(productSets => {
			this.productSets = productSets;

			return Promise.resolve(productSets);
		})
		.catch(err => this.HandleErrorProvider.handle(err));
}

getHijacks(): Promise<Hijack[]> {
	return this.HijacksProvider.get('action:unread', '*', 50, 1)
		.then(hijacks => { 
			this.hijacks = hijacks;

			return Promise.resolve(hijacks);
		})
		.catch(err => this.HandleErrorProvider.handle(err));
}

	refresh(): void {
		this.loading = true;
		const allPromises: any = [];

		allPromises.push(this.getProducts());
		allPromises.push(this.getProductSets());
		allPromises.push(this.getHijacks());
		
		
        if (0 !== allPromises.length) {
            Promise.all(allPromises)
                .then(responses => {})
                .catch(err => {
                    this.loading = false;
                    console.log(err);
                });
        }
	}

}
