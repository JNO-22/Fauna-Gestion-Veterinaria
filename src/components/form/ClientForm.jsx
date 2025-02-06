import { useEffect, useState } from "react";
import {
  IoMailOutline,
  IoPersonOutline,
  IoPhonePortraitSharp,
} from "react-icons/io5";
import { useSelector } from "react-redux";
import usePostData from "@hooks/usePostData";
import { useNavigate } from "react-router";
const ClientForm = (newClient) => {
  let redirect = useNavigate();
  const { loading } = useSelector((state) => state.uiState.isLoading);
  const initialClient = useSelector((state) => state.cliente.selectedClient);

  const [client, setClient] = useState(newClient === true ? {} : initialClient);
  const { postDataResponse, postData } = usePostData(
    "cliente",
    client,
    client?._id || null
  );

  useEffect(() => {
    if (initialClient) {
      setClient(initialClient);
    }
    if (postDataResponse) {
      setClient({});
    }
  }, [initialClient]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
    redirect("/clientes");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <div className="col-span-2 justify-self-center">
            <label className="input validator" htmlFor="nombre">
              <IoPersonOutline className="w-6 h-6" />
              <input
                type="input"
                id="nombre"
                name="nombre"
                required
                title="Solo letras"
                pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü ]+$"
                minLength={5}
                value={client?.nombre || ""}
                onChange={handleInputChange}
              />
            </label>
            <div className="validator-hint hidden text-center">
              Introduce un nombre valido (min 5 letras)
            </div>
          </div>

          <div className="row-start-2">
            <label className="input validator" htmlFor="email">
              <IoMailOutline className="w-6 h-6" />
              <input
                type="email"
                id="email"
                name="email"
                required
                value={client?.email || ""}
                onChange={handleInputChange}
              />
            </label>
            <div className="validator-hint hidden text-center">
              Introduce un mail valido
            </div>
          </div>

          <div className="row-start-2">
            <label className="input validator" htmlFor="telefono">
              <IoPhonePortraitSharp className="w-6 h-6" />
              <input
                className="tabular-nums"
                type="text"
                id="telefono"
                name="telefono"
                required
                pattern="[0-9]{3}[0-9]{7}"
                minLength={10}
                maxLength={13}
                title="Formato XXX-XXXXXXX"
                value={client?.telefono || ""}
                onChange={handleInputChange}
              />
            </label>
            <div className="validator-hint hidden text-center">
              Introduce un telefono valido (min 10 digitos)
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-8 pt-4">
          <button
            type="submit"
            className=" btn btn-accent hover:bg-green-300 hover:text-white "
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Guardar"
            )}
          </button>
          <button
            type="reset"
            onClick={() => setClient(initialClient)}
            className=" btn text-blue-300 hover:bg-blue-300 hover:text-white  btn-outline ml-4"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;
