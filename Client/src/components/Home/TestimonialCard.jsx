const TestimonialCard = ({ name, title, rating, text, img }) => {
  const stars = Array(5)
    .fill(0)
    .map((_, i) => (
      <span key={i} className={i < rating ? "text-blue-500" : "text-gray-200"}>
        ★
      </span>
    ));

  return (
    <div className="bg-gray-900/20 border border-gray-700 rounded-lg w-80 shadow-md">
      <div className="flex items-center gap-3 p-4 border-b bg-black rounded-t-lg">
        <img src={img} alt={name} className="w-12 h-12 rounded-full" />
        <div>
          <h3 className="text-white font-semibold">{name}</h3>
          <p className="text-gray-400 text-sm">{title}</p>
        </div>
      </div>
      <div className="p-4 text-gray-300">
        <div className="flex items-center mb-2 text-lg">{stars}</div>
        <p className="text-sm mb-4">{text}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
