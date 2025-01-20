import { useState } from "react"
import Card from "./Card"
import Button from "./partials/Button"
import { FaWandMagicSparkles } from "react-icons/fa6";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = `AIzaSyDqYJ-TGtoQsEAeQUBQRy5c-WQKwx13LjI`;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
const prompt = "Write a single short blog article title about tech. Write only the title.";

const AddArticleForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      isComplete
    })
    // Reset state after submit
    setTitle('');
    setIsComplete(false);
  }

  const handleIsComplete = (e) => {
    setIsComplete(e.target.id === 'radio-draft' ? false : true);
  }

  const getTitleSuggestionFromGemini = async () => {
    const result = await model.generateContent(prompt);
    setTitle(result.response.text());
  }

  return (
    <Card>
      <h2 className="text-xl font-medium text-center border-b border-neutral-300 py-4">Aggiungi un nuovo articolo</h2>
      <form className="p-4 article-form gap-y-4">
        <span className="mr-4">Titolo</span>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Inserisci un titolo"
            className="w-full border border-neutral-300 focus:outline-none rounded-lg px-1 text-sm"
            value={title}
            onChange={e => setTitle(e.target.value)}
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
        <span className="mr-4">Stato</span>
        <div className="flex gap-2">
          <div>
            <input
              type="radio"
              id="radio-draft"
              name="state"
              className="mr-1"
              onChange={handleIsComplete}
            />
            <label htmlFor="radio-draft" className="text-sm">Draft</label>
          </div>
          <div>
            <input
              type="radio"
              id="radio-completo"
              name="state"
              className="mr-1"
              onChange={handleIsComplete}
            />
            <label htmlFor="radio-completo" className="text-sm">Completo</label>
          </div>
        </div>
        <Button className="col-span-2" text="Aggiungi" onClick={handleClick} />
      </form>
    </Card>
  )
}

export default AddArticleForm