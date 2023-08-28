type cardProps = {
  title: string
  description: any
}

export function Card (props:cardProps) {
  return(
    <div className="space-y-2 bg-zinc-900 p-2">
      <h2 className="text-zinc-200 font-semibold text-lg">{props.title}</h2>
      <p className="text-zinc-500">{props.description}</p>
    </div>
  )
}