import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { AuthService } from "../../auth.service";
import { WebUrlService } from "../../weburl.service";
@Injectable()
export class CarUsageService {
    private headers: Headers;
    private userID: number;
    private url: string;

    /*Constructor*/
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

    /* Get By Month */
    getByMonth(car_id,year,month):Promise<any>{
        let inputs={
            'car_id':car_id,
            'year':year,
            'month':month
        }
        let getByMonthUrl=this.url+'/api/human_resource/car/car_usage/get_by_month';
        return new Promise((resolve,reject)=>{
            this.http.post(getByMonthUrl,inputs,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }
}