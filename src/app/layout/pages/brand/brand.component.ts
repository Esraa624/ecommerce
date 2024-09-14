
import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { BrandService } from '../../../shared/services/brand.service';
import { Brand } from '../../../shared/interfaces/brand';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [],
  templateUrl:'./brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent {

  allBrands:Brand = {} as Brand;

  private readonly _BrandsService = inject(BrandService);
  brandSubscription!:Subscription
  brandId!: any
  detailsBrand!: any
  detailsBrandSubscription!:Subscription
  ngOnInit(): void {
   
  
     this.brandSubscription = this._BrandsService.getAllBrands().subscribe({
      next:(res)=>{
        this.allBrands = res;
      }
     });
  
    
  

    if(typeof localStorage !== 'undefined'){

          localStorage.setItem('currentPage', '/brand')
        };

  }
  ngOnDestroy(): void {
   
    this.brandSubscription?.unsubscribe();
  }
}





