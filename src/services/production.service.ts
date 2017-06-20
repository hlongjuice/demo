import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm } from "@angular/forms";
import { ProductionModel } from "../models/production";
import { AuthService } from "./auth.service";
import { WebUrlService } from "./weburl.service";


@Injectable()
export class ProductionService {
    private headers: Promise<Headers>;
    private url: string;
    constructor(
        private authService: AuthService,
        private http: Http,
        private webUrlService: WebUrlService
    ) {
        console.log('Yoo!!');
        this.url = this.webUrlService.getUrl();
        this.authService.getToken()
            .then(
            token => {
                let headerPromise:Promise<Headers> = new Promise((resolve, reject) => {
                    let headers = new Headers({
                        "Accept": "application/json",
                        "Authorization": "Bearer " + token,
                    });
                    resolve(headers);
                });

                this.headers = headerPromise;
                console.log("In Contrucktor")
            }
            )
    }


    setProductionSchedule(formInput: NgForm, userID: number) {
        console.log('In Set Production')
        let production = new ProductionModel();
        let timePeriod = formInput.value.timeStart + ' - ' + formInput.value.timeEnd;
        // let setProductionUrl = 'http://localhost/stseafood/public/api/production';
        let setProductionUrl = this.url + '/api/production';

        production.date = formInput.value.date;
        production.timePeriod = timePeriod;
        production.activity = formInput.value.activity;
        production.emID = formInput.value.emID;
        production.weight = formInput.value.weight;
        production.userID = userID;

        this.headers.then(
            headers => {
                this.http.post(setProductionUrl, production, { headers: headers })
                    .subscribe(
                    val => { console.log(val.json()) }
                    );
            }
        )

    }

    /*Get All Production Schedule*/
    getAllProductionSchedule() {
        let getProductionUrl = this.url + '/api/production';
        // let getProductionUrl = 'http://localhost/stseafood/public/api/production';
        console.log('In get All product')
        this.headers.then(
            headers => {
                this.http.get(getProductionUrl, { headers: headers })
                    .subscribe(
                    val => {
                        console.log(val.json());
                    }
                    )
            }
        )
    }

    /*Get All Schedule Date*/
    getAllProductionScheduleDate(): Promise<any> {
        let getAllScheduleDateUrl = this.url + '/api/production/dates';
        // let getAllScheduleDateUrl = 'http://localhost/stseafood/public/api/production/dates'
        return new Promise((resolve, reject) => {
            this.headers.then(
                headers => {
                    this.http.get(getAllScheduleDateUrl, { headers: headers })
                        .subscribe(
                        dates => {
                            resolve(dates.json());
                        }
                        )
                }
            )

        })
    }

    /*Get Schedule*/
    getProductionSchedule(date_id: number) {
        let getProductionScheduleUrl = this.url + '/api/production/schedule/' + date_id;
    //   let getProductionScheduleUrl='http://localhost/stseafood/public/api/production/schedule/'+date_id;
        return new Promise((resolve, reject) => {
            this.headers.then(
                headers => {
                    this.http.get(getProductionScheduleUrl, { headers: headers })
                    .subscribe(
                        schedule=>{
                            resolve(schedule.json());
                        }
                    )
                }
            )
        })
    }
}
