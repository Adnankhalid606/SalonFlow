import { useEffect, useState } from "react";
import { getAllServicesApi, deleteServiceApi } from "../api/serviceServices";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      async function fetchServices() {
        try {
          setLoading(true);
          setError("");
          const response = await getAllServicesApi({
            search: search,
            page: page,
            limit: limit,
            sort: sort,
            sortOrder: sortOrder,
          });
          setServices(response?.data?.data);
          setPagination(response?.data?.pagination);
        } catch (err) {
          setError(err?.response?.data?.message || "Error fetching services");
        } finally {
          setLoading(false);
        }
      }
      fetchServices();
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [search, page, limit, sort, sortOrder]);

  if (loading) {
    return <p>Loading...</p>;
  }
  const pages = Array.from(
    { length: pagination.totalPages },
    (_, index) => index + 1,
  );
  async function handleDelete(id, name) {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      setDeletingId(id);
      const response = await deleteServiceApi(id);
      if (response?.data?.status) {
        toast.success(response?.data?.message);
        setServices((prev) => prev.filter((s) => s._id !== id));
      } else {
        toast.error(
          response?.response?.data?.message ||
            response?.message ||
            "Failed to delete service",
        );
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete service");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <ToastContainer />
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Services
            </h1>
            {!loading && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                {services.length}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Browse and manage all salon services, pricing, and offerings.
          </p>
        </div>
        {/* Sort */}
        <div className="flex gap-2">
          <select
            className="border border-gray-400 rounded-md p-2"
            value={`${sort}:${sortOrder}`}
            onChange={(e) => {
              if (e.target.value === "") {
                setSort("");
                setSortOrder("asc");
                return;
              }
              const [sort, sortOrder] = e.target.value.split(":");
              setSort(sort);
              setSortOrder(sortOrder);
            }}
          >
            <option value=""> Sort by : Default</option>
            <option value="name:asc">Name: A-Z</option>
            <option value="name:desc">Name: Z-A</option>
            <option value="price:asc">Price: Low to High</option>
            <option value="price:desc">Price: High to Low</option>
          </select>
          <select
            onChange={(e) => {
              setLimit(Number(e.target.value))
            }}
            value={limit}
            >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="flex gap-3 ">
          {/* search bar */}
          <div className="flex gap-2">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                className="border border-gray-400 rounded-md p-2"
                type="text"
                placeholder="Search services"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
              />
              <button
                onClick={() => setSearch(inputValue)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5   text-indigo-600 text-sm font-medium rounded-xl  transition-colors cursor-pointer shrink-0 hover:text-white hover:bg-indigo-600"
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
          </div>
          <button
            onClick={() => navigate("/service/create")}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Service
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 text-red-500 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
          <button
            onClick={fetchServices}
            className="text-xs font-semibold text-red-700 hover:text-red-900 underline cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading Skeleton Grid */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs animate-pulse space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 bg-gray-200 rounded-xl" />
                <div className="w-16 h-6 bg-gray-200 rounded-full" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded-md w-3/4" />
                <div className="h-3 bg-gray-200 rounded-md w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && services?.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300 p-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 mx-auto flex items-center justify-center mb-3">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-gray-900">
            No services found
          </h3>
          <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
            Get started by adding your first salon service to the menu.
          </p>
          <button
            onClick={() => navigate("/service/create")}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl shadow-xs transition-colors cursor-pointer"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Service
          </button>
        </div>
      )}

      {/* Services Cards Grid */}
      {!loading && !error && services?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <div
              key={service._id}
              className="group bg-white rounded-2xl border border-gray-200 p-5 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Card Top: Icon & Price */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"
                      />
                    </svg>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Rs {Number(service.price).toLocaleString()}
                  </span>
                </div>

                {/* Service Name */}
                <h3 className="text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors capitalize">
                  {service.name}
                </h3>
              </div>

              {/* Card Footer: Actions */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-3 justify-end text-xs text-gray-400">
                <button
                  onClick={() => navigate(`/service/edit/${service._id}`)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 rounded-lg border border-blue-100 hover:border-transparent transition-colors cursor-pointer"
                  type="button"
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id, service.name)}
                  disabled={deletingId === service._id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-red-600 hover:text-white bg-red-50 hover:bg-red-600 rounded-lg border border-red-100 hover:border-transparent transition-colors cursor-pointer disabled:opacity-50"
                  title="Delete Service"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  {deletingId === service._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center items-center gap-3 mt-5">
        <button
          className={`border p-2 rounded-lg ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        {pages &&
          pages.length > 0 &&
          pages.map((p) => (
            <button
              key={p}
              className={`px-4 py-2 border border-gray-300 rounded-md ${p === pagination.currentPage ? "bg-blue-600 text-white" : ""}`}
              disabled={p === pagination.currentPage}
              onClick={() => {
                setPage(p);
              }}
            >
              {p}
            </button>
          ))}
        <button
          className={`border p-2 rounded-lg ${page === pagination.totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => setPage(page + 1)}
          disabled={page === pagination.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Services;
