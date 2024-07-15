'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../../../../app/globals.css'

const Header = ({children}) => {
  // Создаём ссылку на элемент шапки
  const headerRef = useRef(null);

  // Используем эффект для выполнения анимации после рендера
  useEffect(() => {
    // Запускаем анимацию с задержкой в 2 секунды
    gsap.fromTo(
      headerRef.current,
      { y: -100,  visibility: 'hidden'}, // Начальные значения
      { y: 0,  visibility: 'visible', duration: 1, } // Конечные значения с задержкой 2 секунды
    );
  }, []);

  return (<div ref={headerRef} className='blockgsap'>{children}</div>);
};

export default Header;
