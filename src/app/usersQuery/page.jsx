"use client";
import React, { useEffect, useState } from "react";
import UsersList from "./usersList";
import { useQuery } from "react-query";

const Users = () => {
  // Функция для получения данных с сервера
  const fetchData = async () => {
    const res = await fetch("http://localhost:4000/users");
    return res.json();
  };

  // Используем хук useQuery для получения данных
  const { data, isLoading, isError } = useQuery("users", fetchData);

  // Проверяем наличие ошибок
  if (isError) {
    return <div>Ошибка</div>;
  }

  // Отображаем сообщение о загрузке
  if (isLoading) {
    return <div>Загрузка...</div>;
  }

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
      {data.length} {dataLength(data.length)}
      <UsersList data={data} />
    </div>
  );
};

export default Users;