import { CarRequestService } from './../../../../services/human-resource/car/car-request.service';
import { AuthService } from './../../../../services/auth.service';
import { CarManageService } from './../../../../services/human-resource/car/car-manage.service';
import { DivisionService } from './../../../../services/division.service';
import { EmployeeService } from './../../../../services/employee.service';
import { DateService } from './../../../../services/date.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the CarRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-car-request',
  templateUrl: 'car-request.html',
})
export class CarRequestPage {


  allEmployees: any;
  divisions: any;
  carTypes: any;
  user: any;
  allRequests: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dateService: DateService,
    public modalCtrl: ModalController,
    public employeeService: EmployeeService,
    public divisionService: DivisionService,
    public loaderCtrl: LoadingController,
    public carManageService: CarManageService,
    public authService: AuthService,
    public carRequestService: CarRequestService
  ) {
  }

  ngOnInit() {
    let loader = this.loaderCtrl.create({
      content: 'กำลังโหลดข้อมูล...'
    })
    loader.present();
    /* Get Employee */
    this.authService.getUser()
      .then(result => {
        this.user = result
        this.carRequestService.getCarRequest(this.user.id)
          .then(result => {
            console.log('Car Request')
            console.log(result)
            this.allRequests = result.data
            this.employeeService.getAllEmployeeWithOutPage()
              .then(result => {
                this.allEmployees = result;
                /* Get Division */
                this.divisionService.getDivision()
                  .then(result => {
                    this.divisions = result
                    this.carManageService.getCarType()
                      .then(result => {
                        this.carTypes = result
                        loader.dismiss();
                      })
                  })
                  .catch(err => { loader.dismiss(); console.log(err) })
              }).catch(err => { loader.dismiss(); console.log(err)})
          }).catch(err=>{ loader.dismiss(); console.log(err)})
      }).catch(err => { loader.dismiss(); console.log(err) })
  }

  /*Get Details*/
  getDetails() {

  }

  /*Add Request*/
  addRequest() {
    let addModal = this.modalCtrl.create('AddRequestPage'
      , {
        'employees': this.allEmployees,
        'divisions': this.divisions,
        'carTypes': this.carTypes,
        'user': this.user
      });
    addModal.present();
    addModal.onDidDismiss(result => {
      if (result) {
        this.allRequests = result.data;
      }
    })
  }

}
