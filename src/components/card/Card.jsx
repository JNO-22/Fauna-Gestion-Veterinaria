const Card = ({ image1, image2, title, color }) => {
  return (
    <div className="card group z-0 w-96 shadow-md">
      <figure className={`${color} pt-15 rounded-lg`}>
        <img
          src={image1 || "/assets/golden.png"}
          className="pointer-events-none w-full h-80 object-contain transition duration-200 ease-in-out group-hover:opacity-0"
          alt={title}
        />
        <img
          src={image2 || "/assets/dog-3234285_1920.png"}
          className="pointer-events-none w-full h-80 object-contain absolute opacity-0 transition duration-200 ease-in-out group-hover:opacity-100"
          alt={title}
        />
        <h2 className="card-title round-md p-2 absolute top-3/4 left-1/2 transform -translate-x-1/2  border-2 border-white text-white group-hover:bg-white group-hover:text-black duration-400">
          {title}
        </h2>
      </figure>
    </div>
  );
};

export default Card;
