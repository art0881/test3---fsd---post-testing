'use client'
import React from 'react'
import { useQuery } from 'react-query';
import Link from 'next/link';
import axios from 'axios';

const User = ({params}) => {
  // env ключ
  const apiUrl = process.env.NEXT_PUBLIC_JSONPLACEHOLDER;
  
  const fetchUser = async (id) => {
    const {data} = await axios.get(`${apiUrl}/${id}`);
    return data;
  };


// Используем хук useQuery для получения данных
 const { data, isLoading, isError } = useQuery(["user", params.id], () => fetchUser(params.id));

// Проверяем наличие ошибок
if (isError) return <h2 className="text-primary">Ошибка</h2>;

// Отображаем сообщение о загрузке
if (isLoading) return <h2 className="text-primary">Загрузка...</h2>;



  return (
    <div> 
       <div className="block_info tx-center">
            <h3>{data.name}</h3>
            <p>{data.email}</p>
            <p>Город: {data.address.city}</p>
            <p>Улица: {data.address.street}</p>
            <Link href="/users" className="button w100" >Назад к пользователям</Link>
        </div>
  </div>
  )
}

export default User