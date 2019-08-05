document.addEventListener("DOMContentLoaded", function() {
  const myChart = Highcharts.chart("container", {
    tooltip: {
      shared: true,
      split: false
    },
    chart: {
      zoomType: "x"
    },
    title: {
      text: "Oxygen Saturation"
    },
    subtitle: {
      text:
        document.ontouchstart === undefined
          ? "Click and drag in the plot area to zoom in"
          : "Pinch the chart to zoom in"
    },
    xAxis: {
      type: "datetime"
    },
    yAxis: {
      title: {
        text: "%"
      },
      min: 0,
      max: 100,
    },
    legend: {
      enabled: true
    },
    series: [
      {
        name: "Buoy #42",
        data: data0
      },
      {
        name: "Buoy #24",
        data: data1
      }
    ],
  });
});
