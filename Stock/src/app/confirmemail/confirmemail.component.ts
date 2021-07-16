import { Component, OnInit } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { ProgressbarService } from 'src/app/shared_service/progressbar.service';
import { UserService } from 'src/app/shared_service/user.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-confirmemail',
  templateUrl: './confirmemail.component.html',
  styleUrls: ['./confirmemail.component.css']
})
export class ConfirmemailComponent implements OnInit {
  emailConfirmed: boolean = false;
  urlParams: any = {};

  constructor(  private route: ActivatedRoute,
    private authService: UserService,
    public progressBar: ProgressbarService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.urlParams.token = this.route.snapshot.queryParamMap.get('token');
    this.urlParams.userid = this.route.snapshot.queryParamMap.get('userid');
    this.confirmEmail();
  }
 
  confirmEmail() {
    this.progressBar.startLoading();
    this.authService.confirmEmail(this.urlParams).subscribe(
      () => {
        this.progressBar.setSuccess();
        console.log('success');
        this.alertService.success('Email Confirmed');
        this.progressBar.completeLoading();
        this.emailConfirmed = true;
      },
      (error) => {
        this.progressBar.setFailure();
        console.log(error);
        this.alertService.danger('Unable to confirm email');
        this.progressBar.completeLoading();
        this.emailConfirmed = false;
      }
    );
  }

}
