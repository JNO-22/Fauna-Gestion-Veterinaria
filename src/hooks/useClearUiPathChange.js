import { useEffect } from "react";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { clearAlert, setLoading } from "@store/uiStateSlice";

const useClearAlertOnPathChange = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(clearAlert());
    dispatch(setLoading(false));
  }, [location.pathname, dispatch]);
};

export default useClearAlertOnPathChange;
