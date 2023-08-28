import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input(props: InputProps) {
  return (
    <input 
      className="bg-transparent outline-none border focus:border-yellow-400
       text-zinc-100 w-full p-4 rounded-md font-bold" 
      {...props} />
  )
}