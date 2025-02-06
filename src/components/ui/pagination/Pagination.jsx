const Pagination = ({ offset, setOffset, pageSize, totalCount }) => {
  const hasPrevious = offset > 0;
  const hasNext = offset + pageSize < totalCount;
  const handlePrevious = () => setOffset(offset - pageSize);
  const handleNext = () => setOffset(offset + pageSize);

  return (
    <div className="join py-8">
      <button
        className="join-item btn btn-outline"
        onClick={handlePrevious}
        disabled={!hasPrevious}
      >
        {"Pagina Anterior"}
      </button>
      <button
        className="join-item btn btn-outline"
        onClick={handleNext}
        disabled={!hasNext}
      >
        {"Pagina Siguiente"}
      </button>
    </div>
  );
};

export default Pagination;
