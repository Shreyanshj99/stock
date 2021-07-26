import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../shared_service/shared.service';
import * as Chart from 'chart.js';
import { newArray } from '@angular/compiler/src/util';
@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css']
})
export class SectorComponent implements OnInit {
  stocklist:any=[];
  cmplist:any=[];
  codelist:any=[];
  
  newstocklist:any=[];
 // tp:any=[];

  codelist1:any=[];
  newstocklist1:any=[];

 

 
  chart:any = [];
 
  t:boolean=false;
   @Input() ipo:any;
   sector!:string;
   stock_exchange!:string;
   company_code!:string;
   from_period!:string;
   to_period!:string;

   sector1!:string;
   stock_exchange1!:string;
   company_code1!:string;
   from_period1!:string;
   to_period1!:string;


  constructor(private service:SharedService) { }

  ngOnInit(): void {
    this.refreshstockList();
    
   // this.company_code=this.ipo.company_code;
    this.sector=this.ipo.sector;
    this.stock_exchange=this.ipo.stock_exchange;
    this.from_period=this.ipo.from_period;
    this.to_period=this.ipo.to_period;
    

   // this.company_code1=this.ipo.company_code1;
      this.sector1=this.ipo.sector1;
      this.stock_exchange1=this.ipo.stock_exchange1;
  }
  refreshstockList(){
    this.service.getStock().subscribe(data=>{
      this.stocklist=data;
      //console.log(data);
    });
    this.service.getCmpList().subscribe(data=>{
      this.cmplist=data;
    });
  }
  extra(){
    this.t=true;
    console.log(this.t);
  }
  add(){
    var val={
      sector:this.sector,
     
      stock_exchange:this.stock_exchange,
      from_period:this.from_period,
      to_period:this.to_period

    }
    this.codelist=this.cmplist.filter(function (el: { sector: { toString: () => string; }}){
      return el.sector.toString().toLowerCase().includes(
        val.sector.toString().trim().toLowerCase()
      )
    });
    //console.log(this.codelist);
    var code = this.codelist.map((t:{company_code: string})=>{
      return t.company_code;
    });
    var name = this.codelist.map((t:{company_name: string})=>{
      return t.company_name;
    });
    //console.log(code);
   var tp:any=[[],[]];
   var td:any=[[],[]];
   var d: any[]=[];
    for(let i=0;i<code.length;i++){
      this.newstocklist= this.stocklist.filter(function (el: { company_Code: { toString: () => string; }; stock_Exchange: { toString: () => string; }; date: { toString: () => string; }; }){
        return el.company_Code.toString().toLowerCase()==
          code[i].toString().trim().toLowerCase()
        &&
        el.stock_Exchange.toString().toLowerCase()==
          val.stock_exchange.toString().trim().toLowerCase()
        &&
        el.date.toString()>=val.from_period.toString() &&
        el.date.toString()<=val.to_period.toString()
  
    });
    this.newstocklist.sort((a:{date: { toString: () => string; }}, b:{date: { toString: () => string; }}) => (a.date > b.date) ? 1 : -1);
    var price = this.newstocklist.map((t:{current_Price: number})=>{
      return t.current_Price;
    });
    var date = this.newstocklist.map((t:{date: { toString: () => string; }})=>{
      return t.date;
    });
    tp[i]=price;
    td[i]=date;
   
    }
    for(var i = 0; i < td.length; i++)
{
    d = d.concat(td[i]);
}
  var dt=new Set(d);
  var date3:any=Array.from(dt.values()).sort();
  for(let i=0;i<td.length;i++){
    let j=0;
    let k=0;
    var emp=[];
    for(let y=0;y<date3.length;y++){
      emp.push(0);
    }
    let pri:any=tp[i];
    while(j<date3.length){
       if(k<td[i].length){
         if(td[i][k]==date3[j]){
           emp[j]=pri[k];
           j++;
           k++;
         }
         else{
           
           //pri.splice(k,0,0);
           j++;
         }
       }
       else{
         j++;
       }
    }
    tp[i]=emp;
  }
  //console.log(date3);
  const sumArray = (array: any[]) => {
    const newArray: any[] = [];
    array.forEach(sub => {
       sub.forEach((num: string | number, index:number) => {
          if(newArray[index]){
             newArray[index] += num;
          }else{
             newArray[index] = num;
          }
       });
    });
    return newArray;
 }
    console.log(tp);
    //console.log(sumArray(tp));

    //td.reduce((acc, val) => acc.concat(val), []);
    //console.log(td);
    //console.log(date3);
    var price:any=sumArray(tp);
    //console.log(price);
    
    if(this.t){

      var val2={
        sector:this.sector1,
     
        stock_exchange:this.stock_exchange1,
        from_period:this.from_period,
        to_period:this.to_period
  
      }
      this.codelist1=this.cmplist.filter(function (el: { sector: { toString: () => string; }}){
        return el.sector.toString().toLowerCase().includes(
          val2.sector.toString().trim().toLowerCase()
        )
      });
      //console.log(this.codelist1);
      
      var code1 = this.codelist1.map((t:{company_code: string})=>{
        return t.company_code;
      });
      var name1 = this.codelist1.map((t:{company_name: string})=>{
        return t.company_name;
      });

      var tp1:any=[[],[]];
      var td1:any=[[],[]];
      var d1: any[]=[];
       for(let i=0;i<code1.length;i++){
         this.newstocklist1= this.stocklist.filter(function (el: { company_Code: { toString: () => string; }; stock_Exchange: { toString: () => string; }; date: { toString: () => string; }; }){
           return el.company_Code.toString().toLowerCase()==
             code1[i].toString().trim().toLowerCase()
           &&
           el.stock_Exchange.toString().toLowerCase()==
             val2.stock_exchange.toString().trim().toLowerCase()
           &&
           el.date.toString()>=val2.from_period.toString() &&
           el.date.toString()<=val2.to_period.toString()
     
       });
       this.newstocklist1.sort((a:{date: { toString: () => string; }}, b:{date: { toString: () => string; }}) => (a.date > b.date) ? 1 : -1);
       var price1 = this.newstocklist1.map((t:{current_Price: number})=>{
         return t.current_Price;
       });
       var date1 = this.newstocklist1.map((t:{date: { toString: () => string; }})=>{
         return t.date;
       });
       tp1[i]=price1;
       td1[i]=date1;
      
       }
       //console.log(tp1);
       //console.log(td1);
       
       for(let p = 0; p < td1.length; p++)
       {
           d1 = d1.concat(td1[p]);
       }
       var dt1=new Set(d1);
  var date4:any=Array.from(dt1.values()).sort();
  for(let i=0;i<td1.length;i++){
    let j=0;
    let k=0;
    var emp=[];
    for(let y=0;y<date4.length;y++){
      emp.push(0);
    }
    var pri:any=tp1[i];
    while(j<date4.length){
       if(k<td1[i].length){
         if(td1[i][k]==date4[j]){
           emp[j]=pri[k];
           j++;
           k++;
         }
         else{
           
           //pri.splice(k,0,0);
           j++;
         }
       }
       else{
         j++;
       }

    }
    tp1[i]=emp;
  }
  //console.log(tp1);
  //console.log(td1);
  
  
 //price date3 price1 date4
  var price1:any=sumArray(tp1);

  console.log(date3);
  console.log(price);
  console.log(date4);
  console.log(price1);
  
  var date5=new Set(date3.concat(date4));

  var date6:any=Array.from(date5.values()).sort();
  console.log(date6);
  //console.log(date6.length);
  
  var i1=0;
  var j1=0;
  var k1=0;
  var i2=0;
  //var empty=newArray(date6.length).fill(NaN);
  var empty=[];
  var empty1=[];
  for(let i=0;i<date6.length;i++){
     empty.push(NaN);
     empty1.push(NaN);
  }
  while(i1<date6.length)
   {
    if(j1<date3.length){
      if(date3[j1]==date6[i1]){
        empty1[i1]=price[j1];
        j1++;
        i1++;
      }
      else{
       // price.splice(j1, 0, NaN);
        i1++;
      }
    }
    else{
      break;
    }
    
  }
  //console.log(price);
  
  while(i2<date6.length){
    
    if(k1<date4.length){
      if(date4[k1]==date6[i2]){
        empty[i2]=price1[k1];
        k1++;
        i2++;
      }
      else{
        //price1.splice(k1, 0, NaN);
        i2++;
        
      }
    }
    else{
      break;
    }
  }
  console.log(empty1);
  console.log(empty);



  this.chart = new Chart('canvas', {
    type: 'line',
    data: {
      labels: date6,
      datasets: [
        {
          label:val.sector.toUpperCase()+' Sector & Companies are: '+name.join(),
          data: empty1,
          borderColor: '#3cba9f',
          fill: false
        },
        {
          label:val2.sector.toUpperCase()+' Sector & Companies are: '+name1.join(),
          data: empty,
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
        text:'Different Sector over specific period'
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
        labels: date3,
        datasets: [
          {
            label:'Companies are: '+name.join(),
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
          text: val.sector.toUpperCase()+ ' Sector over specific period'
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

}
