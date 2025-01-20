const Button = ({ text, className, onClick, type }) => {
  return (
    <button
      className={`${className} bg-blue-500 text-white py-1 px-4 rounded-2xl hover:bg-blue-700 transition`}
      onClick={onClick}
      type={type ? type : 'button'}
    >{text}</button>
  )
}

export default Button