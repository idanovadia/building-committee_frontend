import { PaymentsService } from './../../paymentService/payments.service';
import { ChargesService } from './../../../charges/chargesService/charges.service';
import { Label, SingleDataSet, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend } from 'ng2-charts';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-group-payments-paid-chart-pai',
  templateUrl: './group-payments-paid-chart-pai.component.html',
  styleUrls: ['./group-payments-paid-chart-pai.component.css']
})
export class GroupPaymentsPaidChartPaiComponent implements OnInit {
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
  constructor(private paymentsService: PaymentsService) { 
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
    this.paymentsService.myGroupPaidBehaviorSubject.subscribe(data => {
      console.log(data);
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
