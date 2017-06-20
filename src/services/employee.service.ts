import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WebUrlService } from "./weburl.service";
import { Http, Headers } from "@angular/http";
import { EmployeeModel } from "../models/employee";
import { AuthService } from "./auth.service";
import { TransferObject, Transfer, FileUploadOptions, FileUploadResult } from "@ionic-native/transfer";
import { DivisionModel } from "../models/division";

@Injectable()
export class EmployeeService {

    public url: string;
    public headers: Headers;
    public userID: number;
    public employees: EmployeeModel[] = [];
    constructor(
        private webUrl: WebUrlService,
        private http: Http,
        private authService: AuthService,
        private transfer: Transfer
    ) {
        this.url = this.webUrl.getUrl();
        /*Get User ID*/
        this.authService.getUser().then(
            userID => {
                this.userID = userID.id
                this.authService.getHeader()
                    .then(
                    headers => {
                        this.headers = headers
                    }
                    )
            }
        )
    }

    /*Get Employee*/
    getEmployee(): Promise<any> {
        let getEmUrl = this.url + '/api/employee';
        return new Promise((resolve, reject) => {
            this.http.get(getEmUrl, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json());
                },
                err => {
                    reject(err)
                }
                )
        })

    }

    /*Add Employee*/
    addEmployee(formInput: NgForm): Promise<any> {
        return new Promise((resolve, reject) => {
            let employee = new EmployeeModel();
            let division=new DivisionModel();
            let addEmUrl = this.url + '/api/employee';

            division.id=formInput.value.division_id;

            employee.em_id = formInput.value.em_id;
            employee.name = formInput.value.name;
            employee.lastname = formInput.value.lastname;
            employee.division = division;
            employee.created_by_user_id = this.userID;
            employee.updated_by_user_id = this.userID;

            if(formInput.value.image){
                console.log(formInput.value.image);
                this.uploadEmployeeImage(formInput.value.image,formInput.value.em_id)
                .then(
                    result=>{
                        console.log(result)
                        resolve(result);
                    }
                )
                .catch(err=>{
                    console.log('IN Serive Error');
                    // console.log(document.write(err.body));
                    reject(err);
                })
            }

           /* this.http.post(addEmUrl, employee, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result)
                },
                err => { reject(err) }
                )
                */
        })
    }

    /*Edit Employee*/
    editEmployee(formInput: NgForm, id: number): Promise<any> {
        let editEmUrl = this.url + '/api/employee/' + id;
        let employee = new EmployeeModel();
        employee.name = formInput.value.name;
        employee.lastname = formInput.value.lastname;
        employee.updated_by_user_id = this.userID;
        return new Promise((resolve, reject) => {

            this.http.put(editEmUrl, employee, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result);
                },
                err => {
                    reject(err);
                }
                )
        })
    }

    /*Delete Employee*/
    deleteEmployee(id: number): Promise<any> {
        let deleteEmUrl = this.url + '/api/employee/' + id;
        return new Promise((resolve, reject) => {
            this.http.delete(deleteEmUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result) },
                err => { reject(err) }
                )
        })
    }
     uploadEmployeeImage(filePath:string,emID:string):Promise<FileUploadResult>{
         let uploadImageUrl=this.url+'/api/image_transfer';
         let option:FileUploadOptions={
             fileKey:'emImage',
            //  fileName:emID,
             httpMethod:'POST',
             headers:this.headers
         }
         const fileTransfer: TransferObject = this.transfer.create()
         return fileTransfer.upload(filePath,uploadImageUrl,option);
     }
}