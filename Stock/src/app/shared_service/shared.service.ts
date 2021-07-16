import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl="https://localhost:44354/api";
  readonly APIUrl1="https://localhost:44351";
  constructor(private http:HttpClient) { }

  //Company
  getCmpList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl1+'/Company');
  }

  addCmp(val:any){
    return this.http.post(this.APIUrl1+'/Company',val);
  }

  updateCmp(val1:string,val2: any){
    return this.http.put(this.APIUrl1+'/Company/'+val1,val2);
  }

  deleteCmp(val3:any){
    return this.http.delete(this.APIUrl1+'/Company/'+val3,val3);
  }

  //Stock_data
  addStock(val:any[]){
    return this.http.post(this.APIUrl1+'/Stock_data',val);
  }

  getStock():Observable<any[]>{
    return this.http.get<any>(this.APIUrl1+'/Stock_data');
  }



  //Exchange
  getExcList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl1+'/Exchange');
  }

  addExc(val:any){
    return this.http.post(this.APIUrl1+'/Exchange',val);
  }

  updateExc(val1:string,val2: any){
    return this.http.put(this.APIUrl1+'/Exchange/'+val1,val2);
  }

  deleteExc(val3:any){
    return this.http.delete(this.APIUrl1+'/Exchange/'+val3,val3);
  }


  //IPOs
  getIPOList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl1+'/IPO');
  }

  addIPO(val:any){
    return this.http.post(this.APIUrl1+'/IPO',val);
  }

  updateIPO(val1:string,val2: any){
    return this.http.put(this.APIUrl1+'/IPO/'+val1,val2);
  }

  deleteIPO(val3:any){
    return this.http.delete(this.APIUrl1+'/IPO/'+val3,val3);
  }

  

}
