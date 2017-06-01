import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { ProductionScheduleModel } from "../models/production-schedule";
import { ProductionTimePeriodModel } from "../models/production-time-period";
import { ProductionEmPerformanceModel } from "../models/production-em-performance";

@Injectable()
export class ProductionScheduleService {
    public productionSchedule: ProductionScheduleModel;
    public allSchedule: ProductionScheduleModel[] = [];
    public keys: string[] = [];

    constructor(
        private storage: Storage
    ) {
        storage.keys().then(
            (keys: string[]) => {
                this.keys = keys;
            }
        );
    }

    /*Store Schedule to Database*/
    setSchedule(date: string, time: string, activity: string, emID: string, weight: string) {

        let newTimePeriod = new ProductionTimePeriodModel();
        let newEmPerformance = new ProductionEmPerformanceModel();
        let newSchedule = new ProductionScheduleModel();
        let exitData: any;

        newEmPerformance.emId = emID;
        newEmPerformance.weight = Number(weight);

        newTimePeriod.activity = activity;
        newTimePeriod.time = time;
        newTimePeriod.employees.push(newEmPerformance);

        newSchedule.date = date;
        newSchedule.timePeriod.push(newTimePeriod);

        /*Check If Exists data*/
      
        if (this.keys.length != 0) {
            this.keys.forEach(
                (key) => {
                    /*Check date*/
                    if (key == date) {
                        this.storage.get(key)
                            .then(
                            (oldSchedule) => {
                                this.productionSchedule = oldSchedule;
                                console.log('Found Key');
                                console.log(this.productionSchedule);
                                /*Check Time Period*/
                                this.productionSchedule.timePeriod.forEach(
                                    (timePeriod) => {
                                        /*Update If Exists old time*/
                                        if (timePeriod.time == time) {
                                            console.log('Found Time');
                                            timePeriod.employees.push(newEmPerformance);
                                            this.productionSchedule.timePeriod.push(timePeriod);
                                        }
                                        /*Add new if not exists*/
                                        else {
                                            console.log('New Time');
                                            this.productionSchedule.timePeriod.push(newTimePeriod);
                                        }
                                        
                                        /*Pust New Schedule to List of Schedule*/
                                        console.log('Add new Schedule');
                                        this.allSchedule.push(this.productionSchedule);
                                    }
                                )
                            }
                            )
                            console.log('After Check Key');
                    }
                    /*If not same Date store new one*/
                    else {
                        this.allSchedule.push(newSchedule);
                    }
                }
            )
        }
        /*If have no data before store one*/
        else {
            this.allSchedule.push(newSchedule);
        }

        return this.storage.set(date, this.allSchedule)
            .then()
            .catch(
            err => {
                console.log(err);
            }
            )



    }
    /*Get Schedult from database*/
    getSchedule() {
        let date = "";
        if (this.productionSchedule)
            date = this.productionSchedule.date;
        return this.storage.get(date)
            .then(
            (result: any) => {
                return this.productionSchedule = (result != null) ? result : this.productionSchedule;
            }
            )
            .catch(
            err => { console.log(err); }
            )
    }

    /*Get All Schedules*/
    getAllSchedules() {
        this.getKeys();
        this.allSchedule = [];
        this.storage.forEach(
            (value: ProductionScheduleModel) => {
                this.allSchedule.push(value);
            }
        )
        return this.allSchedule;
    }
    getKeys() {
        this.storage.keys()
            .then(
            keys => {
                this.keys = keys;
            }
            )
            .catch(
            err => {
                console.log(err);
            }
            )
    }
}