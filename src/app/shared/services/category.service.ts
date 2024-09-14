
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../base/Environment';

@Injectable({
  providedIn: 'root'
})
export class categoryService {

  constructor( private _HttpClient:HttpClient) { }
  get_all_catagory():Observable<any>{
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/categories`)
  }
  get_specfic_cat(id:string){
    this._HttpClient.get(`${Environment.baseUrl}/api/v1/categories/${id}`)
  }
}