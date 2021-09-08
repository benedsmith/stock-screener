import {Component, OnInit} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import { Stock, ValuesEntity } from "./StockDataObj";

import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { GridChartsModule } from "@ag-grid-enterprise/all-modules";
import { ClientSideRowModelModule } from "@ag-grid-enterprise/all-modules";
import { MenuModule } from "@ag-grid-enterprise/all-modules";

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: [ './chart.component.css' ],
})

export class ChartComponent implements OnInit {
  public modules: any[] = [
    RangeSelectionModule,
    GridChartsModule,
    ClientSideRowModelModule,
    MenuModule,
  ];

  private gridApi: any;
  private gridColumnApi: any;

  columnDefs = [
    {field: 'close'},
    {field: 'datetime', sortable: true},
    {field: 'open'},
    {field: 'high'},
    {field: 'low'},
    {field: 'volume'}
  ];

  rowData: ValuesEntity[] = [];
  stockData!: Stock;

  apiBaseUrl = 'https://api.twelvedata.com';
  // Private API key
  apiKey = '';

  constructor(private http: HttpClient) {
    this.http.get('assets/apikey.txt',
      {responseType: 'text'}).subscribe(data => {
      this.apiKey = data;
      // Hardcoded for now
      this.getStock("AAPL").then(data => this.rowData = data)
    });
  }

  ngOnInit(): void {
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.suppressNoRowsOverlay = true;
    params.api.setRowData(this.rowData);
  }


  // Make GET call to endpoint, returns ValuesEntity[] (list of data points)
  async getStock(stockSymbol: string, interval: string = '1h'): Promise<ValuesEntity[]> {
    let returnData: ValuesEntity[] = []
    let reqUrl: string = this.apiBaseUrl + '/time_series?symbol=' + stockSymbol + '&interval=' + interval + '&apikey=' + this.apiKey;
    this.http.get(reqUrl, {responseType: 'json'}).subscribe(res => {
      // stockData contains all values, as well as metadata - for future use
      this.stockData = res as Stock;
      let rowDataTemp = this.stockData.values as ValuesEntity[];
      rowDataTemp.map(val => {
        // Unpack the JSON (all strings), into usable format (ValuesEntity interface)
        let tempValue: ValuesEntity = new class implements ValuesEntity {
          close: number = Number(val.close);
          datetime: Date = val.datetime;
          high: number= Number(val.high);
          low: number = Number(val.low);
          open: number = Number(val.open);
          volume: number= Number(val.volume);
        }
        returnData.push(tempValue);
      })
    this.gridApi.setRowData(returnData);
    });
    return returnData;
  };
}

