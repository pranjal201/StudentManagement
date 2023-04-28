import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth:AngularFireAuth, private router: Router) { }

  //login method
  login(email:string,password:string){
    
    this.fireauth.signInWithEmailAndPassword(email,password).then(res => {
      localStorage.setItem('token','true');
        if(res.user?.emailVerified == true){
        this.router.navigate(['/dashboard']);
        }
        else {
          this.router.navigate(['verify-email']);
        }
    },err => {
        alert("Something Went Wrong");
        this.router.navigate(['/login']);
    })
  }

  //register method
  register(email:string, password:string){
    this.fireauth.createUserWithEmailAndPassword(email,password).then(res => {
      alert("Registration Succesful :)");
      this.router.navigate(['/login']);
      this.sendEmailForVerification(res.user);

    },err =>{
      alert("Something went wrong :(");
      this.router.navigate(['/register']);
    } )
  }

  //sign out
  logout(){
    this.fireauth.signOut().then(() => {
      alert("Successfully Logged Out!!");
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    },err => {
      alert("Something Went WRong!");
    })
  }

  forgotPassword(email:string){
    this.fireauth.sendPasswordResetEmail(email).then(res=> {
      this.router.navigate(['/verify-email']);
    }, err => {
      alert('Something Went Wrong!!');
    })
  }

  // email verification
  sendEmailForVerification(user:any){
    this.fireauth.currentUser.then(user => user?.sendEmailVerification())
      .then(() =>{
        this.router.navigate(['/verifyEmail']);
      }, (err: any) =>{
          alert('Something Went Wrong. Not able to send mail to registered Email.');
      })


  }
}

