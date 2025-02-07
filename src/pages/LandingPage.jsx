import { Link } from "react-router";
import { Hero } from "../components/layout/Hero";
import Card from "@components/card/Card";
const Home = () => {
  return (
    <div className="bg-base-200">
      <Hero />

      <section className="flex flex-col sm:flex-row pt-20 justify-around items-center p-4">
        <div className="flex flex-col items-center max-w-md">
          <h1 className="text-4xl font-bold ">Sobre Nosotros</h1>
          <p className="py-8  font-light opacity-95  ">
            Fauna es un sistema de gestión integral diseñado para clínicas y
            hospitales veterinarios. Ofrecemos una variedad de herramientas para
            facilitar la gestión de los pacientes.
          </p>
        </div>
        <img
          src={"/assets/dog-3234285_1920.png"}
          alt="Perro"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="bg-amber-200 mask mask-squircle sm:w-1/2 w-0"
        />
      </section>

      <section className="flex flex-col text-center items-center p-4 pt-20">
        <h1 className="text-4xl ">Gestiona a tus pacientes</h1>
        <p className="text-start font-light opacity-95 pt-4 ">
          {" "}
          Con Fauna podras gestionar tus pacientes de manera sencilla
        </p>
        <div className="flex justify-evenly items-center py-12 flex-col md:flex-row w-full gap-10">
          <Link to="/clientes">
            <Card
              title="Clientes"
              color="bg-brand-lightblue"
              image1="\assets\per-perro-salch.png"
              image2="\assets\per-perro-blan.png"
            />
          </Link>
          <p className="md:hidden text-lg opacity-95 font-light">
            Gestiona a las mascotas de tus clientes y organiza sus citas
          </p>
          <Link to="/mascotas">
            <Card title="Mascotas" color="bg-brand-lightpink" />
          </Link>
        </div>
        <div className="flex flex-row items-center">
          <Link className="flex-1" to="/turnos">
            <Card
              image1="\assets\vet-holding-pup.png"
              image2="\assets\vet-smiling-cam.png"
              title="Turnos"
              color="bg-green-200"
            />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
