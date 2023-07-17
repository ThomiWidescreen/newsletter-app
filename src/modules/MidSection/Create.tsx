import {
  useAppContext,
  useCampaigns,
  useCategories,
  useSubscribers,
} from "@/src/store/store";
import React, { useState } from "react";
import { CreationType } from "@/src/types/global";
import Forms from "./Create/Forms";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoBackButton from "@/src/components/GoBackButton";

const EMPTY_FORM: CreationType = {
  name: "",
  subject: "",
  body: "",
  file: "",
  mail: "",
  categories: [],
  category: 0,
};

const TEXTS: { [key: string]: string } = {
  campaigns: "Campaña",
  categories: "Categoría",
  subscribers: "Suscriptor",
};

const CREATE_FUNCTION: { [key: string]: Function } = {
  campaigns: useCampaigns.getState().createCampaign,
  categories: useCategories.getState().createCategory,
  subscribers: useSubscribers.getState().createSubscriber,
};

const FORMS: {
  [key: string]: Array<{
    label: string;
    value: keyof CreationType;
    type: string;
  }>;
} = {
  campaigns: [
    { label: "Nombre", value: "name", type: "text" },
    { label: "Asunto", value: "subject", type: "text" },
    { label: "Cuerpo", value: "body", type: "textarea" },
    { label: "Category", value: "category", type: "select" },
    { label: "Adjunto", value: "file", type: "file" },
  ],
  categories: [{ label: "Nombre", value: "name", type: "text" }],
  subscribers: [
    { label: "Correo", value: "mail", type: "email" },
    { label: "Categorías", value: "categories", type: "checkbox" },
  ],
};

export default function Create() {
  const type = useAppContext((store) => store.type);
  const setAppContext = useAppContext((store) => store.setAppContext);
  const [formData, setFormData] = useState<CreationType>(EMPTY_FORM);

  return (
    <div className=" text-white mx-3 text-xl ">
      <ToastContainer />

      <GoBackButton />
      <h1 className="mt-3">Crear {TEXTS[type]}</h1>
      <form className="flex flex-col gap-3 mt-3  !text-black  ">
        {FORMS[type].map(({ label, value, type }) => (
          <Forms
            key={value}
            formData={formData}
            setFormData={setFormData}
            label={label}
            value={value}
            type={type}
          />
        ))}
        <button
          onClick={(e) => {
            e.preventDefault();

            let isValid = true;

            FORMS[type].forEach(({ value }) => {
              if (value == "file") return;
              if (value == "mail") {
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formData.mail)
                  ? (isValid = true)
                  : (isValid = false);
              }
              if (formData[value] == "") {
                isValid = false;
              }
            });

            if (!isValid) {
              toast.error("Por favor, rellene todos los campos");
              return;
            }
            CREATE_FUNCTION[type](formData);
          }}
          className="bg-blue-950 text-white p-2 hover:scale-[1.02] transition"
        >
          Crear
        </button>
      </form>
    </div>
  );
}
