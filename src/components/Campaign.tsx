import { ChevronDoubleRightIcon, UserIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useAppContext, useCategories, useSubscribers } from '../store/store'
import { Campaign } from '../types/global'

export default function Campaign({campaign}: {campaign: Campaign}) {
  const subscribers = useSubscribers(state => state.subscribers)
  const categories = useCategories(state => state.categories)
  const setAppContext = useAppContext(state => state.setAppContext)
  return (
    <div className="flex justify-between">
        <div className="flex flex-col m-2">
          <span className="text-2xl font-bold">{campaign.name}</span>
          <span className="text-white">Asunto: {campaign.subject}</span>
          <span className="text-white">Categoria: {
            categories.find(category => category.id === campaign.category)?.name
          }</span>
          <span className="text-white flex gap-1 items-center"><UserIcon className="w-6 h-6"/> {
            subscribers.filter(subscriber => subscriber.categories.includes(campaign.category)).length
          }</span>
          
        </div>
        <div 
        onClick={
          () => {
            setAppContext({
              status: "dispatchCampaign",
              state: {
                category: campaign.category,
                campaignId: campaign.id
              },
              type: ""
            })
          }
        }
        className="h-full w-32 text-blue-900 group p-5 bg-white cursor-pointer">
        <ChevronDoubleRightIcon className="group-hover:scale-110 transition h-full"/>

        </div>
        </div>
  )
}
