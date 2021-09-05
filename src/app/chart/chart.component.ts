import { Component } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: [ './chart.component.css' ],
})
export class ChartComponent  {

    columnDefs = [
        { field: 'make' },
        { field: 'model' },
        { field: 'price' }
    ];

    rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];

}
