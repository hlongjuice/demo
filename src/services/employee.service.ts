import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WebUrlService } from "./weburl.service";
import { Http, Headers } from "@angular/http";
import { AuthService } from "./auth.service";
import { TransferObject, Transfer, FileUploadOptions, FileUploadResult } from "@ionic-native/transfer";
import { EmployeeModel } from "../models/human-resource/employee";

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
    getAllEmployees(): Promise<any> {
        let getEmUrl = this.url + '/api/human_resource/employee/all';
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
    /* Get All Employee Without Page */
    getAllEmployeeWithOutPage(){
        let getEmployeeUrl=this.url+'/api/human_resource/employee/all/without_page';
        return new Promise((resolve,reject)=>{
            this.http.get(getEmployeeUrl,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        });
    }
    /*Get Division Employee*/
    getDivisionEmployee(division_id): Promise<any> {
        let divisionEmployeeUrl = this.url + '/api/human_resource/employee/division/' + division_id;
        return new Promise((resolve, reject) => {
            this.http.get(divisionEmployeeUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }
    

    /*Go New Page*/
    goNextPage(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(url, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json())
                },
                err => { reject(err) }
                )
        });
    }

    /*Delete Employee*/
    deleteEmployee(emID):Promise<any> {
        let emIDList={
            'em_id':emID
        }
        let deleteUrl = this.url + '/api/human_resource/employee/delete';
        return new Promise((resolve, reject) => {
            this.http.post(deleteUrl,emIDList,{ headers: this.headers })
                .subscribe(result => {
                    resolve(result.json())
                }, err => { reject(err) });
        })
    }

    /*Update Employee*/
    updateEmployee(employee):Promise<any>{
        let employeeInput={
            'em_id':employee.em_id,
            'name':employee.name,
            'lastname':employee.lastname,
            'division_id':employee.division_id,
            'department_id':employee.department_id,
            'salary_type_id':employee.salary_type_id
        }
        let editUrl=this.url+'/api/human_resource/employee/update';
        return new Promise((resolve,reject)=>{
            this.http.post(editUrl,employeeInput,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }
    /*Multiple Change Division Department*/
    changeDivisionDepartment(division,department,employees):Promise<any>{
        let divisionInput={
            'division_id':division,
            'employees':employees,
            'department_id':department
        }
        console.log(divisionInput);
        let changeDivisionUrl=this.url+'/api/human_resource/employee/change/division_department';
        return new Promise((resolve,reject)=>{
            this.http.post(changeDivisionUrl,divisionInput,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }
    /*Change Salary Type*/
    changeSalaryType(salary,employees):Promise<any>{
        let changeSalaryTypeUrl=this.url+'/api/human_resource/employee/change/salary_type';
        let salaryInput={
            'salary_type_id':salary,
            'employees':employees
        }
        return new Promise((resolve,reject)=>{
            this.http.post(changeSalaryTypeUrl,salaryInput,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }
}