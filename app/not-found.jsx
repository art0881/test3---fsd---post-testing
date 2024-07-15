import Link from 'next/link';
import React from 'react';
const Custom404 = () => {
  return (<>

    <div className='tx-center'><h1>404</h1>
    <h2>Cраница не найдена</h2>
    <Link href="/"><button className='button'>Вернуться</button></Link>
    </div>
    </>
  )
}

export default Custom404