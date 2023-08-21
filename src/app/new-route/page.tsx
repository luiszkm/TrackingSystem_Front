'use client'
import { FormEvent, useRef } from 'react'
import { useMap } from '../hooks/useMap'
import type {
  DirectionsResponseData,
  FindPlaceFromTextResponseData
} from '@googlemaps/google-maps-services-js'

export default function NewRoutePage() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const map = useMap(mapContainerRef)

  async function searchPlaces(event: FormEvent) {
    event.preventDefault()
    const source = document.querySelector<HTMLInputElement>(
      'input[name=source_placer'
    )
    const destination = document.querySelector<HTMLInputElement>(
      'input[name=destination_placer'
    )
    const [sourceResponse, destinationResponse] = await Promise.all([
      fetch(`http://localhost:3000/places?text=${source}`),
      fetch(`http://localhost:3000/places?text=${destination}`)
    ])

    const [sourcePlace, destinationPlace]: FindPlaceFromTextResponseData[] =
      await Promise.all([sourceResponse.json(), destinationResponse.json()])

    if (sourcePlace.status !== 'OK') {
      console.error(sourcePlace)
      alert('Não foi possível encontrar a origem')
      return
    }
    if (destinationPlace.status !== 'OK') {
      console.error(destinationPlace)
      alert('Não foi possível encontrar o destino')
      return
    }
    const queryParams = new URLSearchParams({
      originId: sourcePlace.candidates[0].place_id as string,
      destinationId: destinationPlace.candidates[0].place_id as string
    })
    const directionsResponse = await fetch(
      `http://localhost:3000/directions?${queryParams.toString()}`
    )
    const directionsResponseData: DirectionsResponseData & { request: any } =
      await directionsResponse.json()

    map?.addRouteWithIcons({
      routeId: '1',
      startMarkerOptions:{
        position: directionsResponseData.routes[0]!.legs[0]!.start_location,
      },
      endMarkerOptions:{
        position: directionsResponseData.routes[0]!.legs[0]!.end_location,
      },
      carMarkerOptions:{
        position: directionsResponseData.routes[0]!.legs[0]!.start_location,
      },
      directionsResponseData
    })
  }

  return (
    <main className="flex h-full ">
      <div>
        <h1>Nova rota</h1>
        <form className="flex flex-col">
          <input
            type="text"
            name="source_placer"
            placeholder="origem"
            id="source"
          />
          <input
            type="text"
            name="destination_placer"
            placeholder="destino"
            id="destination"
          />

          <button type="submit">Pesquisar</button>
        </form>
      </div>
      <div id="map" className="h-full w-full" ref={mapContainerRef}></div>
    </main>
  )
}
