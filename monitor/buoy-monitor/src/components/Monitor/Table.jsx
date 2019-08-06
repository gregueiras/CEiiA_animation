import React from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import { ReactTableDefaults } from "react-table"

const columnStyle = {
  headerStyle: {
    borderLeft: 0,
    borderRight: 0,
  },
  style: {
    borderLeft: 0,
    borderRight: 0,
  },
}

Object.assign(ReactTableDefaults.column, {
  ...ReactTableDefaults.column,
  headerStyle: columnStyle.headerStyle,
  style: columnStyle.style,
})

class Table extends React.Component {
  render() {
    const { data, schema } = this.props

    const style = {
      border: 0,
    }

    return (
      <div>
        <ReactTable
          data={data}
          columns={schema}
          showPagination={false}
          sortable={false}
          style={style}
          pageSize={data.length}
          defaultColumn={columnStyle}
        />{" "}
      </div>
    )
  }
}

export default Table
