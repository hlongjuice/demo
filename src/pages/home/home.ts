import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AuthService } from "../../services/auth.service";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public name: any;
  constructor(
    private  authService:AuthService,
    public navCtrl: NavController,
    public menuCtrl:MenuController
  ) {
    let username='isis.juicy@gmail.com';
    let password='hlong@123'
    this.authService.login(username,password)
    .then(
      result=>{console.log(result)}
    ).catch(err=>{console.log(err)})
  }
    
  ngOnInit() {
    //  token=this.authService.getToken()
    this.menuCtrl.enable(false,'masterMenu');
    this.menuCtrl.enable(true,'productionMenu');
  }
}
