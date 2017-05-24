import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public name: any;
  constructor(
    public navCtrl: NavController,
    private storage: Storage
  ) {
     window.openDatabase("my.db", "1.0", "Cordova Demo", 200000).transaction(
       (tx)=>{
          tx.executeSql(
            "CREATE TABLE IF NOT EXISTS date(id INTEGER PRIMARY KEY AUTOINCREMENT,date DATE)"
          );
       }
     )
  }

}
