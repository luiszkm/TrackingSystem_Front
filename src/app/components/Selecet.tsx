import { SelectHTMLAttributes } from "react";

type selectProps = SelectHTMLAttributes<HTMLSelectElement>

export function Select(props: selectProps) {
  return (
    <select 
    
      className="bg-gray-200 text-zinc-900 w-full 
       p-4 rounded-md font-bold placeholder:text-zinc-900" 
      {...props} />
  )
}
