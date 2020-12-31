import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(private sa:AuthService , private fs:AngularFirestore , private route:Router , private title: Title) {
    this.title.setTitle('Register')
   }

  ngOnInit(): void {
  }

 register(f) {
 let data = f.value
  this.sa.singUp(data.email , data.password).then((user) =>{
  localStorage.setItem("userConnect",user.user.uid)
  this.fs.collection("users").doc(user.user.uid).set({
    flName:data.flName,
    email:data.email,
    age:data.age,
    address:data.address,
    uid:user.user.uid,
    image:'assets/image/avatar.png'
   }).then(() => {
    this.route.navigate(['/'])
   })
 }).catch(() =>{
  alert("Have Problem Try Again")
})
}
}
