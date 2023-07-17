import React from 'react'

interface ICategoryProps{
    id: number;
    name: string;
}

export default function Category({id, name}: ICategoryProps) {
    
  return (
    <div className="bg-white flex justify-center items-center text-blue-900 text-center font-light text-xl p-2" id={id.toString()}>
        <span>{name}</span>
    </div>
  )
}
