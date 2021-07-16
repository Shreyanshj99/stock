import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared_service/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userDetails: any;
  helper1 = new JwtHelperService();
  constructor(private router: Router,private service: UserService) { }

  ngOnInit(): void {
   /* const decodedToken = this.helper1.decodeToken(localStorage.getItem('token')!);
    this.userDetails=decodedToken.given_name;
   */ 
    this.service.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      },
    );
    
  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
}
