import { ChargesService } from './../../chargesService/charges.service';
import { Component, OnInit } from '@angular/core';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-group-payments-pai-chart',
  templateUrl: './group-payments-pai-chart.component.html',
  styleUrls: ['./group-payments-pai-chart.component.css']
})
export class GroupPaymentsPaiChartComponent implements OnInit {
  public chartType: string = 'pie';
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#5246f7','#FFF8DC','#008B8B','#8B008B',
                        '#BDB76B','#FF8C00','#2F4F4F','#00CED1','#FFFAF0','#FF69B4','#F0FFF0','#F0E68C'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#5246f7'],
      borderWidth: 2,
    }
  ];
  constructor(private chargesService: ChargesService) { 
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.GroupCharges();
  }

  private initLabels(dict: any){
    const values: SingleDataSet = [];
        // tslint:disable-next-line: forin
    for (let key in dict) {
      this.pieChartLabels.push(key);
      values.push(dict[key]);
    }
    this.pieChartData = values;
  }
  
  GroupCharges(){
    this.chargesService.getMyGroupChargesBehaviorSubject.subscribe(data => {
      if(data.length !== 0 ){
        const values: SingleDataSet = [];
        for (const elm of data) {
          this.pieChartLabels.push(elm.objective);
          console.log(this.pieChartLabels);
          values.push(elm.debt);
          console.log(this.pieChartData);
        }
        this.pieChartData = values;
      }
    },
    Error => {
    });
  }

}
