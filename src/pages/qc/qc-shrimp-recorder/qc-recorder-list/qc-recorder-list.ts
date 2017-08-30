import { QcShrimpReceivingService } from './../../../../services/qc/shrimp_receiving.service';
import { QcRecorderDetailsPage } from './../qc-recorder-details/qc-recorder-details';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController, ToastController, Events } from 'ionic-angular';

/**
 * Generated class for the QcRecorderListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-qc-recorder-list',
  templateUrl: 'qc-recorder-list.html',
})
export class QcRecorderListPage {

  _loader: any;
  _alert: any;
  _toast: any;
  lists: any[];
  supplier: any;
  qcRecorderDetailsPage = QcRecorderDetailsPage
  date: string;
  receiving_id: number;
  user: any;
  recorder: any
  isHighlightVisible:boolean[];
  isSplitShow:boolean[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loaderCtrl: LoadingController,
    public shrimpReceivingService: QcShrimpReceivingService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public eventCtrl: Events
  ) {
  }

  ngOnInit() {
    this.isHighlightVisible=[];
    this.isHighlightVisible[0]=true;
    this.isSplitShow=[];
    this.isSplitShow[0]=true;
    this.recorder = this.navParams.data.recorder;
    this.lists = this.navParams.data.recorder.shrimp_receiving;
    this.supplier = this.navParams.data.supplier
    this.date = this.navParams.data.date;
    this.receiving_id = this.navParams.data.recorder.id
    this.user = this.navParams.data.user
  }

  //Get Receiving
  getShrimpReceiving() {
    // this.showLoader();
    this.lists = [];
    this.shrimpReceivingService.getReceivingByID(this.date, this.receiving_id)
      .then(result => {
        this.lists = result.shrimp_receiving
        // this.dismissLoader()
      }).catch(err => { console.log(err); })
  }

  showDetails(list) {
    list.sp_pond = this.navParams.data.recorder.pond;
    list.sp_code = this.navParams.data.recorder.code;
    list.date = this.navParams.data.recorder.date;
    list.supplier = this.navParams.data.recorder.supplier
    let modal = this.modalCtrl.create(this.qcRecorderDetailsPage, {
      'details': list,
      'supplier_details': this.supplier,
      'user': this.user
    }, { cssClass: 'my-modal' })
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        this.eventCtrl.publish('receiving:update');
        this.getShrimpReceiving();
      }
    })
  }

  /* Delete Shrimp Receiving */
  deleteShrimpReceiving(list) {
    let alert = this.alertCtrl.create({
      title: 'ยืนยันการลบ',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'alertCancel'
        }, {
          text: 'ยืนยัน',
          handler: () => {
            this.shrimpReceivingService.deleteShrimpReceiving(list.id)
              .then(result => {
                console.log(result)
                this.eventCtrl.publish('receiving:delete');
                this.getShrimpReceiving();
              }).catch(err => { console.log(err); this.showAlert('ไม่สามารถลบข้อมูลได้') })
          },
          cssClass: 'alertConfirm'
        }
      ]
    })
    alert.present();
  }

  /* Set Highlight */
  setHighlight(i) {
    this.isHighlightVisible.fill(false);
    this.isHighlightVisible[i] = true;
    this.isSplitShow.fill(false)
    this.isSplitShow[i]=true;
    console.log(this.isHighlightVisible);
     console.log(this.isSplitShow);
  }
  /* Loader */
  showLoader() {
    this._loader = this.loaderCtrl.create({ content: 'กำลังโหลดข้อมูล...' })
    this._loader.present()
  }
  /* Dismiss Loader */
  dismissLoader() {
    this._loader.dismiss()
  }
  /* Alert */
  showAlert(textInput) {
    this._alert = this.alertCtrl.create({ title: textInput })
    this._alert.present()
  }
  /* Toast */
  showToast(textInput) {
    this._toast = this.toastCtrl.create({ message: textInput, duration: 2000 })
    this._toast.present()
  }


}
