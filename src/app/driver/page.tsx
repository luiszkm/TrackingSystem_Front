'use client'
import { useEffect, useRef } from 'react'
import { useMap } from '../hooks/useMap'

import useSwr from 'swr'
import { fetcher } from '../utils/http'
import { Route } from '../utils/model'
import { socket } from '../utils/socket-io'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default function DriverPAge() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const map = useMap(mapContainerRef)

  const {
    data: routes,
    error,
    isLoading
  } = useSwr<Route[]>('http://localhost:3000/routes', fetcher, {
    fallback: []
  })

  async function handleStartRoute() {
    const routeId = document.querySelector<HTMLSelectElement>('#route')!.value
    const response = await fetch(`http://localhost:3000/routes/${routeId}`)
    const route = await response.json()

    map?.removeAllRoutes()
    map?.addRouteWithIcons({
      routeId: routeId,
      startMarkerOptions: {
        position: route.directions.routes[0].legs[0].start_location
      },
      endMarkerOptions: {
        position: route.directions.routes[0].legs[0].end_location
      },
      carMarkerOptions: {
        position: route.directions.routes[0].legs[0].start_location
      }
    })

    const { steps } = route.directions.routes[0].legs[0]
    for (const step of steps) {
      await sleep(2000)
      map?.moveCar(routeId, step.start_location)
      socket.emit('new-point',{
        route_id: routeId,
        lat: step.start_location.lat,
        lng: step.start_location.lng
      })

      await sleep(2000)
      map?.moveCar(routeId, step.end_location)
      socket.emit('new-point',{
        route_id: routeId,
        lat: step.end_location.lat,
        lng: step.end_location.lng
      })
    }
  }

  useEffect(() => {
    socket.connect()
    return () => {
      socket.disconnect()
    }
  },[])

  return (
    <main className="flex h-full ">
      <div>
        <h1>Minha Viagem</h1>
        <div className="flex flex-col">
          <select id="route">
            {isLoading && <option>Carregando rotas...</option>}
            {routes?.map(route => (
              <option key={route.id} value={route.id}>
                {route.name}
              </option>
            ))}
          </select>

          <button type="submit" onClick={handleStartRoute}>
            iniciar a viagem
          </button>
        </div>
      </div>
      <div id="map" className="h-full w-full" ref={mapContainerRef}></div>
    </main>
  )
}
