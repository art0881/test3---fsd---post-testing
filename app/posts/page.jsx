'use client'
import React, { useState } from 'react';
import axios from 'axios';
import '../globals.css'
import { useQueryClient, useMutation, useQuery } from 'react-query';
import Link from 'next/link';

  // env ключ
  const apiUrl = process.env.NEXT_PUBLIC_API;
  const postUrl = process.env.NEXT_PUBLIC_API_POSTS;
// Функция для загрузки постов с сервера
const fetchPosts = async () => {
  const { data } = await axios.get(`${apiUrl}${postUrl}`);
  return data;
};

// Функция для добавления нового поста
const addPost = async ({ title, content }) => {
  const { data } = await axios.post(`${apiUrl}${postUrl}`, { title, content });
  return data;
};

// Функция для удаления поста
const deletePost = async (postId) => {
  await axios.delete(`${apiUrl}${postUrl}${postId}`);
};

// Компонент PostsComponent
const PostsComponent = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [visiblePosts, setVisiblePosts] = useState(5); // Определяем видимое количество постов
  const queryClient = useQueryClient();
  const { data: posts, isLoading, isError } = useQuery('posts', fetchPosts);

  // Мутация для добавления поста
  const addPostMutation = useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      setTitle('');
      setContent('');
    },
  });

  // Мутация для удаления поста
  const deletePostMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
  });

  // Обработчик для отправки формы добавления поста
  const handleSubmit = (e) => {
    e.preventDefault();
    addPostMutation.mutate({ title, content });
  };

  // Обработчик для удаления поста
  const handleDeletePost = (postId) => {
    deletePostMutation.mutate(postId);
  };

  // Обработчик для изменения поискового запроса
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Обработчик для загрузки дополнительных постов
  const handleLoadMore = () => {
    setVisiblePosts(prev => prev + 5); // Увеличиваем количество видимых постов на 10
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching posts!</p>;

  // Разворачиваем массив постов
  const reversedPosts = [...posts].reverse();

  // Фильтруем посты по поисковому запросу
  const filteredPosts = reversedPosts.filter(post =>
    (post.title && post.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (post.content && post.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Отображаем только определенное количество постов
  const postsToShow = filteredPosts.slice(0, visiblePosts);

  // Функция для правильного склонения слова "пост"
  const postNums = (length) => {
    if (length === 1) {
      return 'пост';
    } else if (length > 1 && length < 5) {
      return 'поста';
    } else if (length >= 5) {
      return 'постов';
    }
  };

  return (
    <div className='tx-center '>
      <h1>Посты</h1>
      <form className='formContainer' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Текст"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        /><br/>
        <button className="button" type="submit" disabled={addPostMutation.isLoading}>
          {addPostMutation.isLoading ? 'Загружается...' : 'Добавить'}
        </button>
      </form>
      {posts.length === 0 && (
        <p>Нет постов</p>
      )}
      {posts.length > 0 && (
        <div>
          <h2>{filteredPosts.length} {postNums(filteredPosts.length)}</h2>
          <input
            type="text"
            placeholder="Поиск..."
            value={searchQuery}
            onChange={handleSearchChange}
          /><br/><br/>
          <ul>
            {postsToShow.length > 0 ? (
              postsToShow.map(post => (
                <div className="block_info" key={post.id}>
                  <Link href={`/posts/${post.id}`} >
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  </Link>
                  <button className="button w100" onClick={() => handleDeletePost(post.id)}>Удалить</button>
                </div>
              ))
            ) : (
              <p>Посты не найдены</p>
            )}
          </ul>
          {filteredPosts.length > visiblePosts && (
            <button className="button w100" onClick={handleLoadMore}>Загрузить еще</button>
          )}
        </div>
      )}
    </div>
  );
};

export default PostsComponent;
