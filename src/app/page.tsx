import Image from 'next/image'

export default function Home() {
  return (
  <main>
    <div>
      <h2 className='text-zinc-400 font-bold text-2xl text-center mt-8'>Bem vindo ao Dev Driver, projeto desenvolvido na imersão Full Cycle </h2>

      <div className='flex items-center gap-8 mt-10 w-full justify-center '>
        <div className='w-72 flex flex-col gap-4 border border-yellow-400 rounded-lg h-80 p-2 bg-zinc-900 '>
          <span className='font-bold text-center' >Escolha Sua rota como passageiro</span>
          <a href="/new-route">
            <img className='object-contain h-64 w-full rounded-lg'
             src="https://i.stack.imgur.com/L1WnE.png" alt="Passenger" />
          </a>
        </div>
        <div className='w-72 flex flex-col gap-4 border border-yellow-400 rounded-lg h-80 p-2 bg-zinc-900 '>
          <span className='font-bold text-center' >Escolha sua rota como motorista</span>
          <a href="/driver">
            <img className='object-contain h-64 w-full rounded-lg'
             src="https://www.meupositivo.com.br/doseujeito/wp-content/uploads/2019/10/google-maps-como-usar-modo-navegacao-moto.jpg" alt="Passenger" />
          </a>
        </div>
        <div className='w-72 flex flex-col gap-4 border border-yellow-400 rounded-lg h-80 p-2 bg-zinc-900 '>
          <span className='font-bold text-center' >Acompanhe todos os trajetos</span>
          <a href="/admin">
            <img className='object-contain h-64 w-full rounded-lg'
             src="https://classic.exame.com/wp-content/uploads/2017/07/google-maps.png?w=680" alt="Passenger" />
          </a>
        </div>
      </div>
    </div>
  </main>
  )
}
