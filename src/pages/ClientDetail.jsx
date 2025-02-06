import { useParams } from "react-router";
import { TbEdit } from "react-icons/tb";
import ClientForm from "@components/form/ClientForm";
import useFetchData from "@hooks/useFetchData";
import { useSelector } from "react-redux";
import FloatButton from "@components/ui/FloatButton";

const ClientDetail = () => {
  const { id } = useParams();
  const newClient = id === "nuevo";
  const cliente = useSelector((state) => state.cliente.selectedClient);
  const mascotas = useSelector((state) => state.mascota.items);

  if (!newClient) {
    useFetchData("cliente", id);
    useFetchData("mascota");
  }

  const filteredMascotas = mascotas?.filter(
    (mascota) => mascota.cliente?._id === id
  );

  return (
    <div className="flex flex-col gap-10 min-h-screen py-20  items-center justify-center">
      <div className="flex w-full max-h-2/4 flex-row items-center justify-end gap-8">
        {<ClientForm newClient={newClient} />}
        <img
          src="/src/assets/side-view-woman.png"
          alt="Side View Woman"
          className="w-1/4  h-full pointer-events-none md:hidden rounded-l-full"
        />
      </div>
      <div
        className={` ${newClient ? "hidden" : ""} collapse  w-3/4 shadow-lg`}
      >
        <input type="checkbox" className="peer" />
        <div className="collapse-title text-center font-medium peer-checked:bg-accent bg-green-300 text-white duration-500">
          {filteredMascotas?.length > 0
            ? `Mascotas asociadas a ${cliente?.nombre}`
            : `No hay mascotas asociadas a ${cliente?.nombre}`}
        </div>

        <ul className="shadow sm:rounded-md p-0 collapse-content">
          {filteredMascotas.map((mascota, index) => (
            <li
              key={index}
              className={`border-t border-gray-200 ${
                index % 2 === 0 ? "bg-base-100" : " bg-base-200"
              }`}
            >
              <a
                href="#"
                className="block group hover:bg-green-100 duration-400"
              >
                <div className="flex items-end justify-between px-4 py-4 sm:px-8">
                  <div className="flex-1 flex items-center">
                    <div className="flex-1 grid items-center grid-cols-3 md:grid-cols-5">
                      <p className="text-sm font-medium text-gray-900 truncate group-hover:text-emerald-400">
                        {mascota.nombre}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 group-hover:text-emerald-400">
                        {mascota.edad} años
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 group-hover:text-emerald-400">
                        {mascota.raza}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 group-hover:text-emerald-400">
                        {mascota.especie}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 group-hover:font-bold group-hover:text-emerald-400">
                        Editar
                        <TbEdit className="w-6 h-6 text-green-500 " />
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
      {!newClient && <FloatButton id={id} type="cliente" />}
    </div>
  );
};

export default ClientDetail;
