import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { RiEditFill } from "react-icons/ri";

const Article = ({ id, title, isComplete, content, image, category, tags, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [articleTitle, setArticleTitle] = useState(title);

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleEditSubmit = () => {
    setIsEditing(false);
    onEdit(id, articleTitle);
  }

  const renderArticleTitle = () => {
    return isEditing ?
      <input
        type="text"
        value={articleTitle}
        onChange={e => setArticleTitle(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter")
            handleEditSubmit();
        }}
        className="w-full"
        size="120"
        autoFocus
      /> :
      <h3 className="text-lg font-medium">{title}</h3>
  }

  return (
    <li className="border-b border-neutral-300 article-item ">
      <div className="py-2 px-2 article-content">
        <img
          src={image}
          alt=""
          className="max-w-40 aspect-square object-cover rounded-lg"
        />
        <div className="grid grid-rows-3 h-full">
          {renderArticleTitle()}
          <p className="text-wrap">{content}</p>
          {/* sub-info */}
          <div className="self-end article-sub-info">
            <p className="text-sm">{isComplete ? 'Completo' : 'Draft'}</p>
            <p className="text-sm">{category}</p>
            <p className="text-xs justify-self-end">{tags.map(tag => (
              <span className="mx-2 bg-neutral-200 px-2 rounded-lg">{tag}</span>
            ))}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <RiEditFill className="text-xl cursor-pointer" onClick={handleEdit} />
          <IoIosCloseCircle className="text-xl cursor-pointer" onClick={() => onDelete(id)} />
        </div>
      </div>
    </li>
  )
}

export default Article