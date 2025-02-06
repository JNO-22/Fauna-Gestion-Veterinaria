import { useState, useEffect } from "react";

// Componente ClienteSelect
const ClienteSelect = ({ value, onChange, clientesAvailables, disabled }) => (
  <select
    className="select w-full"
    value={value || ""}
    onChange={onChange}
    disabled={disabled}
    required
  >
    <option value="" disabled>
      Cliente
    </option>
    {clientesAvailables.map((clientOption) => (
      <option key={clientOption._id} value={clientOption._id}>
        {clientOption.nombre}
      </option>
    ))}
  </select>
);

// Componente MascotaSelect
const MascotaSelect = ({
  value,
  onChange,
  mascotasAvailables,
  disabled,
  cliente,
}) => {
  const [filteredMascotas, setFilteredMascotas] = useState([]);

  useEffect(() => {
    setFilteredMascotas(
      mascotasAvailables.filter((mascota) => mascota?.cliente?._id === cliente)
    );
  }, [mascotasAvailables, cliente]);

  return (
    <select
      className="select w-full"
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      required
    >
      <option value="" disabled>
        Mascota
      </option>
      {filteredMascotas.map((mascota) => (
        <option key={mascota._id} value={mascota._id}>
          {mascota.nombre}
        </option>
      ))}
    </select>
  );
};

export { ClienteSelect, MascotaSelect };
