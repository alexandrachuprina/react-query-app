import React, { useState } from 'react';
import { useQuery } from 'react-query';

import '../sass/pages/app.scss';
import '../sass/components/buttons.scss';
import '../sass/components/panel.scss'

const API_KEY = '10a11769e0684b1ca4a00dbf71a12ff3' // &apiKey

export default function NewsAPI() {
  const [question, setQuestion] = useState('russia');

  // const url = `https://newsapi.org/v2/everything?q=${question}&apiKey=${API_KEY}&per_page=${LIMIT}&page=${page}`

  const fetchNews = async () => {
    const res = await fetch(`https://newsapi.org/v2/everything?q=${question}&apiKey=${API_KEY}`);
    return res.json();
  };

  const { isLoading, isError, error, data, refetch, isSuccess } = useQuery('data', fetchNews,
    {
      manual: true,
      refetchOnWindowFocus: false,
      enabled: false,
    })

  console.log(data)
  // console.log(isSuccess)
  // console.log(isLoading)

  // transition on rendering!

  return (
    <>
      <div className="nav-menu">
        <input
          type="text"
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button className="btn-search-news" onClick={() => refetch()}>Get news</button>
      </div>

      {!data && !isLoading ? <div className="header"><h1>Hi</h1></div> : null}

      {
        isLoading ? <div className="header"><h1>Loading...</h1></div>
          :
          null
      }

      {
        isSuccess ?
          <div className="header">
            <h1>100 news about <span>{question}</span> for you</h1>
            {/* <h2>source: <a href="https://newsapi.org/">news API</a></h2> */}
          </div>
          : null
      }

      {isError ? <h1>Error {error}</h1> : null}

      {
        data ?
          <ul className="panel">
            {data.articles.reverse().map((article) => (
              <li>
                <h1>{article.title}</h1>
                <span><p>by {article.author}</p><p>{article.publishedAt.slice(0, 10)}</p></span>
                <h2>{article.description}</h2>
                <p><a href={article.url} target='_blank'>Read</a></p>
              </li>
            ))}
          </ul>
          : null
      }
    </>
  )
}
