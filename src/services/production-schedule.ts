import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { ProductionScheduleModel } from "../models/production-schedule";
import { ProductionTimePeriodModel } from "../models/production-time-period";
import { ProductionEmPerformanceModel } from "../models/production-em-performance";

@Injectable()
export class ProductionScheduleService {
    public schedule: ProductionScheduleModel;
    public allSchedules: ProductionScheduleModel;
    public dates: string[] = [];

    constructor(
        private storage: Storage
    ) {
        storage.keys().then(
            (dates: string[]) => {
                this.dates = dates;
            }
        );
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
                if (this.dates.length != 0) {
                    if (this.dates.lastIndexOf(date) >= 0) {//If date exist update it 
                        this.storage.get(date)//Get it
                            .then(
                            (oldSchedule: ProductionScheduleModel) => {
                                let sameTimeIndex: number;
                                console.log('Found Key');
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
        let afterReplace:string[]=[];
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
                return this.dates=afterReplace;
            }
            )
            .catch(
            err => {
                console.log(err);
            }
            )
    }
}