import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared_service/shared.service';
@Component({
  selector: 'app-useripo',
  templateUrl: './useripo.component.html',
  styleUrls: ['./useripo.component.css']
})
export class UseripoComponent implements OnInit {
  IPOList:any=[];
  constructor(private service:SharedService) { }
 CompanyNameFilter:string="";
  StockExchangeFilter:string="";
  DateFilter:string="";
  IPOListWithoutFilter:any=[];
  ngOnInit(): void {
    this.refreshIPOList();
  }
  refreshIPOList(){
    this.service.getIPOList().subscribe(data=>{
      this.IPOList=data;
      this.IPOListWithoutFilter=data;
      console.log(data);
    });
  }
  FilterFn(){
   // var DepartmentIdFilter = this.DepartmentIdFilter;
    var CompanyNameFilter = this.CompanyNameFilter;
    var StockExchangeFilter=this.StockExchangeFilter;
    var DateFilter=this.DateFilter;
    this.IPOList = this.IPOListWithoutFilter.filter(function (el: { company_name: { toString: () => string; }; stock_exchange: { toString: () => string; }; date: { toString: () => string; }; }){
        return el.company_name.toString().toLowerCase().includes(
          CompanyNameFilter.toString().trim().toLowerCase()
        )&&
        el.stock_exchange.toString().toLowerCase().includes(
          StockExchangeFilter.toString().trim().toLowerCase()
        )&&
        el.date.toString().toLowerCase().includes(
          DateFilter.toString().trim().toLowerCase()
        )

    });
  }
  sortResult(prop: string | number,asc: any){
    this.IPOList = this.IPOListWithoutFilter.sort(function(a: { [x: string]: number; },b: { [x: string]: number; }){
      if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }
}
