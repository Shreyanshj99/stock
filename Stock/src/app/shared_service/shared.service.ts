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
    return this.http.get<any>(this.APIUrl+'/Company');
  }

  addCmp(val:any){
    return this.http.post(this.APIUrl+'/Company',val);
  }

  updateCmp(val1:string,val2: any){
    return this.http.put(this.APIUrl+'/Company/'+val1,val2);
  }

  deleteCmp(val3:any){
    return this.http.delete(this.APIUrl+'/Company/'+val3,val3);
  }

  //Stock_data
  addStock(val:any[]){
    return this.http.post(this.APIUrl+'/Stock_data',val);
  }

  getStock():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Stock_data');
  }



  //Exchange
  getExcList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Exchange');
  }

  addExc(val:any){
    return this.http.post(this.APIUrl+'/Exchange',val);
  }

  updateExc(val1:string,val2: any){
    return this.http.put(this.APIUrl+'/Exchange/'+val1,val2);
  }

  deleteExc(val3:any){
    return this.http.delete(this.APIUrl+'/Exchange/'+val3,val3);
  }


  //IPOs
  getIPOList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/IPO');
  }

  addIPO(val:any){
    return this.http.post(this.APIUrl+'/IPO',val);
  }

  updateIPO(val1:string,val2: any){
    return this.http.put(this.APIUrl+'/IPO/'+val1,val2);
  }

  deleteIPO(val3:any){
    return this.http.delete(this.APIUrl+'/IPO/'+val3,val3);
  }

  

}
