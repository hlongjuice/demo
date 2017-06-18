
import { WebUrlService } from "./weburl.service";
import { NgForm } from "@angular/forms";
import { Http,Headers} from "@angular/http";
import { AuthService } from "./auth.service";
import { DivisionModel } from "../models/division";
import { Injectable } from "@angular/core";

@Injectable()
export class DivisionService {
    public url: string;
    public headers: Headers
    constructor(
        public webUrl: WebUrlService,
        public http: Http,
        public authService: AuthService
    ) {
        this.url = webUrl.getUrl();
        this.authService.getHeader().then(
            header => {
                this.headers = header;
            }
        )
    }

    /*Add*/
    addDivision(formInput: NgForm):Promise<any> {
        let addUrl=this.url+'/api/division';
        return new Promise((resolve,reject)=>{
            let division=new DivisionModel();
            division.name=formInput.value.divisionName;
            this.http.post(addUrl,division,{headers:this.headers})
            .subscribe(
                result=>{
                    resolve(result);
                },
                err=>{
                    reject(err);
                }
            )
        })
    }
    /*Get All Divisions*/
    getDivision():Promise<any> {
        let getDivisionUrl= this.url+'/api/division';
        return new Promise((resolve,reject)=>{
             this.http.get(getDivisionUrl,{headers:this.headers})
             .subscribe(
                 divisions=>{
                     resolve(divisions.json());
                 },
                 err=>{
                     reject(err);
                 }
             )
        })
    }
    /*Edit*/
    editDivsion(divisionName:string,id:number){
        let editDivisionUrl=this.url+'/api/division/'+id;
        let division=new DivisionModel();
        division.name=divisionName;
        return new Promise((resolve,reject)=>{
            this.http.put(editDivisionUrl,division,{headers:this.headers})
            .subscribe(
                result=>{resolve(result)},
                err=>{reject(err)}
            )
        })
    }
    /*Delete*/
    deleteDivision(id:number):Promise<any>{
        let deleteDivisionUrl=this.url+'/api/division/'+id;
        return new Promise((resolve,reject)=>{
            this.http.delete(deleteDivisionUrl,{headers:this.headers})
            .subscribe(
                result=>{resolve(result)},
                err=>{reject(err)}
            )
        })
    }
}