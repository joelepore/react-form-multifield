import { useEffect, useState } from "react"
import AddArticleForm from "./components/AddArticleForm"
import ArticleList from "./components/ArticleList"

import blogArticles from "./data/blogArticles"

function App() {
  const [articleList, setArticleList] = useState(blogArticles)
  const [editingArticle, setEditingArticle] = useState(null);

  const handleAddArticle = (articleData) => {
    const newArticle = {
      id: Date.now(),
      title: articleData.title,
      content: articleData.content,
      isComplete: articleData.isComplete,
      image: articleData.image,
      category: articleData.category,
      tags: articleData.tags,
    };

    setArticleList([newArticle, ...articleList]);
  }

  const handleDeleteArticle = (id) => {
    setArticleList(articleList.filter(article => article.id !== id));
  }

  const handleEditArticle = (id) => {
    setEditingArticle(articleList.find(article => article.id === id));
  }

  const handleEditSubmit = (newArticleData) => {
    setArticleList(articleList.map(article => article.id === newArticleData.id ? newArticleData : article));
  }

  useEffect(() => {
    console.log(articleList);
  }, [articleList])

  return (
    <>
      <h1 className="text-4xl font-bold text-center py-4">Il tuo blog</h1>
      <div className="max-w-screen-md mx-auto pb-12">
        <AddArticleForm onSubmit={handleAddArticle} editingArticle={editingArticle} onEditSubmit={handleEditSubmit} />
        <h2 className="py-4 font-bold text-2xl text-center">Articoli recenti</h2>
        <ArticleList
          articles={articleList}
          onDelete={handleDeleteArticle}
          onEdit={handleEditArticle}
        />
      </div>
    </>
  )
}

export default App
