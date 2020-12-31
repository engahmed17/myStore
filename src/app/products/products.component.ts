import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit,OnDestroy {
  dataArray
  subPro:Subscription

  constructor(private fs:AngularFirestore,private route:Router,private title:Title) {
    this.title.setTitle('Products')
   }

  ngOnInit(): void {
    this.subPro = this.fs.collection("products").snapshotChanges().subscribe((data) => {
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

  detail(id){
this.route.navigate(['/product/'+id])
  }

ngOnDestroy(){
  this.subPro.unsubscribe()
}
}
