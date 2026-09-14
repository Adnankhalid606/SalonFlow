import { useAuth } from "../hooks/useAuth";

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 shadow-sm">
      {/* Brand / Logo */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-600 text-white font-bold text-lg shadow-sm">
          SB
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">Saloon Bar</h1>
          <p className="text-xs text-gray-500 hidden sm:block">Management System</p>
        </div>
      </div>

      {/* User Info & Actions */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm ring-2 ring-indigo-50">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold text-gray-800 leading-tight">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-500 capitalize">{user?.role || "Staff"}</p>
          </div>
        </div>

        <div className="h-6 w-px bg-gray-200" />

        {/* Logout Button */}
        <button
          onClick={logout}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium text-red-600 hover:text-white bg-red-50 hover:bg-red-600 rounded-lg border border-red-200 hover:border-transparent transition-all duration-150 cursor-pointer shadow-xs"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
