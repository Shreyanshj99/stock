import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared_service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetails: any;
  ModelTitle!: string;
 
  ActivateAddEditCmpComp:boolean=false;
  cmp:any;
  constructor(private router: Router,private service: UserService) { }

  ngOnInit(): void {
    this.service.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      },
    );
  }
  closeClick(){
    this.ActivateAddEditCmpComp=false;
    //this.refreshCmpList();
  }

  editClick(){
    //this.cmp=item;
    this.ModelTitle="Edit Department";
    this.ActivateAddEditCmpComp=true;
  }

}
