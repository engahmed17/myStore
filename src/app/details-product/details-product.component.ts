import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})

export class DetailsProductComponent implements OnInit , OnDestroy {
 des:Subscription
 idParams
 dataProduct={
  title:'',
  image:'',
  description:'',
  price:''
}

  constructor(private parms:ActivatedRoute,private fs:AngularFirestore , private title:Title) {
    this.title.setTitle('Product Details')
    this.des = this.parms.params.subscribe(query => {
      return this.idParams = query.id
    })
   }

  ngOnInit(): void {
    this.fs.collection('products').ref.doc(this.idParams).get().then(data => {
      this.dataProduct.title = data.data()['title']
      this.dataProduct.image = data.data()['image']
      this.dataProduct.description = data.data()['description']
      this.dataProduct.price = data.data()['price']

    })
  }

 ngOnDestroy(){
  this.des.unsubscribe()
 }
}
