import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared_service/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  
  constructor(public service: UserService,private fb: FormBuilder,private toastr: ToastrService) { }
  formModel = this.fb.group({
    Current_Password: ['', [Validators.required, Validators.minLength(4)]],
    Passwords: this.fb.group({
      New_Password: ['', [Validators.required, Validators.minLength(4)]],
      Confirm_Password: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });
  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('Confirm_Password')!;
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('New_Password')!.value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }
  onSubmit() {
    var body = {
      Current_Password: this.formModel.value.Current_Password,
   
      New_Password: this.formModel.value.Passwords.New_Password,
      Confirm_Password:this.formModel.value.Passwords.Confirm_Password
    };
    this.service.ChangePassword(body).subscribe(
      (res:any) => {
        this.toastr.success('Password updated','Successful');
      },
      err=> {
        if (err.status == 400)
         this.toastr.error('Incorrect password', 'failed.');
     
        else
          console.log(err);
      }
    );

  }
  ngOnInit(): void {
  }

}
