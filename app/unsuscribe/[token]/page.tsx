'use client'
import React from 'react'
 
import { useParams } from 'next/navigation'
import { unsuscribeSubscriber } from '@/src/lib/api'

export default function page() {
  const { token } = useParams()

  React.useEffect(() => {
    unsuscribeSubscriber(token).then(() => {
      window.location.href = '/suscribe'
    })
  }, [])

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-blue-900">
        <h1 className="text-4xl text-white font-semibold">¡Te desuscribiste con éxito!</h1>
    </div>
  )
}
