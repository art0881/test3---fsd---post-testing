'use client'
import React from 'react'
import { useQuery } from 'react-query'
import '../globals.css'
import Link from 'next/link'


const Users = () => {
  const apiUrl = process.env.NEXT_PUBLIC_JSONPLACEHOLDER;
    // Функция для запроса пользователей
    const fetchUsers = async () => {
        const response = await fetch(`${apiUrl}`);
        return response.json();
    };

    // Используем хук useQuery для получения данных
    const { data, isLoading, isError } = useQuery("users", fetchUsers);

  // Проверяем наличие ошибок
  if (isError) return <div>Ошибка</div>;

  // Отображаем сообщение о загрузке
    if (isLoading) return <div>Загрузка...</div>;

  // Если данных нет, отображаем сообщение
  if (data.length === 0) {
    return <div>нет пользователей</div>;
  }

 // Функция для определения правильного склонения слова "пользователь"
  const dataLength = (length) => {
    if (length === 1) {
      return "пользователь";
    } else if (length > 1 && length < 5) {
      return "пользователя";
    } else {
      return "пользователей";
    }
  };


  return (
    <div>
       <h1>{data.length} {dataLength(data.length)}</h1>
       
        {data.map((data)=>(
        <div className="block_info tx-center" key={data.id}>
          <Link href={`/users/${data.id}`} >
        <h3>{data.name}</h3>
        <p>{data.email}</p>
        </Link>
        </div>
    ))}</div>
  )
}

export default Users