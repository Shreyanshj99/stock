import { Component, Input, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartDataSets, ChartOptions,ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { SharedService } from '../shared_service/shared.service';
@Component({
  selector: 'app-fusionch',
  templateUrl: './fusionch.component.html',
  styleUrls: ['./fusionch.component.css']
})
export class FusionchComponent implements OnInit {
 stocklist:any=[];
 newstocklist:any=[];
 price:any=[];
 dates:any=[];
 comp:string="";
 exch:string="";
 newstocklist1:any=[];
 price1:any=[];
 dates1:any=[];
 
 comp1:string="";
 exch1:string="";
 chart:any = [];

 t:boolean=false;
  @Input() ipo:any;
  
      company_name!:string;
      stock_exchange!:string;
      company_code!:string;
      from_period!:string;
      to_period!:string;

      company_name1!:string;
      stock_exchange1!:string;
      company_code1!:string;
      from_period1!:string;
      to_period1!:string;
      



  
  constructor(private service:SharedService) { }

  ngOnInit(): void {
    this.refreshstockList();
    
    this.company_code=this.ipo.company_code;
    this.company_name=this.ipo.company_name;
    this.stock_exchange=this.ipo.stock_exchange;
    this.from_period=this.ipo.from_period;
    this.to_period=this.ipo.to_period;
    

    this.company_code1=this.ipo.company_code1;
      this.company_name1=this.ipo.company_name1;
      this.stock_exchange1=this.ipo.stock_exchange1;
      //console.log(this.company_name1);
      
    
  }
  refreshstockList(){
    this.service.getStock().subscribe(data=>{
      this.stocklist=data;
      //console.log(data);
    });
  }
  add(){
  
    var val={
      company_code:this.company_code,
      company_name:this.company_name,
      stock_exchange:this.stock_exchange,
      from_period:this.from_period,
      to_period:this.to_period

    }
    this.newstocklist= this.stocklist.filter(function (el: { company_Code: { toString: () => string; }; stock_Exchange: { toString: () => string; }; date: { toString: () => string; }; }){
      return el.company_Code.toString().toLowerCase()==
        val.company_code.toString().trim().toLowerCase()
      &&
      el.stock_Exchange.toString().toLowerCase()==
        val.stock_exchange.toString().trim().toLowerCase()
      &&
      el.date.toString()>=val.from_period.toString() &&
      el.date.toString()<=val.to_period.toString()

  });
    //console.log(this.stocklist);
    //console.log(val);
    //console.log(this.newstocklist);
    this.newstocklist.sort((a:{date: { toString: () => string; }}, b:{date: { toString: () => string; }}) => (a.date > b.date) ? 1 : -1);
    //console.log(this.newstocklist);
    var price = this.newstocklist.map((t:{current_Price: number})=>{
      return t.current_Price;
    });
    var date = this.newstocklist.map((t:{date: { toString: () => string; }})=>{
      return t.date;
    });
    //console.log(price);
    //console.log(date);
    //console.log(this.t);
    //console.log(this.company_name);
    //console.log(this.company_name1);
    if(this.t){
     
      
      
     // console.log(this.company_name1);
      var val2={
        company_code:this.company_code1,
        company_name:this.company_name1,
        stock_exchange:this.stock_exchange1,
        from_period:this.from_period,
        to_period:this.to_period
  
      }
      //console.log(val2);
      
      this.newstocklist1= this.stocklist.filter(function (el: { company_Code: { toString: () => string; }; stock_Exchange: { toString: () => string; }; date: { toString: () => string; }; }){
        return el.company_Code.toString().toLowerCase()==
          val2.company_code.toString().trim().toLowerCase()
        &&
        el.stock_Exchange.toString().toLowerCase()==
          val2.stock_exchange.toString().trim().toLowerCase()
        &&
        el.date.toString()>=val2.from_period.toString() &&
        el.date.toString()<=val2.to_period.toString()
  
    });
    this.newstocklist1.sort((a:{date: { toString: () => string; }}, b:{date: { toString: () => string; }}) => (a.date > b.date) ? 1 : -1);
    //console.log(this.newstocklist1);
    var price1 = this.newstocklist1.map((t:{current_Price: number})=>{
      return t.current_Price;
    });
    var date1 = this.newstocklist1.map((t:{date: { toString: () => string; }})=>{
      return t.date;
    });
    //date1.push(NaN);
    //console.log(this.newstocklist);
    //console.log(this.newstocklist1);
    //console.log(this.company_name);
   // console.log(price);
   // console.log(date);
   // console.log(this.company_name1);
   // console.log(price1);
   // console.log(date1);


   var date2=new Set(date.concat(date1));
    //console.log(date2);
    var date3:any=Array.from(date2.values()).sort();
    console.log(date3);
    let i=0;
    let j=0;
    let k=0;
    while(i<date3.length){
      //console.log(date3[i]);
     
      
      if(j<date.length){
        if(date[j]==date3[i]){
          j++;
          i++;
        }
        else{
          price.splice(j, 0, NaN);
          i++;
        }
      }
    }
    while(i<date3.length){
      
      if(k<date1.length){
        if(date[k]==date3[i]){
          k++;
          i++;
        }
        else{
          price1.splice(k, 0, NaN);
          i++;
        }
      }
    }
    console.log(date);
    console.log(price);

    console.log(date1);
    console.log(price1);









    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: date3,
        datasets: [
          {
            label:this.company_name+" ("+this.stock_exchange+")",
            data: price,
            borderColor: '#3cba9f',
            fill: false
          },
          {
            label:this.company_name1+" ("+this.stock_exchange1+")",
            data: price1,
            borderColor: '#ffcc00',
            fill: false
          }
          
        ]
      },
      options: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Different Companies over specific period'
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Date'
            },
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Stock Price'
            },
          }]
        }
      }
    });


    }




   else if(this.t==false){

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: date,
        datasets: [
          {
            label:this.company_name+" ("+this.stock_exchange+")",
            data: price,
            borderColor: '#3cba9f',
            fill: false
          },
          
        ]
      },
      options: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Single Company over specific period'
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Date'
            },
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Stock Price'
            },
          }]
        }
      }
    });
  }
  
      
  

  }
  extra(){
    this.t=true;
    //console.log(this.t);
  }


}
