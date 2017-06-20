import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, LoadingController, PopoverController } from 'ionic-angular';
import { FileChooser } from "@ionic-native/file-chooser";
import { TransferObject } from "@ionic-native/transfer";
import { NgForm } from "@angular/forms";
import { EmployeeService } from "../../../../services/employee.service";
import { DivisionModel } from "../../../../models/division";
import { FilePath } from "@ionic-native/file-path";
import { ImagePicker, ImagePickerOptions } from "@ionic-native/image-picker";
import { ErrorPage } from "../../../error/error";

/**
 * Generated class for the EmployeeAddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-employee-add',
  templateUrl: 'employee-add.html',
})
export class EmployeeAddPage {
  public divisionSelected: string;
  private imageInput: string;
  public divisionsInput: DivisionModel[] = [];
  errPage=ErrorPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public emImage: FileChooser,
    public filePath:FilePath,
    public fileTransfer: TransferObject,
    public emService: EmployeeService,
    public alertCtrl: AlertController,
    public viewCtrl:ViewController,
    public loadingCtrl:LoadingController,
    private imagePicker: ImagePicker,
  ) {
  }

  ngOnInit() {

    this.divisionsInput = this.navParams.get('divisionsInput');
    console.log(this.divisionsInput);
    this.divisionSelected = this.divisionsInput[0].name;
    console.log(this.divisionSelected);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeeAddPage');
  }

  selectFile() {
    this.emImage.open()
      .then(
      filePath => {
        this.filePath.resolveNativePath(filePath)
        .then(
          path=>{
             this.imageInput = path;
          }
        )
       
      }
      )
      .catch(err => { console.log(err) });
  }

  selectImage(){
    let option:ImagePickerOptions={
      width:500,
      height:500
    }
    this.imagePicker.getPictures(option).then(
      imageUrl=>{
        console.log(imageUrl);
        this.imageInput=imageUrl;
      }
    )
  }

  onSubmit(formInput: NgForm) {
     
    this.emService.addEmployee(formInput)
      .then(
      result => {
        console.log('In Result')
        console.log(result);
        this.viewCtrl.dismiss();
      }
      )
      .catch(err => {
       let alert=this.alertCtrl.create({
          title:'ไม่สามารถเพิ่มข้อมูลได้',
          // message:err,
          buttons:['Dismiss']
        })
        alert.present();
        console.log('In Error');
         console.log(err.body)
        this.viewCtrl.dismiss();
      })

       
        
  }


}
