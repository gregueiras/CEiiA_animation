import React from "react"
import Table from "./Monitor/Table"

import { O2 } from "data/dataB1"

class Monitor extends React.Component {
  render() {
    return <Table data={O2.data} schema={O2.schema} />
  }
}

export default Monitor
