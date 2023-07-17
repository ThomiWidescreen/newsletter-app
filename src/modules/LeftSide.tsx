import React, { useEffect } from "react";
import { ChevronDoubleRightIcon, UserIcon } from "@heroicons/react/24/solid";
import SideHeader from "../components/SideHeader";
import { useCampaigns } from "../store/store";
import Campaign from "../components/Campaign";


export default function LeftSide() {
  const campaigns = useCampaigns((store) => store.campaigns);
  const fetchCampaigns = useCampaigns((store) => store.fetchCampaigns);

  useEffect(() => {
    fetchCampaigns();
  }, [])
  return (
    <section>
      <SideHeader statistics text="Campañas" type="campaigns"/>
      <div className="[&>*]:border-2 flex gap-2 flex-col [&>*]:border-white mx-2 mt-3 text-white">
        {campaigns.map((campaign) => 

          <Campaign 
          key={campaign.id}
            campaign={campaign}
          />
        )}
          
            
      </div>
    </section>
  );
}
