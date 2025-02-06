import { useParams } from "react-router";
import useFetchData from "@hooks/useFetchData";
import FloatButton from "@components/ui/FloatButton";
import { useSelector } from "react-redux";
import MascotaForm from "@components/form/MascotaForm";
import { formatDate } from "@utils/DateFormatter";
const MascotDetail = () => {
  useFetchData("turno");
  const { id } = useParams();
  const newMascot = id === "nuevo";
  const turnos = useSelector((state) => state.turno.items);
  const filteredTurnos = turnos?.filter((turno) => turno.mascota?._id === id);

  if (!newMascot) {
    useFetchData("mascota", id);
    useFetchData("turno");
  }

  const Mascota = useSelector((state) => state.mascota.selectedMascota);
  return (
    <div className="flex flex-col gap-10 py-20 px-10 items-center justify-center min-h-screen">
      <div className="flex w-full max-h-2/4 flex-row items-center justify-center">
        <MascotaForm newMascot={newMascot} />
        <img
          src="/src/assets/golden.png"
          alt="golden"
          className="w-0 bg-brand-lightpink mask mask-squircle h-full pointer-events-none md:w-1/3"
        />
      </div>
      <div
        className={` ${newMascot ? "hidden" : ""} collapse  w-5/6 shadow-lg`}
      >
        <input type="checkbox" className="peer" />
        <div className="collapse-title text-center font-medium peer-checked:bg-accent bg-green-300 text-white duration-500">
          {turnos?.length > 0
            ? `Turnos asociados a ${Mascota?.nombre}`
            : `No hay turnos asociados a ${Mascota?.nombre}`}
        </div>
        <ul className="list bg-base-200 gap-2 rounded-box shadow-md collapse-content">
          {filteredTurnos?.map((turno) => (
            <li className="list-row" key={turno._id}>
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-4">
                  <span className="font-semibold">Fecha:</span>
                  <span>{formatDate(turno.fecha)}</span>
                </div>
                <div className="flex flex-row gap-3">
                  <p className="list-col-wra"> Estado:</p>
                  <p className="list-col-wrap"> {turno.estado}</p>
                </div>
                <p className="text-xs uppercase font-semibold opacity-60">
                  Observaciones:
                </p>
                <p className="list-col-wrap text-sm">
                  {turno.reporte ||
                    "Sin observaciones registradas por el veterinario"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {!newMascot && <FloatButton id={id} type="mascota" />}
    </div>
  );
};

export default MascotDetail;
