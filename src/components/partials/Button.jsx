const Button = ({ text, className, onClick }) => {
  return (
    <button
      className={`${className} bg-blue-500 text-white py-1 rounded-2xl hover:bg-blue-700 transition`}
      onClick={onClick}
    >{text}</button>
  )
}

export default Button