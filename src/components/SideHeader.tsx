import { PlusIcon, ChartBarIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useAppContext } from '../store/store';

interface ISideHeaderProps{
    text:string;
    type:string;
    statistics?: boolean;
}

export default function SideHeader({text,type, statistics}: ISideHeaderProps) {
  const setAppContext = useAppContext(state => state.setAppContext)
  return (
    <div className="flex justify-between gap-2">
        <h1 className="text-white text-2xl font-light">{text}</h1>
        <span className="text-2xl [&>*]:bg-white gap-2 px-1 font-bold  flex justify-center items-center">
          <PlusIcon onClick={() =>{setAppContext({status: "create", type})}} className="w-9 h-9 p-1 text-blue-950 hover:scale-105 transition cursor-pointer" />
          {statistics && <ChartBarIcon 
          onClick={() =>{setAppContext({status: "statistics", type: ""})}}
          className="w-9 h-9 p-1 text-blue-950 hover:scale-105 transition cursor-pointer"/>}
        </span>
      </div>
  )
}
