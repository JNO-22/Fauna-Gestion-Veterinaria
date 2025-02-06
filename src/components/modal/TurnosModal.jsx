import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFetchData from "@hooks/useFetchData";
import usePostData from "@hooks/usePostData";
import useDeleteData from "@hooks/useDeleteData";
import { ClienteSelect, MascotaSelect } from "../form/Selects";
import { formatDateInput } from "@utils/DateFormatter";

const TurnoModal = () => {
  const selectedTurno = useSelector((state) => state.turno.selectedTurno);
  const clientesAvailables = useSelector((state) => state.cliente.items);
  const mascotasAvailables = useSelector((state) => state.mascota.items);
  const closeModal = () => document.getElementById("my_modal").close();

  const [client, setClient] = useState(selectedTurno?.mascota?.cliente || {});
  const [form, setForm] = useState(selectedTurno || null);
  const [fecha, setFecha] = useState(null);

  const { postData } = usePostData("turno", form, form?._id || null);
  const { deleteData } = useDeleteData("turno", selectedTurno?._id || null);
  const { fetchData } = useFetchData("turno");

  useEffect(() => {
    if (selectedTurno) {
      setFecha(
        selectedTurno.fecha ? formatDateInput(selectedTurno.fecha) : null
      );

      // Obtenemos el cliente de la mascota para mostrarlo en el select
      setClient(selectedTurno.mascota?.cliente || {});

      setForm(() => ({
        ...selectedTurno,
        estado: selectedTurno?.estado || "pendiente",
      }));
    }
  }, [selectedTurno]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "fecha") setFecha(value);
    setForm((prevTurno) => ({ ...prevTurno, [name]: value }));
  };

  const handleClientesChange = (e) => {
    const { value } = e.target;
    const selectedClient = clientesAvailables.find(
      (client) => client._id === value
    );
    setClient(selectedClient);
  };

  const handleMascotasChange = (e) => {
    const { value } = e.target;
    const selectedMascota = mascotasAvailables.find(
      (mascota) => mascota._id === value
    );
    setForm((prevTurno) => ({
      ...prevTurno,
      mascota: selectedMascota,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFecha(null);
    postData().then(() => fetchData());
    closeModal();
  };

  return (
    <dialog id="my_modal" className="modal modal-middle">
      <div className="modal-box p-0 w-full md:2/4 max-w-5xl">
        <div className="modal-title bg-accent p-4 w-full">
          <h3 className="font-bold text-white text-lg">Detalles del turno</h3>
        </div>
        <form
          className="py-4 gap-4 w-full flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-3/4 justify-center items-center md:flex-row gap-4">
            <ClienteSelect
              value={client?._id}
              onChange={handleClientesChange}
              clientesAvailables={clientesAvailables}
              disabled={!!selectedTurno?.mascota?.cliente?._id}
            />
            <MascotaSelect
              value={form?.mascota?._id}
              onChange={handleMascotasChange}
              mascotasAvailables={mascotasAvailables}
              cliente={client?._id}
              disabled={!!selectedTurno?.mascota?._id}
            />
          </div>
          <div className="flex flex-col w-3/4 justify-center items-center md:flex-row gap-4">
            <select
              name="estado"
              className="select select-bordered w-full"
              value={form?.estado}
              onChange={handleInputChange}
              disabled={!selectedTurno?.estado}
            >
              <option disabled>Estado</option>
              <option value="pendiente">Pendiente</option>
              <option value="atendido">Atendido</option>
              <option value="cancelado">Cancelado</option>
            </select>
            <input
              type="datetime-local"
              placeholder="Fecha"
              name="fecha"
              className="input input-bordered w-full"
              value={fecha}
              onChange={handleInputChange}
              disabled={selectedTurno?.estado === "atendido"}
              required
            />
          </div>

          {selectedTurno?.mascota && (
            <>
              <p className="font-light text-center w-7/8">
                En caso de finalizar el turno escribe tus obsevaciones para
                futuras citas
              </p>
              <textarea
                className="textarea rounded-md w-3/4"
                placeholder="Observaciones"
                name="reporte"
                value={form?.reporte || ""}
                onChange={handleInputChange}
              ></textarea>
              <button
                type="button"
                className="btn btn-error"
                onClick={() => {
                  deleteData(), closeModal();
                }}
              >
                Eliminar
              </button>
            </>
          )}

          <button type="submit" className="btn btn-primary w-1/4">
            Guardar
          </button>
        </form>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default TurnoModal;
