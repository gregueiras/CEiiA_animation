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
  LineSeries,
  Tooltip,
} from "react-jsx-highcharts"

const App = ({ title, xTitle, yTitle, data, style }) => (
  <div className="app" style={style}>
    <HighchartsChart>
      <Chart zoomType="x" type="datetime" />
      <Title>{title}</Title>

      <Subtitle>
        {document.ontouchstart === undefined
          ? "Click and drag in the plot area to zoom in"
          : "Pinch the chart to zoom in"}
      </Subtitle>

      <Tooltip valueSuffix={` ${yTitle}`} shared />

      <XAxis type="datetime">
        {xTitle && <XAxis.Title>{xTitle}</XAxis.Title>}
      </XAxis>

      <YAxis>
        <YAxis.Title>{yTitle}</YAxis.Title>
        <LineSeries data={data}/>
      </YAxis>

    </HighchartsChart>
  </div>
)

export default withHighcharts(App, Highcharts)
