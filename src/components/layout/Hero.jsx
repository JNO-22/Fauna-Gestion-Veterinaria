import { FaTree } from "react-icons/fa6";

export const Hero = () => {
  return (
    <div className="hero min-h-[80vh] md:min-h-[80vh] lg:min-h-[100vh] lg:bg-center bg-cover bg-center md:px-4 pt-20 HeroImage">
      <div className="hero-content pb-0 gap-20 self-end justify-self-start md:flex-row md:p-4">
        <div className="flex md:justify-center pb-10 pl-10">
          <h1 className=" text-start md:text-center text-base-200 text-4xl">
            Gestion veterinaria <br />
            <span className="text-green-500 text-6xl font-bold flex items-start md:justify-center ">
              Fauna
              <FaTree className="w-4 h-4 md:w-6 md:h-6 text-green-500" />
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};
