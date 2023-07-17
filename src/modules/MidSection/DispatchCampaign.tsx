import GoBackButton from '@/src/components/GoBackButton'
import { dispatchCampaign } from '@/src/lib/api'
import { useAppContext, useCampaigns, useCategories, useSubscribers } from '@/src/store/store'
import React from 'react'
import {toast, ToastContainer} from 'react-toastify'

export default function DispatchCampaign() {
    const state = useAppContext(state => state.state)
    const subscribers = useSubscribers(state => state.subscribers)
    const setAppContext = useAppContext(store => store.setAppContext)
    const campaign = useCampaigns(store => store.campaigns)
    const categories = useCategories(store => store.categories)
  return (
    <div className=" text-white text-center">
        <ToastContainer/>
        <GoBackButton />
        <h1 className="text-3xl font-bold">
            Disparar Campaña
        </h1>
        <div className="flex gap-2 justify-center">
            <span className="text-xl font-bold">Nombre: </span>
            <span className="text-xl">{campaign.find(campaign => campaign.id === state?.campaignId)?.name}</span>
            <span className="text-xl font-bold">Categoria: </span>
            <span className="text-xl">{
                
                categories.find(category => category.id === state?.category)?.name
            }</span>


        </div>
        <h2 className="font-light text-md">
            Estas por disparar esta campaña, el correo se enviará a los suscriptores que tengan esta categoría, en total {
                subscribers.filter(subscriber => subscriber.categories.includes(state?.category)).length
            } personas
        </h2>
        <button className="px-3 text-xl text-blue-950 bg-white transition p-2 mt-3 hover:scale-105" onClick={async() => {
            await toast.promise(
            dispatchCampaign(state?.campaignId),
            {
                pending: "Enviando...",
                success: "Enviado",
                error: "Error al enviar"
            }
            )
            setAppContext({type: "", status: "", state: {}})
        }}>
            Enviar
        </button>
    </div>
  )
}
