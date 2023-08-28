import { ButtonHTMLAttributes } from 'react'
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> 

export function Button(props: ButtonProps) {

  return (
    <button 
    className="bg-yellow-400 text-zinc-900 w-full p-4 rounded-md font-bold " 
    {...props} />
  )
}
