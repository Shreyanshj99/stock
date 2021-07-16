import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared_service/shared.service';

@Component({
  selector: 'app-usercompany',
  templateUrl: './usercompany.component.html',
  styleUrls: ['./usercompany.component.css']
})
export class UsercompanyComponent implements OnInit {
  CompanyList:any=[];
  constructor(private service:SharedService) { }
  CompanyNameFilter:string="";
  CompanyListWithoutFilter:any=[];
  ngOnInit(): void {
    this.refreshCompanyList();
  }
  refreshCompanyList(){
    this.service.getCmpList().subscribe(data=>{
      this.CompanyList=data;
      this.CompanyListWithoutFilter=data;
      //console.log(data);
    });
  }
  FilterFn(){
    // var DepartmentIdFilter = this.DepartmentIdFilter;
     var CompanyNameFilter = this.CompanyNameFilter;
     //var StockExchangeFilter=this.StockExchangeFilter;
     //var DateFilter=this.DateFilter;
     this.CompanyList = this.CompanyListWithoutFilter.filter(function (el: { company_name: { toString: () => string; }; stock_exchange: { toString: () => string; }; date: { toString: () => string; }; }){
         return el.company_name.toString().toLowerCase().includes(
           CompanyNameFilter.toString().trim().toLowerCase()
         )
 
     });
   }
   sortResult(prop: string | number,asc: any){
    this.CompanyList = this.CompanyListWithoutFilter.sort(function(a: { [x: string]: number; },b: { [x: string]: number; }){
      if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }

}
