import React from "react"
import Monitor from "../components/Monitor"
import { O2, Misc, charts } from "data/dataB1"

class App extends React.Component {
  render() {
    return <Monitor charts={charts} o2={O2} misc={Misc} location="S. Miguel"  />
  }
}

export default App
