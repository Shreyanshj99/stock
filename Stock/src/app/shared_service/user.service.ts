import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly BaseURI="https://localhost:44355/api";
  readonly BaseURI1="https://localhost:44351";
  helper = new JwtHelperService();
  
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  
  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', [Validators.email,Validators.required]],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword')!;
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password')!.value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }
  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI1 + '/ApplicationUser/Register', body);
  }

  login(formData:any) {
    return this.http.post(this.BaseURI1 + '/ApplicationUser/Login', formData);
  }
  
confirmEmail(model: any) {
  return this.http.post(this.BaseURI1 + '/ApplicationUser/confirmemail', model);
}
  getUserProfile() {
    return this.http.get(this.BaseURI + '/UserProfile');
  }
  ChangePassword(val1:any) {
    return this.http.post(this.BaseURI + '/UserProfile',val1);
  }
 
  roleMatch(allowedRoles: any[]): boolean {
    var isMatch = false;
    //var payLoad = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1]));
    const decodedToken = this.helper.decodeToken(localStorage.getItem('token')!);
    var userRole = decodedToken.role;
    

    allowedRoles.forEach(value=>{
        if (userRole == value) {
          isMatch = true;
       
        }
      });
    return isMatch;
}
}





