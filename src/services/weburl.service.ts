import {Injectable} from '@angular/core';

@Injectable()
export class WebUrlService{
    public url:string
    constructor(
        // private url:string
    ){
        this.url='http://192.168.43.81/stseafood/public'; 
    }
    
    getUrl(){
        return this.url;
    }
}