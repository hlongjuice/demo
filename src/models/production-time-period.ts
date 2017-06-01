

import { ProductionEmPerformanceModel } from "./production-em-performance";

export class ProductionTimePeriodModel {
    public time:string;
    public activity:string;
    public employees:ProductionEmPerformanceModel[]=[];
}