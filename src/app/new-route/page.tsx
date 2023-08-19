import {Loader} from '@googlemaps/js-api-loader'
import { useEffect } from 'react'


export default function NewRoutePage() {

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      libraries: [ "routes", "geometry"],
    })
    Promise.all([
      loader.importLibrary('routes'),
      loader.importLibrary('geometry'),
    ]).then(() => {
      
    })
  }, [])
  return (
    <div className="flex h-full ">
      <div>
        <h1>Nova rota</h1>
        <form className="flex flex-col">
          <input type="text" name="source_placer" placeholder="origem" id="source" />
          <input type="text" name="destination_placer" placeholder="detino" id="destination" />

          <button type="submit">Pesquisar</button>

        </form>
      </div>
      <div id="map" className="h-full w-full">
        Mapa
      </div>
    </div>
  )
}
