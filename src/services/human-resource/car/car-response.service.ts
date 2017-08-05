import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthService } from "../../auth.service";
import { WebUrlService } from "../../weburl.service";
@Injectable()
export class CarResponseService {
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

    /*Get Request*/
    getRequest(status): Promise<any> {
        let getRequestUrl = this.url + '/api/human_resource/car/car_reponse/get_request/' + status;
        return new Promise((resolve, reject) => {
            this.http.get(getRequestUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }

    /*Get Response*/
    getResponse(userID): Promise<any> {
        let getResponseUrl = this.url + '/api/human_resource/car/car_response/get_response';
        return new Promise((resolve, reject) => {
            this.http.get(getResponseUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        });
    }

    /*Approve Request*/
    approveRequest(requestIDList, date,car_type_id, car_id, destination, details, user_id): Promise<any> {
        let approveDetails = {
            'date': date,
            'car_type_id':car_type_id,
            'car_id': car_id,
            'destination': destination,
            'details': details,
            'approved_by_user_id': user_id,
            'car_request_id': requestIDList
        }
        let approveUrl = this.url + '/api/human_resource/car/car_response/approve';
        return new Promise((resolve, reject) => {
            this.http.post(approveUrl, approveDetails, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        });
    }

    /*Update Response*/
    updateResponse(date, car_id, destination, details, user_id): Promise<any> {
        let updateUrl = this.url + '/api/human_resource/car/car_response/update';
        let responseDetails = {
            'date': date,
            'car_id': car_id,
            'destination': destination,
            'details': details,
            'approved_by_user_id': user_id
        }
        return new Promise((resolve, reject) => {
            this.http.post(updateUrl, responseDetails, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        });
    }

    /*Delete Response*/
    deleteResponse(responseID) {
        let responseIDList={
            'response_id':responseID
        }
        /*responseID as Array*/
        let deleteResponseUrl=this.url+'/api/human_resource/car/car_response/delete_response/'+responseID;
        return new Promise((resolve,reject)=>{
            this.http.post(deleteResponseUrl,responseIDList,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        });
    }

    /*Delete Response Request*/
    deleteResponseRequest(response_id,car_reqeust_ids):Promise<any>{
        let requestList={
            'response_id':response_id,
            'car_request_ids':car_reqeust_ids
        }
        let deleteResponseRequestUrl=this.url+'/api/human_resource/car/car_response/delete_response_request';
        return new Promise((resolve,reject)=>{
            this.http.post(deleteResponseRequestUrl,requestList,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        });

    }
}