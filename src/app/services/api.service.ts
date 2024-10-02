import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'https://ap-south-1.aws.data.mongodb-api.com/app/application-0-dgcxhrt/endpoint/';
  // apiUrl = 'http://localhost:5000/';
  imageUrl = 'http://98.80.36.64:5000/images/'
  constructor(private http: HttpClient,  private route: Router) { }

  getApi<T>(url: string): Observable<T> {
    return this.http.get<T>(this.apiUrl + url);
  };

  getApiNoCache<T>(url: string): Observable<T> {
    const headers = new HttpHeaders({ 'X-Bypass-Cache': 'true' });
    return this.http.get<T>(this.apiUrl + url, { headers });
  }

  isLogedIn() {
    return this.getToken() !== null;
  }

  postAPI<T, U>(url: string, data: U): Observable<T> {
    return this.http.post<T>(this.apiUrl + url, data);
  };


  setToken(token: string) {
    localStorage.setItem('tokenAuction', token);
  };

  getToken() {
    return localStorage.getItem('tokenAuction');
  };

  logout() {
    localStorage.removeItem('tokenAuction');
    localStorage.removeItem('userDetailAuc');
    this.route.navigateByUrl('/');

  };


  private dataKey = 'auctionData';

  setShop(data: any) {
    localStorage.setItem('shopDetailsAS', JSON.stringify(data));
  }

  getShop() {
    const data = localStorage.getItem('shopDetailsAS');
    return data ? JSON.parse(data) : null;
  }

  clearProducts(){
    localStorage.removeItem('auctionProducts');
  }


}
