import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

 let toastr: ToastrService = inject(ToastrService)

  return next(req).pipe(catchError((err)=>{


    console.log(err.error.message);
    
   toastr.error(err.error.message)

   
 return throwError(()=> err)

  }));
};
