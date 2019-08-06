import React from "react"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import Table from "./Monitor/Table"
import Chart from "./Monitor/Chart"
import Constants from "style/Constants"
import "react-tabs/style/react-tabs.css"

class Monitor extends React.Component {
  render() {
    const { charts, o2, misc } = this.props

    return (
      <div style={monitorStyle}>
        <div style={panelHeaderStyle}>
          <h2 style={headerStyle}>S. Miguel</h2>
          <h4 style={headerStyle}>Last Update: 12:40</h4>
        </div>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div style={{ width: "50%" }}>
            <Tabs>
              <TabList>
                <Tab>Map</Tab>
                <Tab>Feeding</Tab>
              </TabList>

              <TabPanel>
                <h2>Any content 1</h2>
              </TabPanel>
              <TabPanel>
                <h2>Any content 2</h2>
              </TabPanel>
            </Tabs>
          </div>
          <div style={{ width: "50%" }}>
            {o2 && <Table data={o2.data} schema={o2.schema} />}
            {!o2 && (
              <p>
                No O<sub>2</sub> data
              </p>
            )}
            {misc && <Table data={misc.data} schema={misc.schema} />}
            {!misc && <p>No miscellaneous data</p>}
          </div>
        </div>
        <div>
          <Tabs>
            <TabList>
              {charts &&
                charts.map(({ name }, index) => <Tab key={index}>{name}</Tab>)}
            </TabList>

            {charts &&
              charts.map(({ data }, index) => {
                console.log(data)
                if (data) {
                  return (
                    <TabPanel style={{marginBottom: "1em",}} key={index}>
                      <Chart title="Oxygen Saturation" xTitle="%" data={data}/>
                    </TabPanel>
                  )
                } else {
                  return <TabPanel key={index}></TabPanel>
                }
              })}
          </Tabs>{" "}
        </div>
      </div>
    )
  }
}

const headerStyle = {
  marginBottom: "0.5em",
}

const panelHeaderStyle = {
  paddingLeft: "0.5em",
  paddingRight: "0.5em",
  marginTop: "1em",
  background: Constants.darkBackground,
  display: "flex",
  justifyContent: "space-between",
}

const monitorStyle = {
  fontFamily: Constants.fontFamily,
  background: Constants.lightBackground,
  color: Constants.whiteText,
}

export default Monitor
