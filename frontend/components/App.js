import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import axios from 'axios'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => { navigate('/') }
  const redirectToArticles = () => { navigate('/articles') }

  const logout = () => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
    if (localStorage.getItem('token')){
      localStorage.removeItem('token')
      setMessage('Goodbye!')
    }
    redirectToLogin()
  }

  const login = ({ username, password }) => {
    const userObject = {
      username: username,
      password: password
    }
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch a request to the proper endpoint.
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!
    setSpinnerOn(true)
    console.log(userObject)
    setMessage('')
    axios.post('http://localhost:9000/api/login', userObject)
    .then(res => {
      console.log(res)
      localStorage.setItem('token', res.data.token)
      setMessage(res.data.message)
      getArticles()
      navigate('/articles')
      setSpinnerOn(false)
    })
    .catch(err => console.log(err))
  }

  const getArticles = () => {
    const token = localStorage.getItem('token')
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch an authenticated request to the proper endpoint.
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!
    setMessage('')
    setSpinnerOn(true)
    axios.get('http://localhost:9000/api/articles', {headers: {authorization: token}})
    .then(res => {console.log(res)
      setArticles(res.data.articles)
    setSpinnerOn(false)
  setMessage(res.data.message)}
    )
    .catch(err => console.log(err))
  }

  const postArticle = article => {
    const token = localStorage.getItem('token')
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.

  //   - `[POST] http://localhost:9000/api/articles`
  // - Expects an `Authorization` request header containing a valid auth token
  // - Expects a payload with the following properties: `title`, `text`, `topic`
  // - The `title` and `text` length must be >= 1, after trimming
  // - The `topic` needs to be one of three values: `React`, `JavaScript`, `Node`
  // - Example of payload: `{ "title": "foo", "text": "bar", "topic": "React" }`
  // - The response to a proper request includes `201 Created`, a success message and the new article
if (((article.text.trim().length >= 1) && (article.title.trim().length >= 1)) && (article.topic == ('React' || 'JavaScript' || 'Node'))){
  axios.post('http://localhost:9000/api/articles', {headers: {authorization: token}}, {
    title: article.title,
    text: article.text,
    topic: article.topic
  })
  .then()
  .catch()}
  }

  const updateArticle = ({ article_id, article }) => {
    // ✨ implement
    // You got this!
  }

  const deleteArticle = article_id => {
    // ✨ implement
  }

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
      <Spinner on={spinnerOn}/>
      <Message message={message}/>
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login}/>} />
          <Route path="articles" element={
            <>
              <ArticleForm />
              <Articles articles={articles} getArticles={getArticles}/>
            </>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
}
