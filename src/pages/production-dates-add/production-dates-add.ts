import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";


/**
 * Generated class for the ProductionDatesAddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-production-dates-add',
  templateUrl: 'production-dates-add.html',
})
export class ProductionDatesAddPage {


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private sqlite: SQLite,
  ) {
    window.openDatabase("my.db", "1.0", "Cordova Demo", 200000);
  }

  ngOnInit() {
    
  }
  onClosed() {
    this.viewCtrl.dismiss();
  }
  addDate(form: NgForm) {
    window.openDatabase("my.db", "1.0", "Cordova Demo", 200000).transaction(
       (tx)=>{
          tx.executeSql(
            "insert into date (id,date) values(null,'2017-05-10')"
          );
       }
     )
    this.viewCtrl.dismiss();
  }

}
