import React, { Component } from "react"
import Highcharts from "highcharts"
import {
  HighchartsChart,
  Chart,
  withHighcharts,
  XAxis,
  YAxis,
  Title,
  LineSeries,
  Tooltip,
} from "react-jsx-highcharts"

class App extends Component {
  constructor(props) {
    super(props)
    this.updateLiveData = this.updateLiveData.bind(this)
    this.handleStartLiveUpdate = this.handleStartLiveUpdate.bind(this)
    this.handleStopLiveUpdate = this.handleStopLiveUpdate.bind(this)
    this.chart = null

    this.state = {
      data: props.data,
      liveUpdate: false,
      title: props.title,
      xTitle: props.xTitle,
      yTitle: props.yTitle,
      style: props.style,
    }
  }

  componentDidMount() {
    this.handleStartLiveUpdate()
  }

  componentWillUnmount() {
    this.handleStopLiveUpdate()
  }

  updateLiveData() {
    function addDataPoint(data) {
      console.log(data)
      if (data) {
        const [lastTime, lastValue] = data[data.length - 1]
        const [last2Time, last2Value] = data[data.length - 2]

        const newPoint = []
        let inc = Math.random() < 0.5 ? 1 : -1

        newPoint.push(lastTime + (lastTime - last2Time))
        newPoint.push(lastValue + (lastValue - last2Value) * inc)

        data.push(newPoint)
        return data
      }
    }

    const { data } = this.state
    const newData = addDataPoint(data)
    this.setState({
      data: newData,
    })
  }

  handleStartLiveUpdate(e) {
    e && e.preventDefault()
    this.setState({
      liveUpdate: window.setInterval(this.updateLiveData, 5000),
    })
  }

  handleStopLiveUpdate(e) {
    if (e) e.preventDefault()
    window.clearInterval(this.state.liveUpdate)
    this.setState({
      liveUpdate: false,
    })
  }

  render() {
    console.log("render")
    const { liveUpdate, title, xTitle, yTitle, data, style } = this.state

    return (
      <div className="app" style={style}>
        <HighchartsChart oneToOne={true}>
          <Chart zoomType="x" type="datetime" />
          <Title>{title}</Title>

          <Tooltip valueSuffix={` ${yTitle}`} shared />

          <XAxis type="datetime">
            {xTitle && <XAxis.Title>{xTitle}</XAxis.Title>}
          </XAxis>

          <YAxis>
            <YAxis.Title>{yTitle}</YAxis.Title>
            <LineSeries data={data} />
          </YAxis>
        </HighchartsChart>
        <div>
          {!liveUpdate && (
            <button
              className="btn btn-success"
              onClick={this.handleStartLiveUpdate}
            >
              Live update
            </button>
          )}
          {liveUpdate && (
            <button
              className="btn btn-danger"
              onClick={this.handleStopLiveUpdate}
            >
              Stop update
            </button>
          )}
        </div>
      </div>
    )
  }
}

const MyChart = withHighcharts(App, Highcharts)
export default MyChart
