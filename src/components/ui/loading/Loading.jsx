import { useSelector } from "react-redux";
const Loading = () => {
  const loading = useSelector((state) => state.uiState.isLoading);

  if (!loading) return null;

  return (
    <div className="flex absolute top-0 left-1/2 bottom-0 items-center justify-center">
      <span className="loading loading-ball loading-md text-green-400"></span>
      <span className="loading loading-ball loading-lg text-red-400"></span>
      <span className="loading loading-ball loading-xl text-blue-400"></span>
    </div>
  );
};

export default Loading;
