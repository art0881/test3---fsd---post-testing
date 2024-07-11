'use client'
import React, { useEffect, useState } from 'react';


const Users = () => {
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true)
    // useEffect(()=>{
    //   const fetchData = async () =>{
    //     const res = await fetch('http://localhost:4000/users');
    //     const result = await res.json();
    //     setData(result);
    //   };
    //   fetchData();  
    // },[])

   
//  useEffect(()=>{
//   fetch('http://localhost:4000/users')
//   .then(res=>res.json())
//   .then(json=>{
//     setData(data);
//     setLoad(false);
//   })
//  },[])

  // useEffect(()=>{
  //  const fetchData = async ()=>{
  //   const result = await fetch('http://localhost:4000/users');
  //   const res = await result.json();
  //   setData(res);
  //   setLoad(false);
  //  };
  //  fetchData();
  // },[])

   useEffect(()=>{
    const fetchData = async ()=>{
      const res = await fetch('http://localhost:4000/users');
      const data = await res.json();
      setData(data);
      setLoad(false);
    };
    fetchData();
   },[])

 if(load ){
  return <div>Загрузка Рашид</div>
 }


 if(data.length ==0){
  return <div>нет пользователей</div>
}

const dataLength = (length)=>{
   if(length == 1){
    return 'пользователь'
   } else if(length =>1){
    return 'пользователя'
   } else if(length =>4){
    return 'пользователей'
   }
}

  return (
    <div >
    {data.length} {dataLength(data.length)}
    {data.map((data)=>(
    <div style={{ marginBottom: '20px' }} key={data.id} >
        <div style={{display:'flex'}}><div style={{marginRight:'5px'}}>{data.name}</div>
        <div>{data.age}</div></div>
    </div>
    ))}
    </div>
  )
}

export default Users