import { Component, OnInit, Input } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AppHttpClient } from "../../core";
import { Router } from '@angular/router';
@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(
    private toastr: ToastrService,
    private httpService: AppHttpClient,
    public router: Router
  ) {}

  ngOnInit() {
  }
  signIn() {
    this.toastr.info("Processing");
    this.httpService.get<any>(`api/auth/signin?email=${this.email}&password=${this.password}`).subscribe(
      response => { 
        localStorage.setItem('token', JSON.stringify(response.token));
        this.toastr.success('Welcome '+ response.user.name);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['chat-room']);
      },
      error => {
        console.error(error);
        this.toastr.error(error.error);
      }
    );
  }
}
