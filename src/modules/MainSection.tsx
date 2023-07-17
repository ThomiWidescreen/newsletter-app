'use client'

import React from 'react'
import LeftSide from './LeftSide'
import MidSide from './MidSide'
import RightSide from './RightSide'

export default function MainSection() {
  return (
    <section className=" my-5 flex justify-center gap-4   w-full h-[85vh] [&>*]:w-[32%] [&>*]:overflow-y-auto [&>*]:p-4 [&>*]:h-full [&>*]:bg-blue-900 ">
        <LeftSide/>
        <MidSide/>
        <RightSide/>
    </section>
  )
}
