import { Http ,Headers} from "@angular/http";
import { AuthService } from "../auth.service";
import { WebUrlService } from "../weburl.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ProductionActivityService {
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

    getActivity():Promise<any>{
        let getActivityUrl=this.url+'/api/production/activity';
        return new Promise((resolve,reject)=>{
            this.http.get(getActivityUrl,{headers:this.headers})
                .subscribe(
                    result=>{
                        resolve(result.json());
                    },
                    err=>{
                        reject(err);
                    }
                )
        })
    }
}