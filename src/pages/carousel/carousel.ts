import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as $ from "jquery";
import 'slick-carousel/slick/slick'
/**
 * Generated class for the CarouselPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carousel',
  templateUrl: 'carousel.html',
})
export class CarouselPage {
arr =[1, 2];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
	console.log('ionViewDidLoad CarouselPage');
	$('.myCarousel').slick({
		dots: true,
		centerMode: true,
		infinite: false,
		centerPadding: '60px',
		slidesToShow: 1
	  });
  }

  ionViewLoaded() {
    $('.myCarousel').slick({
      dots: true,
      centerMode: true,
      infinite: false,
      centerPadding: '60px',
      slidesToShow: 1
    });
  }

}
