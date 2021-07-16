import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {SharedService} from 'src/app/shared_service/shared.service';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  constructor(private service:SharedService,private toastr: ToastrService) { }
  @Input() exc:any;
  id!: string;
      stock_exchange!:string;
      brief!:string;
      contact!:string;
     remarks!:string;

  ngOnInit(): void {
    this.id=this.exc.id;
   
    this.brief=this.exc.brief;
  
    this.stock_exchange=this.exc.stock_exchange;
    this.contact=this.exc.contact;
    this.remarks=this.exc.remarks;
   
  }
  addExchange(){
    var val = {
      stock_exchange:this.stock_exchange,
      brief:this.brief,
      contact:this.contact,
      remarks:this.remarks};
    if(val.stock_exchange=="" || val.contact=="" || val.brief=="" || val.remarks==""){
        this.toastr.error('All field needs to be filled','Submission failed.');
      }
      else{
    this.service.addExc(val).subscribe((res:any)=>{
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

  updateExchange(){
    var val1=this.exc.id;
    var val2 = {
     
      stock_exchange:this.stock_exchange,
      brief:this.brief,
      contact:this.contact,
      remarks:this.remarks};
    this.service.updateExc(val1,val2).subscribe(res=>{
    alert("Updated Successfully");
    });
  }

}
