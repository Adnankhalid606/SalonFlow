import { Link,  Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function AppLayout() {
  const {user, logout}= useAuth();
  return (
    <>
      <nav className="flex justify-between items-center h-16 border-b bg-blue-200">
        <div className="px-5">
          <h1 className="text-2xl font-black ">Saloon Bar</h1>
        </div>
        <div className="flex gap-5 h-full pr-5">
            <Link to={'/'} className="flex items-center px-4 hover:bg-blue-300 transition-colors">Dashboard</Link>
            <Link to={'/employee'} className="flex items-center px-4 hover:bg-blue-300 transition-colors">Employee</Link>
            <Link to={'/employee/create'} className="flex items-center px-4 hover:bg-blue-300 transition-colors">Create Employee</Link>
            <p className="flex items-center px-4 bg-red-500">Hi {user.name} </p>
            <button onClick={logout}
            className="self-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition duration-150 ease-in-out shadow-sm cursor-pointer "
            >Logout</button>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default AppLayout;
