import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    })
   }

  ngOnInit(): void {
  }

  login() {
    console.log(this.loginForm.value);
    if(this.loginForm.value.username === 'admin' && this.loginForm.value.password === '$m3llycat') {
      this.router.navigate(["/upload"]);
    } else {
      window.alert('Enter correct username and password');
    }
  }

}
