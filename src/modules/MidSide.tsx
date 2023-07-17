import React from "react";
import SideHeader from "../components/SideHeader";
import { useAppContext } from "../store/store";
import Categories from "./MidSection/Categories";
import Create from "./MidSection/Create";
import DispatchCampaign from "./MidSection/DispatchCampaign";
import Statistics from "./MidSection/Statistics";

export default function MidSide() {
  const status = useAppContext((store) => store.status);
  return (
    <section>
      <>
        {(() => {
          switch (status) {
            case "":
              return (
                <>
                  <SideHeader text="Categorías" type="categories" />
                  <Categories />
                </>
              );
            case "create":
              return <Create />;
            case "dispatchCampaign":
              return <DispatchCampaign />;
            case "statistics":
              return <Statistics />;
            default:
              return <Categories />;
          }
        })()}
      </>
    </section>
  );
}
