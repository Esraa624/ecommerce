
import { Component, inject } from '@angular/core';

import { RouterLink } from '@angular/router';
import { Category } from '../../../shared/interfaces/category';
import { CategoriesService } from '../../../shared/services/categories.service';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl:  './categories.component.html',
  styleUrl:  './categories.component.css'
})
export class CategoriesComponent {
  all_catagory:Category[]=[]
  all_sup:any[]=[];
  _categoryService=inject(CategoriesService)
  ngOnInit(){
    this._categoryService.get_all_catagory().subscribe((res)=>{
      this.all_catagory=res.data;
     
    })
  }
  is_sup:boolean=false;
  text:string='';
  show_sup(id:string,text:string){
    this.is_sup=true
    this.text=text;
    this._categoryService.get_sup_on_cat(id).subscribe((res)=>{
      this.all_sup=res.data
      
      
    })

  }
}











