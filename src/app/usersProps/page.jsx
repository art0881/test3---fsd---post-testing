'use client'
import React, { useEffect, useState } from 'react';
import UsersList from './usersList';

const Users = () => {
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true)
  

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


 if(data.length == 0){
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
   

  
     <UsersList data={data}/>
  
    </div>
  )
}

export default Users