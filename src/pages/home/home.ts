import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
  ) {}
    
  ngOnInit() {
    //  token=this.authService.getToken()
  }
}
