import { Http, Headers } from "@angular/http";
import { AuthService } from "../auth.service";
import { WebUrlService } from "../weburl.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ProductionEmployeeService {
    public headers: Headers;
    public userID: number;
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

    /*Get Employee From Group*/
     getGroupMember(groupID:string):Promise<any>{
        let getEmployeeGroupUrl=this.url+'/api/production/group/members/'+groupID;
        return new Promise((resolve,reject)=>{
            this.http.get(getEmployeeGroupUrl,{headers:this.headers})
            .subscribe(
                result=>{
                    resolve(result.json());
                },
                err=>{reject(err);}
            );
        })
     }

     /*Get All Group*/
     getGroups():Promise<any>{
         let getGroupUrl=this.url+'/api/production/groups';
         return new Promise((resolve,reject)=>{
             this.http.get(getGroupUrl,{headers:this.headers})
             .subscribe(
                 result=>{resolve(result.json())},
                 err=>{console.log(err)}
             )
         })
     }
}