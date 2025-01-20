import { useState } from "react"
import AddArticleForm from "./components/AddArticleForm"
import ArticleList from "./components/ArticleList"

import blogArticles from "./data/blogArticles"

function App() {
  const [articleList, setArticleList] = useState(blogArticles)

  const handleAddArticle = (articleData) => {
    const newArticle = {
      id: Date.now(),
      title: articleData.title,
      isComplete: articleData.isComplete
    };

    setArticleList([newArticle, ...articleList]);
  }

  const handleDeleteArticle = (id) => {
    setArticleList(articleList.filter(article => article.id !== id));
  }

  const handleEditArticle = (id, title) => {
    setArticleList(articleList.map(article => {
      if (article.id === id) {
        return { ...article, title: title }
      } else {
        return article;
      }
    }))
  }


  return (
    <>
      <h1 className="text-4xl font-bold text-center py-4">Il tuo blog</h1>
      <div className="max-w-screen-sm mx-auto">
        <AddArticleForm onSubmit={handleAddArticle} />
        <h2 className="py-4 font-bold text-2xl text-center">Articoli recenti</h2>
        <ArticleList articles={articleList} onDelete={handleDeleteArticle} onEdit={handleEditArticle} />
      </div>
    </>
  )
}

export default App
