import Category from '@/src/components/Category'
import { useCategories } from '@/src/store/store'
import React, { useEffect } from 'react'

export default function Categories() {
    const categories = useCategories((state) => state.categories)
    const fetchCategories = useCategories((state) => state.fetchCategories)

    useEffect(() => {
        if(categories.length === 0){
          fetchCategories()
        }
    }, [])
  return (
    <div className="mt-3 justify-center grid grid-cols-3 gap-2">
        {categories.length > 0 && categories.map(({id, name}) => <Category key={id} id={id} name={name} />)}
      </div>
  )
}
