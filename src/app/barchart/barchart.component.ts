import { Component, NgZone, OnInit } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-barchart",
  templateUrl: "./barchart.component.html",
  styleUrls: ["./barchart.component.scss"]
})
export class BarchartComponent implements OnInit {
  private chart: am4charts.XYChart;

  constructor(private zone: NgZone) {}

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("barchart", am4charts.XYChart);
      let title = chart.titles.create();
      title.text = "Line charts POC ";
      let data = [
        {
          area: "florida",
          computers: 20,
          cars: 90,
          boats: 10
        },
        {
          area: "Alabama",
          computers: 50,
          cars: 150,
          boats: 10
        },
        {
          area: "virginia",
          computers: 120,
          cars: 50,
          boats: 80
        },
        {
          area: "Arizona",
          computers: 18,
          cars: 50,
          boats: 20
        },
        {
          area: "Colarado",
          computers: 60,
          cars: 90,
          boats: 5
        }
      ];
      chart.data = data;
      // Create x axis
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "area";
      categoryAxis.title.text = "Area";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.cellStartLocation = 0.1;
      categoryAxis.renderer.cellEndLocation = 0.9;

      //create y axis
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      valueAxis.title.text = "Sales";

      // getting the data and making charts accordingly
      let seriesNames = ["computers", "cars", "boats"];
      for (let i = 0; i < 3; i++) {
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryX = "area";
        series.dataFields.valueY = seriesNames[i];
        series.name = seriesNames[i];

        // styling for representation
        let bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4;
        bullet.tooltipText = "Area :{categoryX} \n Sales :{valueY}";
      }

      chart.legend = new am4charts.Legend();
      this.chart = chart;
    });
  }
}
