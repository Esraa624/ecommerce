import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environment } from '../../base/Environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {


cartNum : BehaviorSubject<number> = new BehaviorSubject(0)

   //myToken:any 
   //myToken : any = {'token' : localStorage.getItem('userToken')}

  constructor(private _httpClient:HttpClient) { }

 
addProductToCart(productId:string):Observable<any>
{
  return this._httpClient.post(`${Environment.baseUrl}/api/v1/cart`,
    {

     "productId":productId
  }
  // {
  //   headers:this.myToken
  // }
  )
}

updateProductCartQauntity(productId:string, pCount:string):Observable<any>{

 return this._httpClient.put(`${Environment.baseUrl}/api/v1/cart/${productId}`,

  {
    "count": pCount
  } 
  // {
  //   headers:this.myToken
  // }

 
 )
}





getCart():Observable<any>{

  return this._httpClient.get(`${Environment.baseUrl}/api/v1/cart` 

  //  {
  //   headers:this.myToken
  //  }
  )
}


removeSpecitem(pId:string):Observable<any>{

  return this._httpClient.delete(`${Environment.baseUrl}/api/v1/cart/${pId}`)
}


clearCart():Observable<any>{
 return this._httpClient.delete(`${Environment.baseUrl}/api/v1/cart`)

}



}

