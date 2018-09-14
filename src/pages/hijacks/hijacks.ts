import { Component, Input, Output, EventEmitter, OnInit, ViewChild , ViewEncapsulation} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { StateProvider } from '../../providers/state/state';
import { HijacksProvider } from '../../providers/hijacks/hijacks';
import * as _ from 'lodash';
import { Hijack } from '../../models/hijack/hijack';
import { ExportDataSource } from '../../classes/export-data-source/export-data-source';
import * as moment from 'moment';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';




@IonicPage()
@Component({
  selector: 'page-hijacks',
  templateUrl: 'hijacks.html',
})
export class HijacksPage {

	hijacks: any;
	hijacksList: any;
    hijackData: any;
    unreadHijacks: any;
    loading = true;

    displayedColumns = ['createdAt', 'ASIN', 'product', 'updatedAt', 'buybox', 'no'];
    category = 'Hijacks';
    now = Date.now();
    length = 100;
    pagination: any = {
        length: 10,
        pageIndex: 0,
        pageSize: 25,
        pageSizeOptions: [5, 10, 25, 100]
    }
    lastUpdate: any;
    gridView: boolean;
	currentlyHijacked: boolean;
	semaphor = "false";

  constructor(public navCtrl: NavController, public navParams: NavParams, 
	public UserProvider: UserProvider, public HijacksProvider: HijacksProvider, 
	public StateProvider: StateProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HijacksPage');
  }
  ngOnInit() {
			this.currentlyHijacked = true;
			this.gridView = true;
			if (0 !== this.StateProvider.products.length) {
				this.getHijacks();
			} else {
				const getH = setInterval(() => {
					if (0 !== this.StateProvider.products.length) {
						this.getHijacks();
	
						clearInterval(getH);
					}
				}, 1000);
			}
			this.getDate();
		}
	
	getTimeRange(hijack: any) {
		const lastUpdateDate = hijack.updatedAt;
		return moment(lastUpdateDate).fromNow();
	}
	getDate() {
		let pipe = new DatePipe('en-US');
		const myFormattedDate = pipe.transform(this.now, 'short');
	}
	getDateV2(hjDate) {
		hjDate = moment(hjDate).format('MM/DD/YYYY , h:mm');
		return hjDate;
	}
	
	afterGetHijacks = (paginatedResponse: any) => {
		this.loading = false;
	
		this.pagination.length = paginatedResponse.count;
		this.pagination.pageIndex = paginatedResponse.pageNumber - 1;
		this.pagination.pageSize = paginatedResponse.pageSize;
	
		this.hijacks = paginatedResponse.products;
		console.log('hj = ', this.hijacks);
	}
	
	getHijacks(pageSize: number = 50, pageNumber: number = 1): void {
		this.loading = true;
		this.HijacksProvider.get('*', '*', pageSize, pageNumber)
			.then(hijacks => {
				this.hijacks = hijacks;
				this.hijackData = hijacks;
				this.hijacks = this.hijackData.hijacks;
				console.log('HJ for Download', this.hijacks);
				this.unreadHijacks = this.hijacks.filter(hj => hj.action === 'unread');
	
				this.hijacks.forEach(h => { 
					let getProductIndex = _.findIndex(this.StateProvider.products, p => {
						return p.ASIN.toString() === h.ASIN.toString();
					});
	
					if (-1 !== getProductIndex) {
						h.product = this.StateProvider.products[getProductIndex];
						if (20 < h.product.name.length) {
							h.product.shortName = `${h.product.name.substr(0, 20)}...`;
						} else {
							h.product.shortName = h.product.name;
						}
					} else {
						getProductIndex = _.findIndex(this.StateProvider.productsTracker, p => {
							return p.ASIN.toString() === h.ASIN.toString();
						});
						h.product = this.StateProvider.productsTracker[getProductIndex];
						if (20 < h.product.name.length) {
							h.product.shortName = `${h.product.name.substr(0, 20)}...`;
						} else {
							h.product.shortName = h.product.name;
						}
					}
				});
	
			this.loading = false;
	
			})
			.catch(err => {
				this.loading = false;
			})
		}

	
	delete(hijack): void {
		this.HijacksProvider.delete(hijack._id)
			.then(resp => {
				this.getHijacks();
			})
			.catch(err => {
				this.getHijacks();
			});
	}
	
	view(hijack): void {
		hijack.action = 'read';
		this.HijacksProvider.update(hijack)
			.then(resp => {
				this.getHijacks();
			})
			.catch(err => {
				this.getHijacks();
			});
		}
	}
	
	