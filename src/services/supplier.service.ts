import { Injectable } from '@angular/core';
import { Http ,Headers} from '@angular/http';
import { WebUrlService } from "./weburl.service";
import { AuthService } from "./auth.service";

@Injectable()
export class SupplierService {

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

    /* Get All Supplier */
    getSupplier():Promise<any>{
        let getUrl=this.url+'/api/other/supplier/get_all';
        return new Promise((resolve,reject)=>{
            this.http.get(getUrl,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        });
    }

    /* Add Supplier */
    addSupplier(formInputs):Promise<any>{
        let addUrl=this.url+'/api/other/supplier/add_supplier'
        return new Promise((resolve,reject)=>{
            this.http.post(addUrl,formInputs,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }
    /* Update Supplier */
    updateSupplier(formInputs):Promise<any>{
        let updateUrl=this.url+'/api/other/supplier/update_supplier'
        return new Promise((resolve,reject)=>{
            this.http.post(updateUrl,formInputs,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }
}