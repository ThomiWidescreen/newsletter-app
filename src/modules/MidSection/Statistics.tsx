import GoBackButton from "@/src/components/GoBackButton";
import { useCampaigns, useCategories, useStatistics, useSubscribers } from "@/src/store/store";
import React, { useEffect } from "react";
import { EnvelopeIcon, UserIcon, TagIcon, BellAlertIcon } from "@heroicons/react/24/solid";


const Statistic = ({text, data, Icon}: {text:string, data: string|number, Icon: JSX.Element}) => {
    return <div className="flex p-3 flex-col items-center justify-center bg-white text-blue-900">
    <span>{text}</span>
        <div className="flex gap-1 items-center">{Icon}
        {data}</div>
    </div>
}

export default function Statistics() {
  const statistics = useStatistics((store) => store.statistics);
  const fetchStatistics = useStatistics((store) => store.fetchStatistics);
  const subscribers = useSubscribers((store) => store.subscribers);
  const campaigns = useCampaigns((store) => store.campaigns);
  const categories = useCategories((store) => store.categories);

  useEffect(() => {
    fetchStatistics();
  }, []);
  return (
    <div className="text-white">
      <GoBackButton />
      <h1 className="text-4xl  text-center">Estadisticas</h1>
      <div className="text-xl grid grid-cols-2 gap-2 items-center mt-2">
        <Statistic text="Total de correos enviados" data={statistics.reduce((acc, stat) => {
          return acc + stat.mailsSended;
        }, 0)} Icon={<EnvelopeIcon className="w-8 h-8 inline-block" />}/>
        <Statistic text="Total de suscriptores" data={subscribers.length} Icon={<UserIcon className="w-8 h-8 inline-block" />}/>
        <Statistic text="Total de campañas" data={campaigns.length} Icon={<BellAlertIcon className="w-8 h-8 inline-block" />}/>
        <Statistic text="Total de categorías" data={categories.length} Icon={<TagIcon className="w-8 h-8 inline-block" />}/>

      </div>
    </div>
  );
}
