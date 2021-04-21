import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../models/category';
import {global} from './global';

@Injectable()
export class CategoryService{
    public url: string;    

    constructor(
        public _http: HttpClient
    ){
        this.url = global.url;
    }

    create(category, token): Observable<any>{
        let json = JSON.stringify(category); //Convierte JSON en String
        let params = 'json='+json;        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') //application/x-www-form-urlencoded: Los valores son codificados en tuplas llave-valor separadas por '&', con un '='  entre la llave y el valor.
                                        .set('Authorization', token);
                                        
        return this._http.post(this.url+'category', params, {headers: headers});
    }

    getCategories(): Observable<any>{        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'category', {headers: headers});
    }
}