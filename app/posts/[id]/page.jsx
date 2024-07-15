'use client'
import React from 'react'
import { useQuery } from 'react-query';
import Link from 'next/link';

const fetchPost = async (id) => {
  const response = await fetch("http://localhost:4000/posts/" + id);
  return response.json();
};
const User = ({params}) => {


// Используем хук useQuery для получения данных
 const { data, isLoading, isError } = useQuery(["post", params.id], () => fetchPost(params.id));

// Проверяем наличие ошибок
if (isError) return <h2 className="text-primary">Ошибка</h2>;

// Отображаем сообщение о загрузке
if (isLoading) return <h2 className="text-primary">Загрузка...</h2>;



  return (
    <div> 
       <div className="block_info tx-center">
            <h3>{data.title}</h3>
            <p>{data.content}</p>
            <Link href="/posts" className="button w100" >Назад к постам</Link>
        </div>
  </div>
  )
}

export default User