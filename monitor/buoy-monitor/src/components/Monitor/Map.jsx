import React from "react"
import L from "leaflet"

const style = {
    height: "400px",
    width: "80%",
    margin: "0 auto",
}

class Map extends React.Component {
  componentDidMount() {
    // create map
    this.map = L.map("map", {
      center: [41, 8.5],
      zoom: 16,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    })

    // add marker
    this.marker = L.marker(this.props.markerPosition).addTo(this.map)
  }
  componentDidUpdate({ markerPosition }) {
    // check if position has changed
    if (this.props.markerPosition !== markerPosition) {
      this.marker.setLatLng(this.props.markerPosition)
    }
  }
  render() {
    return <div id="map" style={style} />
  }
}

export default Map
