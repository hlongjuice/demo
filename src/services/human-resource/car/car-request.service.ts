import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthService } from "../../auth.service";
import { WebUrlService } from "../../weburl.service";
@Injectable()
export class CarRequestService {
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
    /*End Contructor*/

    /*Get Car Request*/
    getCarRequest(user_id): Promise<any> {
        let getCarUrl = this.url + '/api/human_resource/car/car_request/' + user_id;
        return new Promise((resolve, reject) => {
            this.http.get(getCarUrl, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json())
                },
                err => { reject(err) }
                )
        });
    }

    /*Add Car Request*/
    addCarRequest(date, car_type_id, division_id, em_id, rank_id, destination, details, user_id): Promise<any> {
        let car_request = {
            'date': date,
            'car_type_id': car_type_id,
            'division_id': division_id,
            'em_id': em_id,
            'rank_id': rank_id,
            'destination': destination,
            'details': details,
            'requested_by_user_id': user_id
        }
        let addCarUrl = this.url + '/api/human_resource/car/car_request/add';
        return new Promise((resolve, reject) => {
            this.http.post(addCarUrl, car_request, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        });
    }

    /*Update Car Request*/
    updateCarRequest(date, car_type_id, division_id, em_id, rank_id, destination, details, user_id):Promise<any> {
        let car_request = {
            'date': date,
            'car_type_id': car_type_id,
            'division_id': division_id,
            'em_id': em_id,
            'rank_id': rank_id,
            'destination': destination,
            'details': details,
            'updated_by_user_id': user_id
        }
        let updateCarUrl = this.url+'/api/human_resource/car/car_request/update';
        return new Promise((resolve,reject)=>{
            this.http.post(updateCarUrl,car_request,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })

    }
}