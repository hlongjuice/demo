import { AuthService } from './auth.service';
import { Http,Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { WebUrlService } from "./weburl.service";
@Injectable()
export class DepartmentService {
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

    getDepartment():Promise<any>{
        let getDepartmentUrl=this.url+'/api/human_resource/department';
        return new Promise((resolve,reject)=>{
            this.http.get(getDepartmentUrl,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }
}