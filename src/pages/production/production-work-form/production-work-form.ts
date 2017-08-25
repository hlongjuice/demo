import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { ProductionActivityService } from "../../../services/production/activity.service";
import { ProductionShrimpTypeService } from "../../../services/production/shrimp-type.service";
import { ProductionShrimpSizeService } from "../../../services/production/shrimp-size.service";
import { ProductionEmployeeService } from "../../../services/production/employee.service";
import { NgForm } from "@angular/forms";
import { ProductionWorkService } from "../../../services/production/work.service";

/**
 * Generated class for the ProductionWorkFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-production-work-form',
  templateUrl: 'production-work-form.html',
})
export class ProductionWorkFormPage {

  /*Input*/
  dateInput: any;
  startTimeInput: any;
  endTimeInput: any;
  activityInput: any;
  shrimpSizeInput: any;
  shrimpTypeInput: any;
  weightInput: number;
  /*End Input*/
  employees: any;
  employeeGroups: any;
  selectedEmployeeInput: number;
  selectedGroup: number;
  employeeAmountWeight: number;
  employeeRound: number;
  isHighlightVisible: boolean[];
  isGroupHighlightVisible: boolean[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productionActivityService: ProductionActivityService,
    public productionShrimpTypeSerivce: ProductionShrimpTypeService,
    public productionShrimpSizeService: ProductionShrimpSizeService,
    public productionEmployeeService: ProductionEmployeeService,
    public productionWorkService: ProductionWorkService,
    public alertCtrl: AlertController,
    public loaderCtrl: LoadingController,
    public toastCtrl:ToastController
  ) {
    let today = new Date();
    let DD: any = today.getDate();
    let MM: any = today.getMonth() + 1;
    let YY = today.getFullYear();
    let hh: any = today.getHours();
    let mm: any = today.getMinutes();
    let hhEnd: any = hh + 1;

    if (MM < 10)
      MM = "0" + MM;
    if (DD < 10)
      DD = "0" + DD;
    if (hh < 10)
      hh = "0" + hh;
    if (hhEnd < 10)
      hhEnd = "0" + hhEnd;
    if (mm < 10)
      mm = "0" + mm;

    /*Default Ionic Date Format is YY-MM-DD*/
    this.dateInput = YY + '-' + MM + '-' + DD;
    /*Timer*/
    this.startTimeInput = hh + ':' + mm;
    this.endTimeInput = hhEnd + ':' + mm;

  }
  ngOnInit() {
    let alert = this.alertCtrl.create({ title: 'ไม่สามารถใช้งานได้โปรดลองอีกครั้ง' })
    let loader = this.loaderCtrl.create({ content: 'กำลังโหลดข้อมูล...' })
    loader.present();
    this.isHighlightVisible = [];
    this.isGroupHighlightVisible = [];
    Promise.all([
      /*Get Activity*/
      this.productionActivityService.getActivity()
        .then(
        result => {
          this.activityInput = result;
          console.log(result);
        }
        ).catch(err => { console.log(err) }),
      /*Get Shrimp Size*/
      this.productionShrimpSizeService.getShrimpSize()
        .then(
        result => { this.shrimpSizeInput = result; }
        ).catch(err => console.log(err)),
      /*Get Shrimp Type*/
      this.productionShrimpTypeSerivce.getShrimpType()
        .then(result => { this.shrimpTypeInput = result; })
        .catch(err => console.log(err)),
      /*Get Employee Group*/
      this.productionEmployeeService.getGroups()
        .then(
        groups => {
          console.log(groups);
          this.employeeGroups = groups;
        }
        ).catch(err => console.log(err))
    ]).then(() => { loader.dismiss() })
      .catch(err => { console.log(err); loader.dismiss(); alert.present(); })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductionWorkFormPage');
  }

  /*Get Group Members*/
  getGroupMembers(group) {
    this.productionEmployeeService.getGroupEmployee(group)
      .then(
      members => {
        console.log(members)
        this.selectedGroup = group;
        this.employees = members;
      }
      ).catch(err => { console.log(err) });
  }
  /*Selected Employee*/
  selectedEmployee($emID, testWeight) {
    this.selectedEmployeeInput = $emID;
    console.log(testWeight)
    testWeight.setFocus();
  }

  /*Add Work*/
  addWork(workForm: NgForm) {
    let loader=this.loaderCtrl.create({content:'กำลังเพิ่มข้อมูล...'})
    let toast=this.toastCtrl.create({message:'บันทึกเรียบร้อย',duration:1500,position:'top'})
    let alert=this.alertCtrl.create({title:'ไม่สามารถเพิ่มข้อมูลได้'})
    loader.present()
    console.log(workForm);
    /*  let alertError = this.alertCtrl.create({
        title: 'ข้อมูลไม่ครับถ้วน'
      })
      let confirmButton = this.alertCtrl.create({
        title: 'ยืนยันการบันทึก',
        buttons: [
          {
            text: 'ยกเลิก',
            role: 'cancel',
            handler: () => {
              console.log(workForm);
              if (!workForm.value.em_id || !workForm.value.shrimp_type_id
                || !workForm.value.shrimp_size_id || !workForm.value.weight) {
                console.log('something Empty');
                alertError.present();
              }
            },
            cssClass: 'alertDanger'
          },
          {
            text: 'ยืนยัน',
            handler: () => {
              console.log('Confirm clicked');
              if (!workForm.value.em_id || !workForm.value.shrimp_type_id
                || !workForm.value.shrimp_size_id || !workForm.value.weight) {
                console.log('something Empty');
                alertError.present();
              }
              else {
                let time_period: string = workForm.value.startTime + ' - ' + workForm.value.endTime;
                this.productionWorkService.addWork(workForm, time_period)
                  .then(result => {
                    this.weightInput = 0;
                    console.log(result)
                  })
                  .catch(err => { console.log(err) });
              }
            },
            cssClass: 'alertConfirm'
          }
        ]
      })
      confirmButton.present();*/
    let time_period: string = workForm.value.startTime + ' - ' + workForm.value.endTime;
    this.productionWorkService.addWork(workForm, time_period)
      .then(result => {
        this.weightInput = null;
        console.log(result)
        loader.dismiss();
        toast.present();
      })
      .catch(err => { console.log(err);loader.dismiss();alert.present() });
  }
  /*Set Highliht*/
  setHighlight(i) {
    this.isHighlightVisible.fill(false);
    this.isHighlightVisible[i] = true;
  }
  setGroupHighlight(i) {
    this.isHighlightVisible.fill(false);
    this.isGroupHighlightVisible.fill(false);
    this.isGroupHighlightVisible[i] = true;
  }

}
