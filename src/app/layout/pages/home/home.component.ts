
import { Component, OnDestroy } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, LowerCasePipe } from '@angular/common';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from '../../../shared/interfaces/category';
import { categoryService } from '../../../shared/services/category.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink ,CurrencyPipe, FilterPipe ,LowerCasePipe, FormsModule ],
  templateUrl: './home.component.html',
  styleUrl:'./home.component.css'
})
export class HomeComponent implements OnDestroy {


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
  };



  customOptions_cat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplayHoverPause:true ,
  
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true,
    
  };










  categories:Category[]=[];

arrived:boolean = false



productList:Product[] =[]

  constructor(private _productService:ProductService , private _cartService:CartService ,private toastr: ToastrService , private _catergory:categoryService  ){}
 

  ngOnInit(){

    this.arrived = true;

    this._catergory.get_all_catagory().subscribe({
      next: (res)=>{
        this.categories =res.data;
        this.arrived = false;
      },
    });
   

    if(typeof localStorage !== 'undefined'){

      localStorage.setItem('currentPage', '/home')
    }

    this.productSub = this._productService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res.data);

        this.productList = res.data
      },

    });


    

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

