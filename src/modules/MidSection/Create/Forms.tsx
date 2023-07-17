import { useAppContext, useCategories } from "@/src/store/store";
import { CreationType } from "@/src/types/global";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {ArrowUpIcon, CheckIcon} from '@heroicons/react/24/solid'

interface IFormsProps {
  label: string;
  value: keyof CreationType;
  type: string;
  setFormData: Dispatch<SetStateAction<CreationType>>;
  formData: CreationType
}

export default function Forms({
  label,
  value,
  type,
  setFormData,
    formData,
}: IFormsProps) {
  const categories = useCategories((store) => store.categories);
  const setAppContext = useAppContext((store) => store.setAppContext)


  if (type == "select" && value == "category") {
    return (

        <>
        <span className="  text-white text-base">Selecccionar categoría</span>
        <select 
        onChange={(e) => {
            setFormData({...formData, category: parseInt(e.target.value)})
            if(value === "category"){
                setAppContext({state: {category: parseInt(e.target.value)}, status: "create", type: "campaigns"})
            }
        }}
        name="" id="">
          <option value="0">Selecciones una categoría</option>

        {categories.map(({ name, id }) => (
          <option
            key={id}
           value={id}>{name}</option>
        ))}
      </select>
        </>

    );
  }

  if (type == "checkbox" && value == "categories") {
    return (
      <>
        <span className="  text-white text-base">Seleccionar Categorías</span>

      <div className="grid grid-cols-4 gap-2  ">
        {categories.map(({ name, id }) => (
          <label
            key={id}
           className="flex items-center gap-1">
            <input type="checkbox"
            onChange={(e) => {
                if(e.target.checked) {
                    setFormData({...formData, categories: [...formData.categories, id]})
                } else {
                    setFormData({...formData, categories: formData.categories.filter((category) => category !== id)})
                }
            }}
             />
            <span className="text-white text-sm font-light">{name}</span>
          </label>
        ))}
      </div>
      </>
    );
  }
  if (type === "file") {
    return (
      <>
        {formData.file.length == 0 ? <>
            <span className="  text-white text-base">Seleccionar archivo adjunto</span>
  
        <div className=" ">
          <label
            htmlFor="file-upload"
            className="p-2 bg-blue-950 text-white flex gap-1 w-fit items-center rounded cursor-pointer"
          >
            <span>Subir</span>
            <ArrowUpIcon className="w-5 h-5"/>
          </label>
          <input
            id="file-upload"
            className="hidden"
            onChange={(e) => {
              if (!e.target.files) return;
              const file = e.target.files[0];
  
              // setFormData({...formData, file})
  
              const reader = new FileReader();
  
              reader.onload = () => {
                const base64String = reader.result;
                if (typeof base64String === "string") {
                  setFormData({ ...formData, file: base64String });
                }
              };
  
              reader.readAsDataURL(file);
  
              // Clear the file input value after reading the file
            }}
            // Acepta imágenes y PDFs
            accept="image/*,.pdf"
            type={type}
          />
        </div>
        </> : <>
        <div
            className="p-2 bg-blue-950 text-white flex gap-1 w-fit items-center rounded cursor-pointer"
          >
            <span>Subido</span>
            <CheckIcon className="w-5 h-5"/>
          </div>
        </>}
      </>
    );
  }

  if(type == "textarea"){
    return (
        
        <textarea
            className="p-2"
            onChange={(e) => {
                setFormData({ ...formData, [value]: e.target.value });
                }}
            placeholder={label}
            value={formData[value] as string}
        />
        )
  }

  return (
    <input
      className="p-2"
      onChange={
        (e) => {
            setFormData({ ...formData, [value]: e.target.value })
            

      }}
      placeholder={label}
      value={formData[value] as string}
      type={type}
    />
  );
}
