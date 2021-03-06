import React, { Component } from "react"
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import MyMarker from "./MyMarker"

class MyMap extends Component {
  render() {
    const mapOptions = {
      disableDefaultUI: true,
    }

    const { buoys = [], mapCenter = { lat: 0, lng: 0 } } = this.props

    const MapWithAMarker = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          defaultZoom={8}
          defaultCenter={mapCenter}
          defaultOptions={mapOptions}
        >
          {buoys.map(({ lat, lng, key }) => <MyMarker key={key} lat={lat} lng={lng} name={key} />)}
        </GoogleMap>
      ))
    )

    return (
      <MapWithAMarker
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `inherit` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}

export default MyMap
