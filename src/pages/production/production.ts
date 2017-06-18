import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ProductionService} from "../../services/production.service";
import {ProductionDatePage} from "./production-date/production-date";


/**
 * Generated class for the ProductionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-production',
    templateUrl: 'production.html',
})
export class ProductionPage {

    productionDatePage = ProductionDatePage;
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private productionService: ProductionService
                ) {
    }

    ngOnInit() {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProductionPage');
    }

    setDate() {
        this.navCtrl.push(this.productionDatePage);
    }

}
