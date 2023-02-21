import React, { useState } from "react";
import { useQuery, useInfiniteQuery } from 'react-query';

const API_KEY = '10a11769e0684b1ca4a00dbf71a12ff3' // &apiKey
const LIMIT = 10

function App() {
  const [question, setQuestion] = useState('russia');

  // const url = `https://newsapi.org/v2/everything?q=${question}&apiKey=${API_KEY}&per_page=${LIMIT}&page=${page}`

  const fetchNews = async () => {
    const res = await fetch(`https://newsapi.org/v2/everything?q=${question}&apiKey=${API_KEY}`);
    return res.json();
  };

  const { isLoading, isError, error, data, refetch } = useQuery('data', fetchNews,
    // ({ pageParams = 1 }) => fetchNews(pageParams),
    // {
    //   getNextPageParam: (lastPage, allPages) => {
    //     const nextPage = allPages.length + 1
    //     return nextPage
    //   }
    // },
    {
      manual: true,
      refetchOnWindowFocus: false,
      enabled: false,
    })
  console.log(data)

  return (
    <section>
      <span>
        <input
          type="text"
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={() => refetch()}>Click</button>
      </span>

      {isLoading ? <h1>Loading...</h1> : null}
      {isError ? <h1>Error {error}</h1> : null}

      {data ?
        <ul>
          {data.articles.map((article) => (
            <li key={data.articles.indexOf[article]}>
              <p>{article.author}</p>
              <p>{article.title}</p>
              <p>{article.url}</p>
              <p>{article.content}</p>
              <p>{article.description}</p>
              <p>{article.publishedAt}</p>
            </li>
          ))}
        </ul>
        : null}

    </section>
  );
}

export default App;

{/* <ul>{data.pages.map((page) => (
        page.articles.map((article) => (
          <li >
            <p>{article.author}</p>
            <p>{article.title}</p>
            <p>{article.url}</p>
            <p>{article.content}</p>
            <p>{article.description}</p>
            <p>{article.publishedAt}</p>
          </li>
        ))))}
      </ul> */}
