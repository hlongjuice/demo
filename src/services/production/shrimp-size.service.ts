
import { Http, Headers } from "@angular/http";
import { AuthService } from "../auth.service";
import { WebUrlService } from "../weburl.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ProductionShrimpSizeService {
    public headers: Headers;
    public userID: number;
    private url: string;

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

    /*Get Only Enable Shrimp Size*/
    getShrimpSize() {
        let getShrimpSizeUrl = this.url + '/api/production/shrimp_size/enable';
        return new Promise((resolve, reject) => {
            this.http.get(getShrimpSizeUrl, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json());
                },
                err => { reject(err) }
                )
        });
    }
    getAllShrimpSize(): Promise<any> {
        let getAllShrimpSizeUrl = this.url + '/api/production/shrimp_size';
        return new Promise((resolve, reject) => {
            this.http.get(getAllShrimpSizeUrl, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json());
                },
                err => { reject(err) }
                )
        });
    }
    /*Update*/
    update(id,name){
        let updateUrl=this.url+'/api/production/shrimp_size/update/'+id;
        let newName={
            'name':name
        }
        return new Promise((resolve,reject)=>{
            this.http.patch(updateUrl,newName,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }
     /*Update Status*/
    updateStatus(id,status){
        let updateUrl=this.url+'/api/production/shrimp_size/update/status/'+id;
        let newStatus={
            'status':name
        }
        return new Promise((resolve,reject)=>{
            this.http.patch(updateUrl,newStatus,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }
    /*delete*/
    delete(id){
        let deleteUrl=this.url+'/api/production/shrimp_size/delete/'+id;
        return new Promise((resolve,reject)=>{
            this.http.delete(deleteUrl,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }
}