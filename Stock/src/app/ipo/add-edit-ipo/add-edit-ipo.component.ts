import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {SharedService} from 'src/app/shared_service/shared.service';

@Component({
  selector: 'app-add-edit-ipo',
  templateUrl: './add-edit-ipo.component.html',
  styleUrls: ['./add-edit-ipo.component.css']
})
export class AddEditIpoComponent implements OnInit {

  constructor(private service:SharedService,private toastr: ToastrService) { }
  @Input() ipo:any;
  id!: string;
      company_name!:string;
      stock_exchange!:string;
      price_per_share!:number;
      total_shares!:number;
      date!:string;
      remarks!:string;

  ngOnInit(): void {
    this.id=this.ipo.id;
    this.company_name=this.ipo.company_name;
    this.stock_exchange=this.ipo.stock_exchange;
    this.price_per_share=this.ipo.price_per_share;
    this.total_shares=this.ipo.total_shares;
    this.date=this.ipo.date;
    this.remarks=this.ipo.remarks;
  }
  addIPO(){
    var val = {
      company_name:this.company_name,
      stock_exchange:this.stock_exchange,
      price_per_share:this.price_per_share,
      total_shares:this.total_shares,
      date:this.date,
      remarks:this.remarks
    };
    if(val.company_name=="" ||val.stock_exchange=="" || val.price_per_share==0 || val.total_shares==0 || val.date=="" || val.remarks==""){
      this.toastr.error('All field needs to be filled','Submission failed.');
    }
    else{
    this.service.addIPO(val).subscribe(
      (res:any)=>{
        this.toastr.success('Data added successfully', 'Information');
      },
      err=> {
        if (err.status == 400)
         this.toastr.error('Incorrect Data.', 'Submission failed.');
     
        else
          console.log(err);
      }
    );
    
  }
  }

  updateIPO(){
    var val1=this.ipo.id;
    var val2 = {
     
      company_name:this.company_name,
      stock_exchange:this.stock_exchange,
      price_per_share:this.price_per_share,
      total_shares:this.total_shares,
      date:this.date,
      remarks:this.remarks};
    this.service.updateIPO(val1,val2).subscribe((res:any)=>{
      this.toastr.success('Data added successfully', 'Information');
    },
    err=> {
      if (err.status == 400)
       this.toastr.error('Incorrect Data.', 'Submission failed.');
   
      else
        console.log(err);
    }
  );
  }

}
