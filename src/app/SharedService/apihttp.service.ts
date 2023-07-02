import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

let params = new HttpParams();
params = params.set('PageNumber', 1);
params = params.set('PageSize', 10);




@Injectable({
  providedIn: 'root'
})
export class ApihttpService {

  constructor(private http: HttpClient) { }




  public getPaginationList(url: string,parameterObject?: any): Observable<any> {
    return this.http.get(url,{params: parameterObject})
  }

  

  public get(url: string): Observable<any> {
    return this.http.get(url, httpOptions)
  }

  public post(url: string, parameterObject?: any): Observable<any> {
    return this.http.post(url, parameterObject, httpOptions);
  }

  public put(url: string, parameterObject?: any): Observable<any> {
    return this.http.put(url, parameterObject, httpOptions)
  }

  public delete(url: string): Observable<any> {
    return this.http.delete(url, httpOptions)
  }


}
