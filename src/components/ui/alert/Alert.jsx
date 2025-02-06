import { BiError, BiCheck } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { clearAlert } from "@store/uiStateSlice";
const Alert = () => {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.uiState.Alert);
  if (!message) return null;

  if (type === "success") {
    setTimeout(() => {
      dispatch(clearAlert());
    }, 6000);
  }

  const handleClose = () => dispatch(clearAlert());

  return (
    <div
      role="alert"
      className={`alert ${
        type === "error" ? "alert-error" : "alert-success"
      } gap-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 px-8 py-4 m-auto`}
    >
      {type === "error" ? (
        <>
          <BiError className="text-3xl text-red-800 animate-pulse" />
          <span className="text-md font-bold">{message}</span>
        </>
      ) : (
        <>
          <BiCheck className="text-3xl text-green-800 animate-pulse" />
          <span className="text-md font-medium">{message}</span>
        </>
      )}

      <button onClick={handleClose} className="btn btn-sm btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default Alert;
