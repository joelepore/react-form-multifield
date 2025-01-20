import { useState } from "react"
import Button from "./partials/Button"
import axios from "axios";

const apiKey = 'wwDXlNoUcJQlscq71am2rVkn_0dAUiD4vIM9-78LD8A';

const UnsplashImageFinder = ({ onImageSelect }) => {
  const [imgQuery, setImgQuery] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const handleOpenSearch = () => {
    setIsPopupOpen(true);
  }
  const handleSearchClick = () => {
    const unsplashUrl = `https://api.unsplash.com/search/photos?page=1&query=${imgQuery}&per_page=3&client_id=${apiKey}`
    axios.get(unsplashUrl)
      .then((res) => setSearchResult(res.data.results.map(img => {
        return {
          id: img.id,
          url: img.urls.small
        }
      })))
  }

  const handleImgClick = (imgUrl) => {
    onImageSelect(imgUrl)
    setIsPopupOpen(false);
  }

  return (
    <div>
      <Button text="Cerca su Unsplash" onClick={handleOpenSearch} />
      <div className={`${isPopupOpen ? 'block' : 'hidden'} absolute bg-white border-2 border-neutral-200 rounded-lg p-2 mt-4`}>
        <input
          type="text"
          placeholder="Cerca un'immagine"
          className="border-2 border-neutral-200 py-1 px-4 rounded-lg"
          value={imgQuery}
          onChange={e => setImgQuery(e.target.value)}
        />
        <Button text="Cerca" onClick={handleSearchClick} />
        <div className={`grid grid-cols-3 max-w-sm mt-2 gap-x-2`}>
          {searchResult.map(img => (
            <img
              className="aspect-square"
              key={img.id}
              src={img.url}
              onClick={() => handleImgClick(img.url)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default UnsplashImageFinder