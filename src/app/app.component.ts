import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stock-screener';
  apiBaseUrl = 'https://api.twelvedata.com';
  apiKey = '';

  constructor(private http: HttpClient) {
    this.http.get('assets/apikey.txt',
      { responseType: 'text'}).subscribe(data => { this.apiKey = data, this.getStock("AAPL");});
  }

  async getStock (stockSymbol: string) {
    let reqUrl: string = this.apiBaseUrl + '/time_series?symbol=' + stockSymbol + '&interval=1h&apikey=' + this.apiKey;
    this.http.get(reqUrl,
      { responseType: 'json'}).subscribe(data => console.log(data))
  };


}


