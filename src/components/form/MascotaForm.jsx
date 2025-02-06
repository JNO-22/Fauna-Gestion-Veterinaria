import usefetchData from "@hooks/useFetchData";
import usePostData from "@hooks/usePostData";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const MascotaForm = (newMascot) => {
  usefetchData("cliente");
  const navigate = useNavigate();
  const selectedMascota = useSelector((state) => state.mascota.selectedMascota);
  const clientesList = useSelector((state) => state.cliente.items);
  const [form, setForm] = useState(newMascot === true ? {} : selectedMascota);
  const { postDataResponse, postData } = usePostData(
    "mascota",
    form,
    form?._id || null
  );

  useEffect(() => {
    if (selectedMascota) {
      setForm(selectedMascota);
    }
    if (postDataResponse) {
      setForm({});
    }
  }, [selectedMascota]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name === "cliente") {
      const selectedClient = clientesList.find(
        (client) => client._id === value
      );
      setForm((prevForm) => ({
        ...prevForm,
        cliente: selectedClient,
      }));
      return;
    }

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    postData();
    navigate("/mascotas");
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 flex-1">
      <input
        type="text"
        placeholder="Nombre"
        name="nombre"
        value={form?.nombre || ""}
        className="input input-ghost FormTitle input-xl placeholder:text-3xl"
        onChange={handleFormChange}
        required
      />
      <div className="flex flex-col md:flex-row flex-wrap gap-4">
        <select
          name="cliente"
          value={form?.cliente?._id || ""}
          className="select select-ghost md:w-1/2"
          disabled={selectedMascota?.cliente?._id ? true : false}
          onChange={handleFormChange}
          required
        >
          <option disabled value="">
            Cliente
          </option>
          {clientesList?.map((client) => (
            <option key={client._id} value={client._id}>
              {client.nombre}
            </option>
          ))}
        </select>
        <div className="flex flex-col md:flex-row md:flex-1">
          <label className="input sm:input-lg validator input-ghost">
            <p className="label">Edad</p>
            <input
              type="text"
              placeholder="20"
              name="edad"
              value={form?.edad || ""}
              pattern="[0-9]+$"
              maxLength={2}
              onChange={handleFormChange}
              required
            />
          </label>
          <div className="validator-hint hidden text-center">
            Introduce una edad real (2 dígitos)
          </div>
        </div>
        <div className="flex flex-col md:w-1/2">
          <label className="input sm:input-lg validator input-ghost">
            <p className="label">Especie</p>
            <input
              type="text"
              placeholder="Canis familiaris"
              name="especie"
              value={form?.especie || ""}
              pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü ]+$"
              onChange={handleFormChange}
              required
            />
          </label>
          <div className="validator-hint hidden text-center">
            Introduce una especie valida
          </div>
        </div>
        <div className="flex flex-col md:flex-1">
          <label className="input sm:input-lg validator input-ghost">
            <p className="label">Raza</p>
            <input
              type="text"
              placeholder="Golden Retriever"
              name="raza"
              value={form?.raza || ""}
              pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü ]+$"
              onChange={handleFormChange}
              required
            />
          </label>
          <div className="validator-hint hidden text-center">
            Introduce una raza valida
          </div>
        </div>
      </div>
      <div className="flex flex-col self-center w-1/2">
        <button type="submit" className="btn btn-info btn-xl btn-wide">
          Guardar
        </button>
      </div>
    </form>
  );
};

export default MascotaForm;
