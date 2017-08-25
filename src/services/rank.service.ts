import { Injectable } from '@angular/core';
import { Http ,Headers} from '@angular/http';
import { WebUrlService } from "./weburl.service";
import { AuthService } from "./auth.service";

@Injectable()
export class RankService {

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

    /* Get All Ranks */
    getAllRank():Promise<any>{
        let getRankUrl=this.url+'/api/human_resource/rank/get_all';
        return new Promise((resolve,reject)=>{
            this.http.get(getRankUrl,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }
}