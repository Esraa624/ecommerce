// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-wishlist',
//   standalone: true,
//   imports: [],
//   templateUrl: './wishlist.component.html',
//   styleUrl: './wishlist.component.css'
// })
// export class WishlistComponent {

// }



import { Component } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { Cart } from '../../../shared/interfaces/cart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl:'./wishlist.component.css'
})
export class WishlistComponent {

  myCart!:Cart

  constructor(private _cartService:CartService ,private toastr: ToastrService){}
  ngOnInit(){

    if(typeof localStorage !== 'undefined'){

      localStorage.setItem('currentPage', '/wish list')
    }


this._cartService.getCart().subscribe({

next:(res)=>{
  console.log(res);

  this.myCart = res
},

error:(err)=>{
  console.log(err);
}



})


  }

  removeItem(pId:string)
  {
    this._cartService.removeSpecitem(pId).subscribe({
      next:(res)=>{
        console.log(res);
        this.myCart = res
        this.toastr.error("item deleted");

        this._cartService.cartNum.next(res.numOfCartItems)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  


  addProduct(pID:string){

    
this._cartService.addProductToCart(pID).subscribe({

  next:(res)=>{

    
    console.log(res);

  
    this.toastr.success(res.message);
   
  },

  error:(err)=>{
    console.log(err);
  
  }

})
  }

}

