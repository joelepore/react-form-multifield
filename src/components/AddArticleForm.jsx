import { useEffect, useState } from "react"
import Card from "./Card"
import Button from "./partials/Button"
import { FaWandMagicSparkles } from "react-icons/fa6";
import { GoogleGenerativeAI } from "@google/generative-ai";
import UnsplashImageFinder from "./UnsplashImageFinder";

const apiKey = `AIzaSyDqYJ-TGtoQsEAeQUBQRy5c-WQKwx13LjI`;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
const prompt = "Write a single short blog article title about tech. Write only the title.";

const initialFormData = {
  title: '',
  content: '',
  category: '',
  tags: [],
  isComplete: false,
  image: '',
}

const tags = ['Innovazione', 'Tecnologia', 'Natura', 'News'];

const AddArticleForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleFormData = (e) => {
    let value;
    if (e.target.name === 'isComplete') {
      value = e.target.id === 'radio-draft' ? false : true;
    } else if (e.target.name.startsWith('check')) {
      // Checkbox
      value = e.target.name.split('-').slice(1).join(' ');
      if (e.target.checked) {
        setFormData({
          ...formData,
          tags: [...formData.tags, value]
        })
      } else {
        setFormData({
          ...formData,
          tags: formData.tags.filter(tag => tag !== value)
        })
      }
      return;
    } else {
      value = e.target.value;
    }
    setFormData({
      ...formData,
      [e.target.name]: value
    })
  }

  useEffect(() => {
    if (formData.isComplete) {
      alert(`Sei sicuro di voler pubblicare l'articolo?`);
    }
  }, [formData.isComplete])

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData)
    // Reset state after submit
    setFormData(initialFormData);
  }

  const getTitleSuggestionFromGemini = async () => {
    const result = await model.generateContent(prompt);
    setFormData({ ...formData, title: result.response.text() });
  }

  return (
    <Card>
      <h2 className="text-xl font-medium text-center border-b border-neutral-300 py-4">Aggiungi un nuovo articolo</h2>
      <form className="p-4 article-form gap-y-4" onSubmit={handleSubmit}>
        {/* Title */}
        <span className="mr-4">Titolo</span>
        <div className="flex items-center gap-2">
          <input
            name="title"
            type="text"
            placeholder="Inserisci un titolo"
            className="w-full border border-neutral-300 focus:outline-none rounded-lg px-1 text-sm"
            value={formData.title}
            onChange={handleFormData}
            size="80"
          />
          <div className="tooltip">
            <FaWandMagicSparkles
              className="cursor-pointer"
              onClick={getTitleSuggestionFromGemini}
            />
            <span className="tooltip-next">Fatti suggerire un titolo dall'AI</span>
          </div>
        </div>
        {/* Content */}
        <span className="mr-4">Contenuto</span>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleFormData}
          className="border border-neutral-300 rounded-lg px-1"
        ></textarea>
        {/* State */}
        <span className="mr-4">Stato</span>
        <div className="flex gap-2">
          <div>
            <input
              type="radio"
              id="radio-draft"
              name="isComplete"
              className="mr-1"
              onChange={handleFormData}
            />
            <label htmlFor="radio-draft" className="text-sm">Draft</label>
          </div>
          <div>
            <input
              type="radio"
              id="radio-completo"
              name="isComplete"
              className="mr-1"
              onChange={handleFormData}
            />
            <label htmlFor="radio-completo" className="text-sm">Completo</label>
          </div>
        </div>
        {/* Image */}
        <span className="mr-4">Immagine</span>
        <UnsplashImageFinder onImageSelect={handleFormData} />
        {formData.image &&
          <img
            src={formData.image}
            alt="Immagine selezionata"
            className="col-start-2 aspect-square max-w-40 object-cover"
          />}
        {/* Category */}
        <span className="mr-4">Categoria</span>
        <select name="category" onChange={handleFormData}>
          <option value="Tecnologia">Tecnologia</option>
          <option value="Fitness">Fitness</option>
          <option value="Viaggi">Viaggi</option>
          <option value="Business">Business</option>
          <option value="Cucina">Cucina</option>
        </select>
        {/* Tags */}
        <span className="mr-4">Tags</span>
        <div>
          {tags.map((tag, index) => (
            <div className="flex items-center gap-2">
              <input
                key={`tag-${index}`}
                type="checkbox"
                name={`check-${tag}`}
                onChange={handleFormData}
                checked={formData.tags.includes(tag)} />
              <label>{tag}</label>
            </div>
          ))}
        </div>
        {/* Add Button */}
        <Button className="col-span-2" text="Aggiungi" type="submit" />
      </form>
    </Card>
  )
}

export default AddArticleForm