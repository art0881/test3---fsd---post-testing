'use client'
import { useQuery } from 'react-query';

const fetchSentences = async () => {
  const response = await fetch('http://localhost:3001');

  const data = await response.json();
  return data;
};

const SentencesList = () => {
  const { data, error, isLoading } = useQuery('sentences', fetchSentences);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка при получении предложений</p>;

  return (
    <ul>
      {data.map((posts, index) => (
        <li key={index}>{posts}</li>
      ))}
    </ul>
  );
};

export default SentencesList;
