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
    this.menuCtrl.enable(false, 'productionMenu');
    this.menuCtrl.enable(false, 'humanResourceMenu');
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeEnable(false);
  }
  openPage(page) {
    this.menuCtrl.enable(false, 'masterMenu');
    this.menuCtrl.enable(false, 'productionMenu');
    this.menuCtrl.enable(false, 'humanResourceMenu');
    this.menuCtrl.enable(false, 'qcMenu');
    this.menuCtrl.enable(false,'engineerMenu')

    if (page == 'ProductionResultPage') {
      this.menuCtrl.enable(true, 'productionMenu');
    } else if (page == 'CarResponsePage') {
      this.menuCtrl.enable(true, 'humanResourceMenu');
    }else if(page=='QcShrimpRecorderPage'){
      this.menuCtrl.enable(true,'qcMenu');
    }else if(page=='EngineerPage'){
      this.menuCtrl.enable(true,'engineerMenu')
    }
    this.navCtrl.setRoot(page);
    this.menuCtrl.close();
  }
}
