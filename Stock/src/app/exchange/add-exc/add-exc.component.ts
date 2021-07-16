import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {SharedService} from 'src/app/shared_service/shared.service';

@Component({
  selector: 'app-add-exc',
  templateUrl: './add-exc.component.html',
  styleUrls: ['./add-exc.component.css']
})
export class AddExcComponent implements OnInit {

  constructor(private service:SharedService,private toastr: ToastrService) { }
  ExchangeList:any=[];

 
  ModelTitle!: string;
  ActivateAddEditExcComp:boolean=false;
  exc:any;

  ngOnInit(): void {
    this.refreshExcList();
  }
  refreshExcList(){
    this.service.getExcList().subscribe(data=>{
      this.ExchangeList=data;
      console.log(data);
    });
  }
  addClick(){
    this.exc={
      id:0,
      stock_exchange:"",
      brief:"",
      contact:"",
      remarks:"",
  

    }
    this.ModelTitle="Add Stock Exchange";
    this.ActivateAddEditExcComp=true;

  }
  closeClick(){
    this.ActivateAddEditExcComp=false;
    this.refreshExcList();
  }

  editClick(item: any){
    this.exc=item;
    this.ModelTitle="Edit Stock Exchange ";
    this.ActivateAddEditExcComp=true;
  }
  deleteClick(item:any){
    if(confirm('Are you sure??')){
      this.service.deleteExc(item.id).subscribe(data=>{
        this.toastr.success('Data deleted successfully', 'Information');
        this.refreshExcList();
      });
    }
   }
}
