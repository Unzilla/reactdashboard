import React from "react";
import ReactFC from "react-fusioncharts";

// Step 3 - Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Step 4 - Include the chart type
import Charts from "fusioncharts/fusioncharts.charts";

// Step 5 - Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Step 6 - Adding the chart and theme as dependency to the core fusionchart
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

function ColumnWidget(props) {
  const chartConfigs = {
    type: "column2d", // The chart type
    width: "100%", // Width of the chart
    height: "125", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        bgColor: "#2a2a2a", //Set the x-axis name

        theme: "fusion" //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: props.data
    }
  };
  return (
    <div className="widgetWrap">
      <div className="widgetTitle">{props.title}</div>
      <div className="widgetValue">
        <ReactFC {...chartConfigs} />
      </div>
    </div>
  );
}
export default ColumnWidget;
