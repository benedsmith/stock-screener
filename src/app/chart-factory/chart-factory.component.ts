import {
  ComponentRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewChild,
  Component,
  OnInit,
  ViewRef
} from "@angular/core";

import { ChartComponent } from "../chart/chart.component";

@Component({
  selector: 'app-chart-factory',
  templateUrl: './chart-factory.component.html',
  styleUrls: ['./chart-factory.component.css']
})
export class ChartFactoryComponent implements OnInit {
  @ViewChild('viewContainerRef', {read: ViewContainerRef})
  VCR: ViewContainerRef | undefined;

  chart_unique_key: number = 0;
  componentsReferences = Array<ComponentRef<ChartComponent>>();

  constructor(private CFR: ComponentFactoryResolver) { }

  createComponent(formData: HTMLFormElement) {
    let componentFactory = this.CFR.resolveComponentFactory(ChartComponent);
    let chartComponentRef = this.VCR!.createComponent(componentFactory);

    let chartComponent = chartComponentRef?.instance;
    chartComponent!.stockSymbol = formData.symbol.value;
    console.log(chartComponent?.stockSymbol);
    chartComponent!.unique_key = ++this.chart_unique_key;
    chartComponent!.parentRef = this;

    this.componentsReferences.push(chartComponentRef);
  }

  remove(key: number) {
    if (this.VCR!.length < 1) return;

    let componentRef = this.componentsReferences.filter(
      x => x.instance.unique_key == key
    )[0];

    let vcrIndex: number = this.VCR!.indexOf(componentRef.hostView);

    // removing component from container
    this.VCR!.remove(vcrIndex);

    // removing component from the list
    this.componentsReferences = this.componentsReferences.filter(
      x => x.instance.unique_key !== key
    );
  }


  ngOnInit(): void {
  }

}
