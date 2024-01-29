import React, { useEffect, useState, useRef } from 'react'
import { Router, useRouter } from "next/router";
import {
  Image
} from "@chakra-ui/react";
import { Section, SectionsContainer } from "react-fullpage";
import { AnimatePresence, motion as m } from "framer-motion";

let options = {
  sectionClassName: "section",
  anchors: ["one", "two", "three",'four'],
  scrollBar: false,
  navigation: true,
  verticalAlign: false,
  arrowNavigation: true,
};

export default function Home() {
  const router = useRouter();
  return (
    <div className='w-full h-full relative bg1'>
      <div className="starfield">
        <div className="static"></div>
        <div className="moving-1"></div>
        <div className="moving-2"></div>
        <div className="moving-3"></div>
      </div>
      <div className='h-[60px] fixed top-0 left-0 flex items-center justify-between w-full z-20'>
          <Image src={`/home/Logo.png`} className="h-10 ml-5" alt="" />
          <Image src={`/home/head.png`} alt="" />
          <Image src={`/home/start.png`} className="hover:opacity-70 cursor-pointer mr-5" alt="" onClick={() => router.push('/numerology')}/>
        </div>
      <div className='absolute left-0 top-[60px] w-full h-[calc(100%-60px)] z-10'>
      
        <div className='h-full'>

          <SectionsContainer {...options}>

          <Section className="custom-section">
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1 } }}
              className="w-full h-full"
            >
              <div className={`h-full flex items-center justify-between`}>
                <Image src={`/home/g1.png`} className="ml-10 h-[80%]" alt="" />
                <div className='h-[70vh] w-[70vh] relative overflow-hidden'>
                  <Image src={`/home/r1.png`} className="absolute h-full w-full left-0 top-0 rotate-forever1" alt="" />
                  <Image src={`/home/r2.png`} className="absolute h-full w-full left-0 top-0 rotate-forever" alt="" />
                  <Image src={`/home/r3.png`} className="absolute h-full w-full left-0 top-0 rotate-forever" alt="" />
                  <Image src={`/home/r4.png`} className="absolute h-full w-full left-0 top-0 rotate-forever1" alt="" />
                </div>
                <Image src={`/home/g2.png`} className="mr-10 h-[80%]" alt="" />
              </div>
            </m.div>
          </Section>

          <Section className="custom-section">
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1 } }}
              className=" w-full h-full"
            >
              <div className={`h-full`}>
                <div className='h-full w-[80%] mx-auto flex items-center gap-20'>
                  <div className='flex-1 h-full'>
                    <Image src={`/home/r5.png`} className="h-[50%] mx-auto mb-20 mt-10 rotate-forever" alt="" />
                    <Image src={`/home/r6.png`} className="mx-auto" alt="" />
                  </div>
                  <div className='flex-1 h-full flex items-center relative'>
                    <Image src={`/home/r7.png`} alt="" />
                    <Image src={`/home/r8.png`} className="absolute left-10 bottom-[30%] cursor-pointer hover:opacity-70" alt=""  onClick={() => router.push('/numerology')}/>
                  </div>
                </div>
              </div>
            </m.div>
          </Section>


          <Section className="custom-section">
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1 } }}
              className="w-full h-full"
            >
              <div className={`h-full flex items-center justify-center`}>
                <Image src={`/home/r9.png`} className='h-[80%]' alt="" />
              </div>
            </m.div>
          </Section>

          <Section className="custom-section">
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1 } }}
              className="w-full h-full"
            >
              <div className={`h-full flex items-center justify-center`}>
                <div className='h-[80%] relative'>
                <Image src={`/home/r10.png`} className="h-full" alt="" />
                <Image src={`/home/r11.png`} className='absolute right-10 bottom-20 cursor-pointer hover:opacity-70' alt="" />
                <Image src={`/home/r12.png`} className='absolute right-10 bottom-10 cursor-pointer hover:opacity-70' alt="" />
                </div>
              </div>
            </m.div>
          </Section>
          </SectionsContainer>
        </div>
        <div className='h-[60px] overflow-hidden'>
          {/* <Image src={`/home/aistar.png`} className="h-10 ml-5" alt="" /> */}
        </div>
      </div>
    </div>
  );
}
