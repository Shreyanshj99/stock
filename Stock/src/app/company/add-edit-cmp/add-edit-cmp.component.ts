import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {SharedService} from 'src/app/shared_service/shared.service';

@Component({
  selector: 'app-add-edit-cmp',
  templateUrl: './add-edit-cmp.component.html',
  styleUrls: ['./add-edit-cmp.component.css']
})
export class AddEditCmpComponent implements OnInit {

  constructor(private service:SharedService,private fb: FormBuilder,private toastr: ToastrService) { }
  /*formModel = this.fb.group({
    id:[String,Validators.required],
    company_name: [String,Validators.required],
    turnover:[Int16Array,[Validators.required]],
    ceo: [String,Validators.required],
    board_directors: [String,Validators.required],
    brief: [String,Validators.required],
    sector: [String,Validators.required],
    stock_exchange: [String,Validators.required],
    stock_code:[Int16Array,[Validators.required]]

  });*/
  @Input() cmp:any;
  id!: string;
      company_name!:string;
      company_code!:string;
      turnover!:number;
      ceo!:string;
      board_directors!:string;
      brief!:string;
      sector!:string;
      stock_exchange!:string;
      stock_code!:number;

  ngOnInit(): void {
    this.id=this.cmp.id;
    this.company_name=this.cmp.company_name;
    this.company_code=this.cmp.company_code;
    this.turnover=this.cmp.turnover;
    this.ceo=this.cmp.ceo;
    this.board_directors=this.cmp.board_directors;
    this.brief=this.cmp.brief;
    this.sector=this.cmp.sector;
    this.stock_exchange=this.cmp.stock_exchange;
    this.stock_code=this.cmp.stock_code;
  }

  addCompany(){
    var val = {
      company_name:this.company_name,
      company_code:this.company_code,
      turnover:this.turnover,
      ceo:this.ceo,
      board_directors:this.board_directors,
      brief:this.brief,
      sector:this.sector,
      stock_exchange:this.stock_exchange,
      stock_code:this.stock_code};
      if(val.company_name==""|| val.company_code=="" || val.turnover==0 || val.stock_exchange=="" || val.ceo=="" || val.stock_code==0 || val.board_directors=="" || val.sector=="" || val.brief==""){
        this.toastr.error('All field needs to be filled','Submission failed.');
      }
      else{
    this.service.addCmp(val).subscribe((res:any)=>{
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

  updateCompany(){
    var val1=this.cmp.id;
    var val2 = {
     
      company_name:this.company_name,
      company_code:this.company_code,
      turnover:this.turnover,
      ceo:this.ceo,
      board_directors:this.board_directors,
      brief:this.brief,
      sector:this.sector,
      stock_exchange:this.stock_exchange,
      stock_code:this.stock_code};
    this.service.updateCmp(val1,val2).subscribe(res=>{
    alert("Updated Successfully");
    });
  }

}
