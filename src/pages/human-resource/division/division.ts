import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DivisionAddPage } from "./division-add/division-add";
import { DivisionModel } from "../../../models/division";
import { DivisionService } from "../../../services/division.service";
import { DivisionEditPage } from "./division-edit/division-edit";
import { NgForm } from "@angular/forms";

/**
 * Generated class for the DivisionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-division',
  templateUrl: 'division.html',
})
export class DivisionPage {

  divisionAddPage = DivisionAddPage;
  divisionEditPage = DivisionEditPage;
  public divisions: DivisionModel[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public divisionService: DivisionService) {
  }

  ngOnInit() {
    this.divisionService.getDivision()
      .then(
      (result: DivisionModel[]) => {
        this.divisions = result;
      }
      )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DivisionPage');
  }
  addDivision() {
    let modal = this.modalCtrl.create(this.divisionAddPage);
    modal.present();
    modal.onDidDismiss(
      () => {
        this.divisionService.getDivision()
          .then(
          (result: DivisionModel[]) => {
            this.divisions = result;
            console.log(this.divisions);
          }
          )
      }
    )
  }

  /*Edit Divsion*/
  editDivision(division:any) {
    let modal = this.modalCtrl.create(this.divisionEditPage, {
      divisionID:division.id,
      divisionName: division.name
    });
    console.log(division);
    modal.present();
    modal.onDidDismiss(
      () => {
        this.divisionService.getDivision()
          .then(
          (result: DivisionModel[]) => {
            this.divisions = result;
            console.log(this.divisions);
          }
          )
      }
    )
  }
  /*Delete Division*/
  deleteDivision(id: number) {
    this.divisionService.deleteDivision(id)
      .then(result => {
        console.log(result)
        this.divisionService.getDivision()
          .then(
          (result: DivisionModel[]) => {
            this.divisions = result;
          }
          );
      })
      .catch(err => { console.log(err) });
  }


}
