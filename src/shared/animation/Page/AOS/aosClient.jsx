'use client'
import React, { Children } from 'react'
import AOS  from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from 'react';

const aosClient = ({children}) => {
    useEffect(() => {
        AOS.init({
          duration: 2000, 
          once: true 
        });
      }, []);
  return <>{children}</>
  
}

export default aosClient