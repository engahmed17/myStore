import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css']
})

export class MyproductsComponent implements OnInit,OnDestroy {
uId
successMessage
dataArray
getProducts:Subscription

  constructor(private fs:AngularFirestore , private as:AuthService , private title:Title) {
    this.title.setTitle('My Products')
    this.as.user.subscribe(user => {
      this.uId = user.uid
    })
   }

  ngOnInit(): void {
    this.getProducts = this.fs.collection("products").snapshotChanges().subscribe((data) => {
     this.dataArray = data.map(element => {
        return {
          id:element.payload.doc.id,
          description:element.payload.doc.data()['description'],
          image:element.payload.doc.data()['image'],
          price:element.payload.doc.data()['price'],
          title:element.payload.doc.data()['title'],
          uid:element.payload.doc.data()['uid'],
        }
      })
    })
  }

addProduct(f){
 let data = f.value
 this.fs.collection("products").add({
 title:data.title,
 description:data.description,
 price:data.price,
 image:data.image,
 uid:this.uId
  }).then(()=>{
 this.successMessage = 'Added'
 window.location.reload()
   })
  }

delete(id){
 this.fs.collection("products").doc(id).delete()
  }

ngOnDestroy(){
 this.getProducts.unsubscribe()
  }
}
