import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {SharedService} from 'src/app/shared_service/shared.service';
@Component({
  selector: 'app-show-ipo',
  templateUrl: './show-ipo.component.html',
  styleUrls: ['./show-ipo.component.css']
})
export class ShowIPOComponent implements OnInit {

  constructor(private service:SharedService,private toastr: ToastrService) { }
  IPOList:any=[];
  ModelTitle!: string;
 
  ActivateAddEditIPOComp:boolean=false;
  ipo:any;

  ngOnInit(): void {
    this.refreshIPOList();
  }
  refreshIPOList(){
    this.service.getIPOList().subscribe(data=>{
      this.IPOList=data;
      console.log(data);
    });
  }
  addClick(){
    this.ipo={
      id:0,
      company_name:"",
      stock_exchange:"",
      price_per_share:0,
      total_shares:0,
      date:"",
      remarks:"",
  

    }
    this.ModelTitle="Add IPOs";
    this.ActivateAddEditIPOComp=true;

  }
  closeClick(){
    this.ActivateAddEditIPOComp=false;
    this.refreshIPOList();
  }

  editClick(item: any){
    this.ipo=item;
    this.ModelTitle="Edit IPOS";
    this.ActivateAddEditIPOComp=true;
  }
  deleteClick(item:any){
    if(confirm('Are you sure??')){
      this.service.deleteIPO(item.id).subscribe(data=>{
        this.toastr.success('Data deleted successfully', 'Information');
        this.refreshIPOList();
      })
    }
  }

}
