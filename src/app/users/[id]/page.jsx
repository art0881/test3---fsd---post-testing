'use client'
import React from 'react'
import { useQuery } from 'react-query';
import Link from 'next/link';

const fetchUser = async (id) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/" + id);
  return response.json();
};
const User = ({params}) => {


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