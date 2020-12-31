import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

   messageError

  constructor(private sa:AuthService , private route:Router , private title: Title) {
    this.title.setTitle('login')
   }

  ngOnInit(): void {
  }
  
  login(f){
    let data = f.value
    this.sa.singIn(data.email , data.password).then((user) => {
      this.route.navigate(['/'])
      localStorage.setItem("userConnect",user.user.uid)
    }).catch(() => {
      this.messageError="Incorrect Email And Password"
    })
  }
}
