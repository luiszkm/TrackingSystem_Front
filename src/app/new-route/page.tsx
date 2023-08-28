'use client'
import { FormEvent, useRef, useState } from 'react'
import { useMap } from '../hooks/useMap'
import type {
  DirectionsResponseData,
  FindPlaceFromTextResponseData
} from '@googlemaps/google-maps-services-js'
import { Button } from '../components/Button'
import { Input } from '../components/Input'

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
      fetch(`${process.env.NEXT_PUBLIC_NEXT_API_URL}/places?text=${source}`),
      fetch(
        `${process.env.NEXT_PUBLIC_NEXT_API_URL}/places?text=${destination}`
      )
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
    const placeSourceId = sourcePlace.candidates[0].place_id
    const placeDestinationId = destinationPlace.candidates[0].place_id
    const directionsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_API_URL}/directions?originId=${placeSourceId}&destinationId=${placeDestinationId}`
    )
    const directionsResponseData: DirectionsResponseData & { request: any } =
      await directionsResponse.json()
    setDirectionsData(directionsResponseData)
    map?.removeAllRoutes()
    await map?.addRouteWithIcons({
      routeId: '1',
      startMarkerOptions: {
        position: directionsResponseData.routes[0].legs[0].start_location
      },
      endMarkerOptions: {
        position: directionsResponseData.routes[0].legs[0].end_location
      },
      carMarkerOptions: {
        position: directionsResponseData.routes[0].legs[0].start_location
      },
      directionsResponseData
    })
  }

  async function handleCreateRoute() {
    const startAddress = directionsData!.routes[0].legs[0]
      .start_address as string
    const enAddress = directionsData!.routes[0].legs[0].end_address as string

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_API_URL}/routes`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: `${startAddress} - ${enAddress}`,
          source_id: directionsData!.request.origin.place_id,
          destination_id: directionsData!.request.destination.place_id
        })
      }
    )

    const route = await response.json()
  }

  return (
    <main className="flex h-full ">
      <div className="min-w-[250px] md:min-w-[400px] p-4 space-y-2">
        <h1 className="font-bold text-2xl text-center">Nova rota</h1>
        <form
          className="flex flex-col space-y-3 "
          onSubmit={handleSearchPlaces}
        >
          <Input
            type="text"
            name="source_placer"
            placeholder="origem"
            id="source"
          />
          <Input
            type="text"
            name="destination_placer"
            placeholder="destino"
            id="destination"
          />

          <Button type="submit">Pesquisar</Button>
        </form>

        {directionsData && (
          <ul>
            <li className="space-y-2 bg-zinc-900 p-2">
              <span className="text-zinc-200 font-semibold text-lg">
                Origem
              </span>
              <p className="text-zinc-500">
                {directionsData?.routes[0]?.legs[0]?.start_address}
              </p>
            </li>
            <li className="space-y-2 bg-zinc-900 p-2">
              <span className="text-zinc-200 font-semibold text-lg">
                Destino
              </span>
              <p className="text-zinc-500">
                {directionsData?.routes[0]!.legs[0]!.end_address}
              </p>
            </li>
            <li className="space-y-2 bg-zinc-900 p-2">
              <span className="text-zinc-200 font-semibold text-lg">
                Distancia
              </span>
              <p className="text-zinc-500">
                {' '}
                {directionsData?.routes[0]!.legs[0]!.distance.text}
              </p>
            </li>
            <li className="space-y-2 bg-zinc-900 p-2">
              <span className="text-zinc-200 font-semibold text-lg">
                Tempo
              </span>
              <p className="text-zinc-500">
                {directionsData?.routes[0]!.legs[0]!.duration.text}
              </p>
            </li>
            <li>
              <Button onClick={handleCreateRoute}>criar rota</Button>
            </li>
          </ul>
        )}
      </div>
      <div id="map" className="h-full w-full" ref={mapContainerRef}></div>
    </main>
  )
}
