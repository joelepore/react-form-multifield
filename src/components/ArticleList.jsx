import Article from "./Article";
import Card from "./Card"

const ArticleList = ({ articles, className, onDelete, onEdit }) => {

  const renderArticles = () => {
    const mappedArticles = articles.map(article => (
      <Article
        id={article.id}
        key={`art-${article.id}`}
        title={article.title}
        content={article.content}
        isComplete={article.isComplete}
        image={article.image}
        category={article.category}
        tags={article.tags}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    ));

    return mappedArticles.length == 0 ? <li className="py-2 px-4">Nessun articolo presente</li> : mappedArticles;
  }

  return (
    <Card className={`${className}`}>
      <ul>
        {renderArticles()}
      </ul>
    </Card>
  )
}

export default ArticleList