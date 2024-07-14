// components/AnimatedBlock.js
'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../../../../app/globals.css'

const AnimatedBlock = ({ children }) => {
  const blockRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      blockRef.current,
      { opacity: 0, y: 50, visibility: 'hidden' },
      { opacity: 1, y: 0, visibility: 'visible', duration: 1 }
    );
  }, []);

  return (
    <div ref={blockRef} className='blockgsap'>
      {children}
    </div>
  );
};

export default AnimatedBlock;
