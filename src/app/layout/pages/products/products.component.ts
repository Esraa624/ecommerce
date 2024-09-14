import { Component, OnDestroy } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, LowerCasePipe } from '@angular/common';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CarouselModule,RouterLink ,CurrencyPipe, FilterPipe ,LowerCasePipe, FormsModule ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnDestroy {


  productSub!:Subscription

  searchTerm:string = ''

  isLoading:boolean = false


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true,
    rtl: true
  }







productList:Product[] =[]

  constructor(private _productService:ProductService , private _cartService:CartService ,private toastr: ToastrService ){}
 
  ngOnInit(){

    
   

    if(typeof localStorage !== 'undefined'){

      localStorage.setItem('currentPage', '/product')
    }

    this.productSub = this._productService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res.data);

        this.productList = res.data
      }


    })

  }



  addProduct(pID:string){

    this.isLoading = true
this._cartService.addProductToCart(pID).subscribe({

  next:(res)=>{

    this._cartService.cartNum.next(res.numOfCartItems)
    console.log(res);

    this.isLoading=false
    this.toastr.success(res.message);
   
  },

  error:(err)=>{
    console.log(err);
    this.isLoading=false
  }

})
  }


  ngOnDestroy(): void {
   this.productSub?.unsubscribe()
  }
}
