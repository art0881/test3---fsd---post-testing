'use client'
// PostsComponent.jsx
// PostsComponent.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../globals.css'
import { useQueryClient, useMutation, useQuery } from 'react-query';

const fetchPosts = async () => {
  const { data } = await axios.get('http://localhost:4000/posts');
  return data;
};

const addPost = async ({ title, content }) => {
  const { data } = await axios.post('http://localhost:4000/posts', { title, content });
  return data;
};

const deletePost = async (postId) => {
  await axios.delete(`http://localhost:4000/posts/${postId}`);
};

const PostsComponent = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [visiblePosts, setVisiblePosts] = useState(5); // Определяем видимое количество постов

  const queryClient = useQueryClient();

  const { data: posts, isLoading, isError } = useQuery('posts', fetchPosts);

  const addPostMutation = useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      setTitle('');
      setContent('');
    },
  });

  const deletePostMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addPostMutation.mutate({ title, content });
  };

  const handleDeletePost = (postId) => {
    deletePostMutation.mutate(postId);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLoadMore = () => {
    setVisiblePosts(prev => prev + 5); // Увеличиваем количество видимых постов на 10
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching posts!</p>;

  // Reverse posts array
  const reversedPosts = [...posts].reverse();

  // Filter posts based on search query
  const filteredPosts = reversedPosts.filter(post =>
    (post.title && post.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (post.content && post.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Отображаем только определенное количество постов
  const postsToShow = filteredPosts.slice(0, visiblePosts);
  
  const postNums = (length) =>{
  if (length==1){
    return 'пост'
  } else if (length > 1 && length < 5){
    return 'поста'
  }else if (length => 5 ){
    return 'постов'
  }
}
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
          <h2>{filteredPosts.length} {postNums(filteredPosts.length)} </h2>
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
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
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
