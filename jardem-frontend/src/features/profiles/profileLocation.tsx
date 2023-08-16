import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { useCallback, useEffect, useState } from 'react'
import { Segment } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store'

const containerStyle = {
  width: '250px',
  height: '200px',
}

export default function ProfileLocation() {
  const { profileStore } = useStore()

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDOSQXZQjVl7MhBO08RLky_QSIjOqCW__g',
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds({
      lat: profileStore.lat!,
      lng: profileStore.long!,
    })
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  useEffect(() => {
    profileStore.getPosition()
  })

  return isLoaded ? (
    <Segment clearing>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: profileStore.lat!, lng: profileStore.long! }}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <Marker position={{ lat: profileStore.lat!, lng: profileStore.long! }} />
      </GoogleMap>
    </Segment>
  ) : (
    <></>
  )
}
