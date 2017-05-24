import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public name: any;
  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private sqlite: SQLite,
    private db:any
  ) {
    /*WebSql for Chrome*/
   /* window.openDatabase("my.db", "1.0", "Cordova Demo", 200000).transaction(
      (tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS production_date(id INTEGER PRIMARY KEY AUTOINCREMENT,date DATE)"
        );
        tx.executeSql('');
      }
    )*/
   db= window.openDatabase("my.db", "1.0", "Cordova Demo", 200000);

    /*SQLite For Mobile*/
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {


        db.executeSql('create table danceMoves(name VARCHAR(32))', {})
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));


      })
      .catch(e => console.log(e));

  }

}
