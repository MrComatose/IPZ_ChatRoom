import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppHttpClient } from 'src/app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public email: string;
  public password: string;
  public username: string;
  public fullName: string;
  constructor(
    private toastr: ToastrService,
    private httpService: AppHttpClient,
    public router: Router
    ) { }

  ngOnInit() {
  }
  cancel(){
    this.router.navigate(['auth/sign-in']);
  }
  signUp() {
    this.toastr.info("Processing");
    this.httpService.post<any>(`api/auth/signup`,{
      fullName : this.fullName,
      password : this.password,
      email : this.email,
      username : this.username
    }).subscribe(
      response => { 
        this.toastr.clear();
        this.toastr.success('Account created');
        this.router.navigate(['auth/sign-in']);
      },
      error => {
        this.toastr.clear();
        console.error(error);
        this.toastr.error(error.error);
      }
    );
  }
}
