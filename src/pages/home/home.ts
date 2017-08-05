import { EmployeePage } from './../human-resource/employee/employee';
import { HumanResourcePage } from './../human-resource/human-resource';
import { ProductionResultPage } from './../production/production-result/production-result';
import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AuthService } from "../../services/auth.service";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  homePage=HomePage;
  productionResultPage = ProductionResultPage;
  employeePage = EmployeePage;
  public name: any;
  constructor(
    private authService: AuthService,
    public navCtrl: NavController,
    public menuCtrl: MenuController
  ) {
    /*  let username='hlongjuice';
      let password='hlong@123';
      this.authService.login(username,password)
      .then(
        result=>{console.log(result)}
      ).catch(err=>{console.log(err)})*/
  }

  ngOnInit() {
    console.log(this.authService.getUser());
    //  token=this.authService.getToken()
    this.menuCtrl.enable(false, 'masterMenu');
    this.menuCtrl.enable(true, 'productionMenu');
  }
  openPage(page) {
    this.menuCtrl.enable(false, 'masterMenu');
    this.menuCtrl.enable(false, 'productionMenu');
    this.menuCtrl.enable(false, 'humanResourceMenu');
    console.log(page);

    if (page == this.productionResultPage) {
      this.menuCtrl.enable(true, 'productionMenu');
    } else if (page == this.employeePage) {
      this.menuCtrl.enable(true, 'humanResourceMenu');
    }
    this.navCtrl.setRoot(page);
    this.menuCtrl.close();
  }
}
