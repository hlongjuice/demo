import { Http, Headers } from "@angular/http";
import { AuthService } from "../auth.service";
import { WebUrlService } from "../weburl.service";
import { Injectable } from "@angular/core";
import { ProductionWorkModel } from "../../models/production/production-work";
import { NgForm } from "@angular/forms";

@Injectable()
export class ProductionWorkService {
    public headers: Headers;
    public userID: number;
    private url: string;
    /*Contructor*/
    constructor(
        private http: Http,
        private authService: AuthService,
        private webUrlService: WebUrlService
    ) {
        this.url = this.webUrlService.getUrl();
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

    /*Add New Work*/
    addWork(formInput: NgForm, time_period: string): Promise<any> {
        let addWorkUrl = this.url + '/api/production/work';
        let productionWork = new ProductionWorkModel();
        let user_id;
        productionWork.date = formInput.value.date;
        productionWork.time_period = time_period;
        productionWork.em_id = formInput.value.em_id;
        productionWork.activity_id = formInput.value.activity_id;
        productionWork.shrimp_size_id = formInput.value.shrimp_size_id;
        productionWork.shrimp_type_id = formInput.value.shrimp_type_id;
        productionWork.weight = formInput.value.weight;
        productionWork.user_id = this.userID;

        return new Promise((resolve, reject) => {
            // this.http.post()
            this.http.post(addWorkUrl, productionWork, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json())
                },
                err => { console.log(err) }
                )
        });
    }

    /*Amount Weight Per Employeee*/
    employeeAmountWeight(em_id: number): Promise<any> {
        let amountWeightUrl = this.url + '/api/production/work/employee_amount_weight/' + em_id;
        return new Promise((resolve, reject) => {
            this.http.get(amountWeightUrl, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json());
                },
                err => { console.log(err) }
                );
        });
    }

    /*Get Time Period*/
    getTimePeriod(date): Promise<any> {
        let getTimePeriodUrl = this.url + '/api/production/work/date/' + date;
        return new Promise((resolve, reject) => {
            this.http.get(getTimePeriodUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                );
        });
    }

    /*Get Work List*/
    getWorkList(time_period_id): Promise<any> {
        let getWorkListUrl = this.url + '/api/production/work/date/time_period/' + time_period_id;
        return new Promise((resolve, reject) => {
            this.http.get(getWorkListUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        });
    }

    /*Get Work Details*/
    getWorkDetials(work_id) {
        let getWorkDetialsUrl = this.url + '/api/production/work/date/time_period/work_list/' + work_id;
        return new Promise((resolve, reject) => {
             this.http.get(getWorkDetialsUrl, { headers: this.headers })
             .subscribe(
                 result=>{
                     resolve(result.json());
                 },
                 err=>{reject(err)}
             )
        })
    }
}