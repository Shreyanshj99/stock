import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName: '',
    Password: '',
    Roles:''
  }
  emailConfirmed: boolean = false;
  urlParams: any = {};

  constructor(private service: UserService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }
 /* formModel = this.fb.group({
    UserName:[" ",Validators.required],
    Password: [" ",Validators.required],
    Roles:[" ",[Validators.required]]});*/
  ngOnInit(): void {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/home');
   
  }
  /*
  confirmEmail() {
    //this.progressBar.startLoading();
    this.service.confirmEmail(this.urlParams).subscribe(
      (res:any) => {
        this.toastr.success('Valid Email','Email Confirmation');
        //this.progressBar.setSuccess();
        //console.log('success');
        //this.alertService.success('Email Confirmed');
        //this.progressBar.completeLoading();
        this.emailConfirmed = true;
      },
      (error) => {
        this.toastr.error('Invalid Email', 'Email Confirmation');
        //this.progressBar.setFailure();
        console.log(error);
        //this.alertService.danger('Unable to confirm email');
       // this.progressBar.completeLoading();
        this.emailConfirmed = false;
      }
    );
  }
  */

  onSubmit(form: NgForm) {
    var form1={
      Username:form.value.UserName,
      Password:form.value.Password

    };
   
   //console.log(form.value);
  var r =form.value.Roles;
    this.service.login(form1).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        console.log(res);
        if(r=="user")
        this.router.navigateByUrl('/home');
        else if(r=="admin")
        this.router.navigateByUrl('/admin');
      },
      err=> {
        if (err.status == 400)
         this.toastr.error('Incorrect username/password/email not verified .', 'Authentication failed.');
     
        else
          console.log(err);
      }
    );
    
  
  }

}
