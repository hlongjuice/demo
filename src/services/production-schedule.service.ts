import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Storage } from '@ionic/storage';
import { ProductionScheduleModel } from "../models/production-schedule";
import { ProductionTimePeriodModel } from "../models/production-time-period";
import { ProductionEmPerformanceModel } from "../models/production-em-performance";

@Injectable()
export class ProductionScheduleService {
    public schedule: ProductionScheduleModel;
    public allSchedules: ProductionScheduleModel;
    public dates: string[] = [];
    private keys: string[] = [];

    constructor(
        private storage: Storage,
        private http: Http
    ) {
        storage.keys().then(
            (keys: string[]) => {
                this.keys = keys;
            }
        );
    }

    getDataFromWeb(): Promise<Response> {
        let data: any;
        return new Promise(
            (resolve, reject) => {
                this.http.get('http://localhost:8888/stseafood/public/api/production')
                    .subscribe(
                    (response: Response) => {
                        console.log('In GEt')
                        data = response.json();
                         resolve(data);
                    }
                    )
            }
        )

    }

    /*Store Schedule to Database*/
    setSchedule(date: string, time: string, activity: string, emID: string, weight: string): Promise<any> {

        let newTimePeriod = new ProductionTimePeriodModel();
        let newEmPerformance = new ProductionEmPerformanceModel();
        let newSchedule = new ProductionScheduleModel();
        let exitData: any;
        let keyDate: string;

        keyDate = 'PR-' + date; //rename date to PR key;

        /*Set input to their object*/
        /*Object Em*/
        newEmPerformance.emId = emID;
        newEmPerformance.weight = Number(weight);
        /*Time*/
        newTimePeriod.activity = activity;
        newTimePeriod.time = time;
        newTimePeriod.employees.push(newEmPerformance);
        /*Schedule*/
        newSchedule.date = date;
        newSchedule.timePeriod.push(newTimePeriod);

        /*Return true if you can store data*/
        return new Promise(// use Promise for watting storing process success
            (resolve, reject) => {
                /*Check If Exists data*/
                if (this.keys.length != 0) {
                    console.log('this date')
                    console.log(this.dates);
                    console.log('keyDate')
                    console.log(keyDate)
                    if (this.keys.lastIndexOf(keyDate) >= 0) {//If date exist update it 
                        this.storage.get(keyDate)//Get it
                            .then(
                            (oldSchedule: ProductionScheduleModel) => {
                                let sameTimeIndex: number;
                                console.log('Found Key');
                                console.log(oldSchedule);
                                /*Check Time Perio*/
                                /*If same time*/
                                sameTimeIndex = oldSchedule.timePeriod.findIndex(//Retrieve index of data if it exists and gets -1 if not 
                                    (timePeriod: ProductionTimePeriodModel) => {
                                        console.log('In Find');
                                        console.log(timePeriod.time)
                                        return timePeriod.time == time;
                                    });
                                console.log(sameTimeIndex);
                                /*check Index value*/
                                if (sameTimeIndex >= 0) {
                                    console.log('In SameTimeIndex');
                                    /*Push newEm in old timePeriod*/
                                    oldSchedule.timePeriod[sameTimeIndex].employees.push(newEmPerformance);
                                    this.storage.set(keyDate, oldSchedule);
                                }
                                else {
                                    /*If not have old data push newTimePeriod instead*/
                                    console.log('New Time');
                                    oldSchedule.timePeriod.push(newTimePeriod);
                                    this.storage.set(keyDate, oldSchedule);
                                }
                            }
                            )
                    }
                    else {
                        console.log('Yo!!!');
                        this.allSchedules = newSchedule;
                        this.storage.set(keyDate, this.allSchedules);
                    }
                }
                /*If have no data before store one*/
                else {
                    this.allSchedules = newSchedule;
                    this.storage.set(keyDate, this.allSchedules);
                }
                /*Return Promise*/
                resolve(); //return Promise 
            }
        )

    }
    /*Get Key of data base*/
    getKeys(): Promise<string[]> {
        return this.storage.keys()
            .then(
            keys => {
                return this.keys = keys;
            }
            ).catch(err => { console.log(err) });
    }
    /*Get Schedult from database*/

    getSchedule(date: string): Promise<ProductionScheduleModel> {
        return this.storage.get(date)
            .then(
            (schedule: ProductionScheduleModel) => {
                this.schedule = schedule != null ? schedule : this.schedule;
                return this.schedule;
            }
            ).catch(err => { console.log(err) });
    }
    /*Get all dates*/
    getDates(): Promise<string[]> {
        let afterReplace: string[] = [];
        return this.storage.keys()
            .then(
            dates => {
                /*Remove PR-*/
                dates.forEach(
                    (date) => {
                        afterReplace.push(date.replace('PR-', ''));
                        console.log(date);
                    }
                )
                // this.dates = dates;
                return this.dates = afterReplace;
            }
            )
            .catch(
            err => {
                console.log(err);
            }
            )
    }
}