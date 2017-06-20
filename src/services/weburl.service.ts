import {Injectable} from '@angular/core';

@Injectable()
export class WebUrlService{
    public url:string
    constructor(
        // private url:string
    ){
        this.url='http://192.168.1.3/stseafood/public'; 
        console.log('test');
    }
    
    getUrl(){
        return this.url;
    }
}