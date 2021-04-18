import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../models/category';
import {global} from './global';

@Injectable()
export class CategoryService{
    public url: string;
    public identity;
    public token;

    constructor(
        public _http: HttpClient
    ){
        this.url = global.url;
    }

    register(category, token): Observable<any>{
        let json = JSON.stringify(category); //Convierte en JSON en String
        let params = 'json='+json;        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);
                                        
        return this._http.post(this.url+'category', params, {headers: headers});
    }
}