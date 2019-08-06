import React from "react"
import Highcharts from "highcharts"
import {
  HighchartsChart,
  Chart,
  withHighcharts,
  XAxis,
  YAxis,
  Title,
  Subtitle,
  Legend,
  LineSeries,
  Tooltip,
} from "react-jsx-highcharts"

const App = ({ title, xTitle, yTitle, data }) => (
  <div className="app">
    <HighchartsChart>
      <Chart zoomType="x" type="datetime" />
      <Title>{title}</Title>

      <Subtitle>
        {document.ontouchstart === undefined
          ? "Click and drag in the plot area to zoom in"
          : "Pinch the chart to zoom in"}
      </Subtitle>

      <Legend layout="vertical" align="right" verticalAlign="middle" />

      <Tooltip valueSuffix=" m/s" shared />

      <XAxis type="datetime">
        {xTitle && <XAxis.Title>{xTitle}</XAxis.Title>}
      </XAxis>

      <YAxis>
        <YAxis.Title>{yTitle}</YAxis.Title>
        <LineSeries name="Test" data={data}/>
      </YAxis>

    </HighchartsChart>
  </div>
)

export default withHighcharts(App, Highcharts)
