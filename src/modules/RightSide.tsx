import { TagIcon } from "@heroicons/react/24/solid";
import React, { useEffect } from "react";
import SideHeader from "../components/SideHeader";
import { useAppContext, useCategories, useSubscribers } from "../store/store";

export default function RightSide() {
  const subscribers = useSubscribers((state) => state.subscribers);
  const fetchSubscribers = useSubscribers((state) => state.fetchSubscribers);
  const categoriesData = useCategories((state) => state.categories);

  const state = useAppContext(store => store.state)

  useEffect(() => {
    fetchSubscribers();
  }, []);
  return (
    <section>
      <SideHeader text="Suscriptores" type="subscribers" />
      <div className="grid grid-cols-2">
        {subscribers.map(({id, mail, categories }) => (
          <div key={id} id={id.toString()} className={`flex justify-between h-24 `}>
            <div className={`flex flex-col m-2  border-2  w-full justify-center p-2 ${categories.includes(state?.category) ? "bg-white text-blue-900" : "text-white"}`}>
              <span className="text-xl font-bold ">{mail}</span>
              {categories.length > 0 && <span className=" text-sm flex gap-1 items-center">
                <TagIcon className="w-5 h-5"/>{" "}
                {categories
                  .map((e) => categoriesData.find(({ id }) => id === e)?.name)
                  .join(", ")}
              </span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
