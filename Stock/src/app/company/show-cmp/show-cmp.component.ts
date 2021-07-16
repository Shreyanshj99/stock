import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {SharedService} from 'src/app/shared_service/shared.service';

@Component({
  selector: 'app-show-cmp',
  templateUrl: './show-cmp.component.html',
  styleUrls: ['./show-cmp.component.css']
})
export class ShowCmpComponent implements OnInit {
  
  
  constructor(private service:SharedService,private toastr: ToastrService) { }
  
  CompanyList:any=[];
  ModelTitle!: string;
 
  ActivateAddEditCmpComp:boolean=false;
  cmp:any;

  ngOnInit(): void {
    this.refreshCmpList();
  }
  refreshCmpList(){
    this.service.getCmpList().subscribe(data=>{
      this.CompanyList=data;
      console.log(data);
    });
  }
  addClick(){
    this.cmp={
      id:0,
      company_name:"",
      company_code:"",
      turnover:0,
      ceo:"",
      board_directors:"",
      brief:"",
      sector:"",
      stock_exchange:"",
      stock_code:0
  

    }
    this.ModelTitle="Add Department";
    this.ActivateAddEditCmpComp=true;

  }
  closeClick(){
    this.ActivateAddEditCmpComp=false;
    this.refreshCmpList();
  }

  editClick(item: any){
    this.cmp=item;
    this.ModelTitle="Edit Department";
    this.ActivateAddEditCmpComp=true;
  }
  deleteClick(item:any){
    if(confirm('Are you sure??')){
      this.service.deleteCmp(item.id).subscribe(data=>{
        this.toastr.success('Data deleted successfully', 'Information');
        this.refreshCmpList();
      });
    }
  }
}
