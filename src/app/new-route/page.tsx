'use client'
import { FormEvent, useRef, useState } from 'react'
import { useMap } from '../hooks/useMap'
import type {
  DirectionsResponseData,
  FindPlaceFromTextResponseData
} from '@googlemaps/google-maps-services-js'

export default function NewRoutePage() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const map = useMap(mapContainerRef)
  const [directionsData, setDirectionsData] = useState<
    DirectionsResponseData & { request: any }
  >()

  async function handleSearchPlaces(event: FormEvent) {
    event.preventDefault()
    const source = document.querySelector<HTMLInputElement>('#source')?.value
    const destination =
      document.querySelector<HTMLInputElement>('#destination')?.value

    const [sourceResponse, destinationResponse] = await Promise.all([
      fetch(`http://localhost:3001/api/places?text=${source}`),
      fetch(`http://localhost:3001/api/places?text=${destination}`)
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
      `http://localhost:3001/api/directions?${queryParams.toString()}`
    )
    const directionsResponseData: DirectionsResponseData & { request: any } =
      await directionsResponse.json()
    setDirectionsData(directionsResponseData)
    map?.removeAllRoutes()
    map?.addRouteWithIcons({
      routeId: '1',
      startMarkerOptions: {
        position: directionsResponseData.routes[0]!.legs[0]!.start_location
      },
      endMarkerOptions: {
        position: directionsResponseData.routes[0]!.legs[0]!.end_location
      },
      carMarkerOptions: {
        position: directionsResponseData.routes[0]!.legs[0]!.start_location
      },
      directionsResponseData
    })
  }

  async function handleCreateRoute() {
    const startAddress = directionsData!.routes[0].legs[0].start_address
    const enAddress = directionsData!.routes[0].legs[0].end_address

    const response = await fetch('http://localhost:3001/api/routes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${startAddress} - ${enAddress}`,
        source_id: directionsData!.request.origin.place_id,
        destination_id: directionsData!.request.destination.place_id
      })
    })

    const route = await response.json()
  }

  return (
    <main className="flex h-full ">
      <div>
        <h1>Nova rota</h1>
        <form className="flex flex-col" onSubmit={handleSearchPlaces}>
          <input
            className="text-zinc-800"
            type="text"
            name="source_placer"
            placeholder="origem"
            id="source"
          />
          <input
            className="text-zinc-800"
            type="text"
            name="destination_placer"
            placeholder="destino"
            id="destination"
          />

          <button type="submit">Pesquisar</button>
        </form>
        {directionsData && (
          <ul>
            <li>Origem {directionsData.routes[0].legs[0].start_address}</li>
            <li>Destiono {directionsData.routes[0].legs[0].end_address}</li>
            <li>
              <button onClick={handleCreateRoute}>criar rota</button>
            </li>
          </ul>
        )}
      </div>
      <div id="map" className="h-full w-full" ref={mapContainerRef}></div>
    </main>
  )
}
