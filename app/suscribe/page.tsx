'use client'

import { createSubscriber } from '@/src/lib/api'
import { useCategories } from '@/src/store/store'
import React, { useEffect, useState } from 'react'

export default function page() {
    const [selectedCategories, setSelectedCategories] = useState<Array<number>>([])
    const [email, setEmail] = useState<string>("")
    const [suscribed, setSuscribed] = useState<boolean>(false)

    const categories = useCategories((state) => state.categories)

    const fetchCategories = useCategories((state) => state.fetchCategories)

    const suscribe = () => {

        createSubscriber({mail: email, categories: selectedCategories}).then(() => {
            setSuscribed(true)

        })
    }

    useEffect(() => {
        fetchCategories()
    }, [])
  return (
    <section className="w-screen flex flex-col justify-center items-center ite h-screen bg-blue-900">
        {suscribed ? <>
            <h1 className="text-4xl text-white font-semibold">¡Gracias por suscribirte!</h1>
        </> : <>
        {categories.length > 0 && <>
            <h1 className="text-4xl text-white font-semibold">¿Quieres recibir novedades? ¡Suscribete!</h1>
        <form className="flex flex-col gap-3 mt-3 ">
            <input value={email} onChange={(e) => {setEmail(e.target.value)}} className=" p-2" placeholder="Correo" type="email" />
            <label className="text-white" htmlFor="">¿A qué categoria/s desea suscribirse?</label>
            {categories.map(({name, id}) => <label className="flex items-center gap-2">
                <input key={name} type="checkbox" onChange={(e) => {
                    if(e.target.checked) {
                        setSelectedCategories([...selectedCategories, id])
                    } else {
                        setSelectedCategories(selectedCategories.filter((category) => category !== id))
                    }
                }} />
                <span className="text-white">{name}</span>
            </label>)}


            <button onClick={(e) => {
                e.preventDefault()
                suscribe()
            }} className="bg-blue-950 text-white p-2 hover:scale-[1.02] transition">Suscribirse</button>
        </form>
        </>}
        </>}
    </section>
  )
}
