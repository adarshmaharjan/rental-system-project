import React from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";

import "./Map.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWJzazEyMzQiLCJhIjoiY2s3Z3Z3azB6MDQyNzNmbzkxd3MwN3hnNyJ9.-paJt9fSR1rw0Wq0LwSmig";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: props.lng,
      lat: props.lat,
      zoom: 13,
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.setState({ lng: this.props.lng });
    this.setState({ lat: this.props.lat });
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });

    console.log(this.state.lng, this.state.lat);

    var marker = new mapboxgl.Marker()
      .setLngLat([this.state.lng, this.state.lat])
      .addTo(map);

    map.on("load", function () {
      map.resize();
    });
    map.scrollZoom.disable();
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props);
    this.setState({ lng: this.props.lng });
    this.setState({ lat: this.props.lat });
  }

  render() {
    return (
      <div className="map-content">
        <div
          ref={(el) => (this.mapContainer = el)}
          className="mapContainer"
          id="map"
        />
      </div>
    );
  }
}

export default Map;
