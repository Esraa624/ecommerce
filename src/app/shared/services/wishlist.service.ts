// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class WishlistService {

//   constructor() { }
// }



import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environment } from '../../base/Environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {


cartNum : BehaviorSubject<number> = new BehaviorSubject(0)

   //myToken:any 
   //myToken : any = {'token' : localStorage.getItem('userToken')}

  constructor(private _httpClient:HttpClient) { }

 
// addProductToCart(productId:string):Observable<any>
// {
//   return this._httpClient.post(`${Environment.baseUrl}/api/v1/cart`,
//     {

//      "productId":productId
//   }
//   // {
//   //   headers:this.myToken
//   // }
//   )
// }

// updateProductCartQauntity(productId:string, pCount:string):Observable<any>{

//  return this._httpClient.put(`${Environment.baseUrl}/api/v1/cart/${productId}`,

//   {
//     "count": pCount
//   } 
//   // {
//   //   headers:this.myToken
//   // }

 
//  )
// }





getCart():Observable<any>{

  return this._httpClient.get(`${Environment.baseUrl}/api/v1/cart` 

  //  {
  //   headers:this.myToken
  //  }
  )
}






}


