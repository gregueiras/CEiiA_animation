import React from "react"
import { Responsive, WidthProvider } from "react-grid-layout"

const ResponsiveGridLayout = WidthProvider(Responsive)

const divStyle1 = {
  background: "#ABC",
}

const divStyle2 = {
  background: "#856",
}

const divStyle3 = {
  background: "#085",
}

const divStyle4 = {
  background: "#008",
}

class MyGrid extends React.Component {
  render() {
    // layout is an array of objects, see the demo for more complete usage
    const layouts = {
      lg: lgLayout,
      md: mdLayout,
      sm: smLayout,
      xs: xsLayout,
      xxs: xxsLayout,
    }
    return (
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        rowHeight={30}
        width={1400}
        margin={[5, 7]}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      >
        <div key="a" style={divStyle1}>
          a
        </div>
        <div key="b" style={divStyle2}>
          b
        </div>
        <div key="c" style={divStyle3}>
          c
        </div>
        <div key="d" style={divStyle4}>
          d
        </div>
        <div key="e" style={divStyle3}>
          c
        </div>
      </ResponsiveGridLayout>
    )
  }
}

const lgLayout = [
  { i: "a", x: 0, y: 0, w: 4, h: 10 },
  { i: "b", x: 4, y: 0, w: 4, h: 10 },
  { i: "c", x: 8, y: 0, w: 4, h: 10 },
  { i: "d", x: 0, y: 1, w: 4, h: 10 },
]

const mdLayout = [
  { i: "a", x: 0, y: 0, w: 5, h: 5 },
  { i: "b", x: 5, y: 0, w: 5, h: 5 },
  { i: "c", x: 0, y: 1, w: 5, h: 5 },
  { i: "d", x: 5, y: 1, w: 5, h: 5 },
]

const smLayout = [
  { i: "a", x: 0, y: 0, w: 4, h: 5 },
  { i: "b", x: 4, y: 0, w: 4, h: 5 },
  { i: "c", x: 8, y: 0, w: 4, h: 5 },
  { i: "d", x: 0, y: 0, w: 4, h: 5 },
]

const xsLayout = [
  { i: "a", x: 0, y: 0, w: 4, h: 5 },
  { i: "b", x: 4, y: 0, w: 4, h: 5 },
  { i: "c", x: 8, y: 0, w: 4, h: 5 },
  { i: "d", x: 0, y: 0, w: 4, h: 5 },
]

const xxsLayout = [
  { i: "a", x: 0, y: 0, w: 4, h: 5 },
  { i: "b", x: 4, y: 0, w: 4, h: 5 },
  { i: "c", x: 8, y: 0, w: 4, h: 5 },
  { i: "d", x: 0, y: 0, w: 4, h: 5 },
]

export default MyGrid
