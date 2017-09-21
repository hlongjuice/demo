import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AuthService } from "../../services/auth.service";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  homePage = HomePage;
  public name: any;
  constructor(
    private authService: AuthService,
    public navCtrl: NavController,
    public menuCtrl: MenuController
  ) {
  }

  ngOnInit() {
    console.log(this.authService.getUser());
    //  token=this.authService.getToken()
    this.menuCtrl.enable(false, 'masterMenu');
    this.menuCtrl.enable(false, 'productionMenu');
    this.menuCtrl.enable(false, 'humanResourceMenu');
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeEnable(false);
    console.log('Yo!!');
  }
  openPage(page) {
    this.menuCtrl.enable(false, 'masterMenu');
    this.menuCtrl.enable(false, 'productionMenu');
    this.menuCtrl.enable(false, 'humanResourceMenu');
    this.menuCtrl.enable(false, 'qcMenu');
    this.menuCtrl.enable(false,'engineerMenu');
    this.menuCtrl.enable(false,'onlyHomeMenu');

    if (page == 'MainProductionPage') {
      this.menuCtrl.enable(true, 'productionMenu');
    } else if (page == 'MainHrPage') {
      this.menuCtrl.enable(true, 'humanResourceMenu');
    }else if(page=='MainQcPage'){
      this.menuCtrl.enable(true,'qcMenu');
    }else if(page=='MainEngineerPage'){
      this.menuCtrl.enable(true,'engineerMenu')
    }else if(page=='RepairInvoicePage'){
      this.menuCtrl.enable(true,'onlyHomeMenu')
    }
    this.navCtrl.setRoot(page);
    this.menuCtrl.close();
  }
}
