import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useAppContext } from '../store/store'

export default function GoBackButton() {
    const setAppContext = useAppContext(store => store.setAppContext)
  return (
    <ArrowLeftIcon onClick={() => {
        setAppContext({type: "", status: "", state: {}})     
    }} className="w-8 h-8 text-blue-950 bg-white p-1 hover:scale-110 transition cursor-pointer"/>
  )
}
