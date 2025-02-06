const formatDate = (date) => {
  const options = {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return new Date(date).toLocaleDateString("es-ES", options);
};

function formatDateInput(date) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  // Convertimos la fecha a un objeto Date
  const local = new Date(date).toLocaleString("es-ES", options);

  // Separamos la fecha y la hora
  const [datePart, timePart] = local.split(", ");
  const [day, month, year] = datePart.split("/");
  const [hour, minute] = timePart.split(":");

  // Creamos la fecha en formato ISO usada en el datetime
  const isoFormattedString = `${year}-${month}-${day}T${hour}:${minute}`;

  return isoFormattedString;
}

export { formatDate, formatDateInput };
