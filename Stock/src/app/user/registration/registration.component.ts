import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'ngx-alerts';
import { ProgressbarService } from 'src/app/shared_service/progressbar.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  emailConfirmed: boolean = false;
  urlParams: any = {};
  constructor(public service: UserService,private route: ActivatedRoute,private toastr: ToastrService) { }

  ngOnInit():void{
    this.service.formModel.reset();
    this.urlParams.token = this.route.snapshot.queryParamMap.get('token');
    this.urlParams.userid = this.route.snapshot.queryParamMap.get('userid');
    this.confirmEmail();
  }
  confirmEmail() {
    //this.progressBar.startLoading();
    //if(this.emailConfirmed){
    this.service.confirmEmail(this.urlParams).subscribe(
      (res:any) => {
        this.toastr.success('Valid Email','Email Confirmation');
        //this.progressBar.setSuccess();
        //console.log('success');
        //this.alertService.success('Email Confirmed');
        //this.progressBar.completeLoading();
        
      },
      (error) => {
        //this.toastr.error('Invalid Email', 'Email Confirmation');
        //this.progressBar.setFailure();
        console.log(error);
        //this.alertService.danger('Unable to confirm email');
       // this.progressBar.completeLoading();
  
      }
    
    );
    //}
  }
  /*
  onSubmit() {
    this.alertService.info('Creating new user');
    this.progressService.startLoading();

    const registerObserver = {
      next: (x:any) => {
        this.progressService.setSuccess();
        this.alertService.success('Account Created');
        this.progressService.completeLoading();
      },
      error: (err:any) => {
        this.progressService.setFailure();
        this.alertService.danger(err.error.errors[0].description);
        this.progressService.completeLoading();
      },
    };

    this.service.register().subscribe(registerObserver);
  }*/
  
  onSubmit() {
    this.emailConfirmed=true;
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.formModel.reset();
          this.toastr.success('New user created!', 'Registration successful.');
         
        } else {
        res.errors.forEach((element: { code: any; description:any }) => {
          switch (element.code) {
            
              case 'DuplicateEmail':
                this.toastr.error('Email is already taken','Registration failed.');
                break;

              default:
                this.toastr.error(element.description,'Registration failed.');
                break;
         
          
      }
    });
  }
        ( err: any) => {
        console.log(err);
      }
  
  }
    );
}
}
