import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {

  logSub!:Subscription

  show:boolean = false

  isLogin:boolean = false
errorMesg!:string

constructor(private _auth:AuthService,private _Router:Router){}
 


loginForm:FormGroup = new FormGroup({

  
  email: new FormControl(null,[Validators.required,Validators.email]),
  password: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6}/)]),
  
})



sendData(){
  // call api

this.isLogin = true

this.logSub = this._auth.sendLogin(this.loginForm.value).subscribe({
    next:(res)=>{
      console.log(res);

      if(localStorage.getItem('navigateTo') !== null){
        this._Router.navigate([localStorage.getItem('navigateTo')])

      }

      else{
        this._Router.navigate(['/home'])
      }
this.isLogin = false

localStorage.setItem('userToken' ,res.token )

this._auth.decodeUserData()

    },

    error:(err)=>{
      //console.log(err.error.message);
      this.errorMesg = err.error.message
      this.isLogin = false
    }
  })
}

ngOnDestroy(): void {
   this.logSub?.unsubscribe()
}

}
