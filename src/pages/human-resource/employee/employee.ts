import { EmployeeModel } from './../../../models/human-resource/employee';
import { DepartmentService } from './../../../services/department.service';
import { PopupDivisionDepartmentPage } from './popup-division-department/popup-division-department';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, PopoverController } from 'ionic-angular';
import { DivisionService } from "../../../services/division.service";
import { EmployeeService } from "../../../services/employee.service";
import { EmployeeEditPage } from "./employee-edit/employee-edit";

/**
 * Generated class for the EmployeePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-employee',
  templateUrl: 'employee.html',
})
export class EmployeePage {

  employeeEditPage = EmployeeEditPage
  popUpDivisionDepartmentPage = PopupDivisionDepartmentPage
  employees: any[];
  allEmployee: any[];
  monthlyEmployee: any[];
  dailyEmployee: any[];
  groupTab: string;
  isHighlightVisible: boolean[];
  chkEmployee: any[];
  divisions: any[];
  departments: any[];
  selectedDivision: string;
  nextPageUrl = "";
  /*Contructor*/
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public divisionService: DivisionService,
    public employeeService: EmployeeService,
    public alertCtrl: AlertController,
    public editPopOver: PopoverController,
    public departmentService: DepartmentService) {
  }
  ngOnInit() {
    this.selectedDivision = 'allEmployee';
    this.divisions = [];
    this.allEmployee = [];
    this.monthlyEmployee = [];
    this.dailyEmployee = [];
    this.chkEmployee = [];
    this.isHighlightVisible = [];
    this.groupTab = 'all';

    /*Get divisions*/
    this.divisionService.getDivision()
      .then(result => {
        this.divisions = result;
        /*Get Department*/
        this.departmentService.getDepartment()
          .then(result => {
            this.departments = result;
          }).catch(err => { console.log(err) })
        /*Get Employee*/
        this.employeeService.getAllEmployees()
          .then(result => {
            console.log(result)

            /*All Employee*/
            this.allEmployee = result.data;
            /*Monthly Employee*/
            this.allEmployee.forEach(employee => {
              //1 is monthly
              if (employee.salary_type.id == 1) {
                this.monthlyEmployee.push(employee)
              }
              /*Else is 2 as daily*/
              else {
                this.dailyEmployee.push(employee)
              }
            })
            this.employees = this.allEmployee;
          });
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeePage');
  }

  /*Set Check Employee*/
  setCheckedEmployee(event, em_id, i) {
    let index;

    if (event.checked) {
      this.chkEmployee.push(em_id);
      this.isHighlightVisible[i] = true;
    }
    else {
      index = this.chkEmployee.indexOf(em_id)
      this.chkEmployee.splice(index, 1);
      this.isHighlightVisible[i] = false;
    }
    console.log(this.chkEmployee);
  }

  /*doInfinite*/
  doInfinite($event) {
    this.employeeService.goNextPage(this.nextPageUrl)
      .then(result => {
        if (this.nextPageUrl != null) {
          this.nextPageUrl = result.next_page_url;
          this.setEmployee(result);
        }
      }).catch(err => { console.log(err) });
  }
  /*Selected Division*/
  getEmployees() {
    console.log(this.selectedDivision);
    this.allEmployee = [];
    this.monthlyEmployee = [];
    this.dailyEmployee = [];
    this.nextPageUrl = "";
    this.chkEmployee = [];
    this.isHighlightVisible=[];
    if (this.selectedDivision == 'allEmployee') {
      this.employeeService.getAllEmployees()
        .then(result => {
          /*set Next Page*/
          this.nextPageUrl = result.next_page_url;
          /*Set Empployee*/
          this.setEmployee(result);

        }).catch(err => { console.log(err) })
    } else {
      this.employeeService.getDivisionEmployee(this.selectedDivision)
        .then(result => {
          this.setEmployee(result);
        }).catch(err => { console.log(err) })
    }
  }

  /*Set Employee*/
  setEmployee(employees) {

    this.allEmployee = employees.data;
    /*Monthly Employee*/
    this.allEmployee.forEach(employee => {
      //1 is monthly
      if (employee.salary_type.id == 1) {
        this.monthlyEmployee.push(employee)
      }
      /*Else is 2 as daily*/
      else {
        this.dailyEmployee.push(employee)
      }
    })
    this.setEmployeeTab();
  }
  /*Set Employee Tab*/
  setEmployeeTab() {
    if (this.groupTab == 'all') {
      this.employees = this.allEmployee
    } else if (this.groupTab == 'monthly') {
      this.employees = this.monthlyEmployee;
    } else if (this.groupTab == 'daily') {
      this.employees = this.dailyEmployee;
    }
  }
  /*Edit Employee*/
  editEmployee(event, index) {
    
    let editPop = this.editPopOver.create(this.employeeEditPage, {
      'em_id': this.employees[index].em_id,
      'name': this.employees[index].name,
      'lastname': this.employees[index].lastname,
      'salary_type_id': this.employees[index].salary_type.id,
      'division_id': this.employees[index].division.id,
      'divisions':this.divisions,
      'departments':this.departments?this.departments:null,
      'department_id':this.employees[index].department?this.employees[index].department.id:null
    }, {
        showBackdrop: true,
        enableBackdropDismiss: false
      });
    editPop.present();
    editPop.onDidDismiss(result => {
      if (result) {
        this.getEmployees();
      }
    })
  }
  /*Change Division Department*/
  changeDivisionDepartment() {
    let popUp = this.editPopOver.create(
      this.popUpDivisionDepartmentPage,
      {
        'divisions': this.divisions,
        'departments': this.departments,
        'employees': this.chkEmployee
      }, {
        showBackdrop: true,
        enableBackdropDismiss: false
      });
    popUp.present();
    popUp.onDidDismiss(result => {
      if (result) {
        this.getEmployees();
      }
    })
  }
  /*Change Salary Type*/
  changeSalaryType() {
    let alert = this.alertCtrl.create({
      title: 'เปลี่ยนการรับเงิน',
      inputs: [
        {
          label: 'รายเดือน',
          type:'radio',
          value:'1'
        },
        {
          label:'รายวัน',
          type:'radio',
          value:'2'
        }
      ],
      buttons: [
        {
          text: 'ยกเลิก',
          role:'cancel',
          cssClass:'alertCancel'
        },
        {
          text:'บันทึก',
          handler:(data)=>{
            this.employeeService.changeSalaryType(data,this.chkEmployee)
            .then(result=>{
              let success=this.alertCtrl.create({title:'การบันทึกเสร็จสิ้น',cssClass:'alertSuccess'})
              success.present();
              this.getEmployees();
            }).catch(err=>{
              let alert = this.alertCtrl.create({title:'ไม่สารถมารถแก้ไขข้อมูลได้'});
              alert.present();
              console.log(err)
            })
          },
          cssClass:'alertConfirm'
        }
      ]
    })
    alert.present();
  }
  /*Delete Employee*/
  deleteEmployee(index) {
    let emID = [this.employees[index].em_id];
    let errAlert = this.alertCtrl.create({
      title: 'ไม่สามารถลบข้อมูลได้'
    })
    let confirmAlert = this.alertCtrl.create({
      title: 'ยืนยันการลบ',
      buttons: [{
        text: 'ยกเลิก',
        role: 'cancel',
        cssClass: 'alertCancel'
      }, {
        text: 'ยืนยัน',
        handler: () => {
          this.employeeService.deleteEmployee(emID)
            .then(result => {
              this.getEmployees();
            }).catch(err => {
              errAlert.present();
              console.log(err)
            });
        }
      }]
    })
    confirmAlert.present();
  }

}
