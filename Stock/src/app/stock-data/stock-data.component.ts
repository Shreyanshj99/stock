import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { SharedService } from '../shared_service/shared.service';

@Component({
  selector: 'app-stock-data',
  templateUrl: './stock-data.component.html',
  styleUrls: ['./stock-data.component.css']
})
export class StockDataComponent implements OnInit {
  data!: any[][];
  x!:any[][];
  act:boolean=false;
  companylist:any=[];
  constructor(private service:SharedService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.refreshCmpList();
  }
  refreshCmpList(){
    this.service.getCmpList().subscribe(data=>{
      this.companylist=data;
      //console.log(data);
    });
  }
  onFileChange(evt: any) {
    const target : DataTransfer =  <DataTransfer>(evt.target);
    this.act=true;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary',cellDates: true, dateNF: 'yyyy-mm-dd;@' });

      const wsname : string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      //console.log(ws);

      this.data = (XLSX.utils.sheet_to_json(ws, {  raw: false, header: 1 ,dateNF:"yyyy/mm/dd;@"}));

      //console.log(this.data);
      let x1=this.data[1];
      //console.log(x1);
      
       this.x=this.data.slice(1);
      //console.log(x);

    };

    reader.readAsBinaryString(target.files[0]);

  }
  addStock(){
    this.x=this.data.slice(1);
    const val: { Company_code: any; Stock_Exchange: any; Current_Price: any; Date: any; Time: any; }[] = [];
    
    this.x.forEach(value=>{
      var s={
        Company_code:value[0],
        Stock_Exchange:value[1],
        Current_Price:value[2],
        Date:value[3],
        Time:value[4]
      }
      val.push(s);
      
    });
    console.log(val);


    var excelcode = val.map((t:{Company_code: string})=>{
      return t.Company_code;
    });
    var excelstock = val.map((t:{Stock_Exchange: string})=>{
      return t.Stock_Exchange;
    });
    var excelprice = val.map((t:{Current_Price: string})=>{
      return t.Current_Price;
    });
    var exceldate = val.map((t:{Date: string})=>{
      return t.Date;
    });
    var exceltime = val.map((t:{Time: string})=>{
      return t.Time;
    });
    var list:any=[];
    for(let i=0;i<excelcode.length;i++){
        list.push(excelcode[i]+excelstock[i]+exceldate[i]+exceltime[i]);
    }
    //console.log(new Set(list));
    var list1=new Set(list);
    var list2=Array.from(list1.values());
    if(list2.length==list.length){
      var t =new Set(excelcode);
      var t1:any=Array.from(t.values());
      var ccode = this.companylist.map((t:{company_code: string})=>{
        return t.company_code;
      });
      const result1 = t1.every((val: any) => ccode.includes(val));
      if(result1){
        this.service.addStock(val).subscribe((res:any)=>{
          this.toastr.success('Data Added!', 'Submission Successful');
          this.toastr.info('Number of samples inserted: '+this.x.length, 'Information');
        },
          err=> {
          if (err.status == 400)
           this.toastr.error('Incorrect Data .', 'Submission failed.');
       
          else
            console.log(err);
        }
      );
      }
      else{
        this.toastr.error('One or More Company does not exists...', 'Submission failed.');
      }

    }
    else{
      this.toastr.error('Duplicate data is present', 'Submission failed.');
    }
    
   // console.log(t1);



  
    
   
   // console.log(ccode);
    
   
    //console.log(result1);
    
    
    //var val=[][];
    /*
    this.service.addStock(val).subscribe((res:any)=>{
      this.toastr.success('Data Added!', 'Submission Successful');
      this.toastr.info('Number of samples inserted: '+this.x.length, 'Information');
    },
      err=> {
      if (err.status == 400)
       this.toastr.error('Incorrect Data .', 'Submission failed.');
   
      else
        console.log(err);
    }
  );
  */
  }

}
