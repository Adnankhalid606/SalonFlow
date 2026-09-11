import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute() {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return(
    <>
      <h1 className="text-9xl">LOADING...</h1>
    </>);
  }
  if(!user){
    return <Navigate to="/login" replace />
  }

  return <Outlet/>;
}
 export default ProtectedRoute;