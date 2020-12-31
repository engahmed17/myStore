import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent implements OnInit,OnDestroy {
 uId
 dataProfile={
  flName:'',
  age:'',
  address:'',
  image:'',
  uid:''
}
succesUpdate
userSubscribe:Subscription

  constructor(private as:AuthService , private fs:AngularFirestore , private title:Title) {
    this.title.setTitle('Profil')
    this.userSubscribe = this.as.user.subscribe((user) => {
      this.uId = user.uid
    })
   }

  ngOnInit(): void {
    this.fs.collection("users").ref.doc(localStorage.getItem("userConnect")).get().then((data) => {
      this.dataProfile.flName=data.data()['flName']
      this.dataProfile.age=data.data()['age']
      this.dataProfile.address=data.data()['address']
      this.dataProfile.image=data.data()['image']
      this.dataProfile.uid=localStorage.getItem("userConnect")
    })
  } 

  update(){
    this.fs.collection("users").doc(this.dataProfile.uid).update({
      flName:this.dataProfile.flName,
      age:this.dataProfile.age,
      address:this.dataProfile.address,
      image:this.dataProfile.image
    }).then(() => {
      this.succesUpdate="updated"
      window.location.reload()
    })
  }

  ngOnDestroy(){
    this.userSubscribe.unsubscribe()
  }
}
