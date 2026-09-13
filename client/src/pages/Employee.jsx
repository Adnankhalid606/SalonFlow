import { useEffect, useState } from "react";
import { deleteEmployeeApi, getAllEmployeesApi } from "../api/EmployeeServices";
import dayjs from "dayjs";
import EmployeeCard from "../components/employeeCard";
function Employee() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState("");
  const [salaryMethod, setSalaryMethod] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pagination, setPagination] = useState({});
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      async function getEmployee() {
        try {
          const response = await getAllEmployeesApi({
            search: search,
            isActive: isActive,
            salaryMethod: salaryMethod,
            sort: sort,
            sortOrder: sortOrder,
            page: page,
            limit: limit,
          });
          setEmployees(response?.data?.data);
          setPagination(response?.data?.pagination);
        } catch (error) {
          setError(error?.response?.data?.message);
        } finally {
          setLoading(false);
        }
      }
      getEmployee();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search, isActive, salaryMethod, sort, sortOrder, limit, page]);

  const pages = Array.from(
    { length: pagination?.totalPages },
    (_, index) => index + 1,
  );
  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center h-screen">
          <p>Loading...</p>
        </div>
      </>
    );
  }
  async function deleteEmployee(id){
    try{
      const response = await deleteEmployeeApi(id);
      alert(response?.data?.message)
      setEmployees((currentEmployee)=>currentEmployee.filter((employee)=> employee._id !== id))
    } catch(error){
      setError(error?.response?.data?.message || "Failed to delete employee")
    }
  }
    console.log(employees)
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Employees</h1>
      <div className="flex gap-4">
        <input
          type="text"
          className="mb-6 border p-3"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="mb-6 border p-3"
          value={isActive}
          onChange={(e) => {
            setIsActive(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All</option>
          <option value={"true"}>Active</option>
          <option value={"false"}>Inactive</option>
        </select>
        <select
          className="mb-6 border p-3"
          value={salaryMethod}
          onChange={(e) => {
            setSalaryMethod(e.target.value);
            setPage(1);
          }}
        >
          <option value="">Sort By Salary Method</option>
          <option value={"fixed"}>Fixed</option>
          <option value={"percentage"}>Percentage</option>
          <option value={"hybrid"}>Hybrid</option>
        </select>

        <select
          className="mb-6 border p-3"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="phone">Phone</option>
          <option value="salary">Salary</option>
          <option value="joinedDate">Joined Date</option>
        </select>

        <select
          className="mb-6 border p-3"
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setPage(1);
          }}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <select
          className="mb-7 border p-3"
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className="grid grid-cols-4 gap-5 justify-items-center">
      {
        employees.map((emp)=>(<EmployeeCard employee={emp} key={emp._id} onDelete={deleteEmployee} />))
      }
      </div>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <p>{error}</p>
        </div>
      )}
      <div className="flex justify-center mt-3">
        <button
          className="m-1 p-2 border rounded-lg"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Pervious
        </button>
        {pages &&
          pages.length > 0 &&
          pages.map((p) => (
              <button
                className={`m-1 p-2 border rounded-lg ${p === page ? "bg-blue-500 text-white" : ""}`}
                key={p}
                onClick={() => setPage(p)}
              >
                {p}
              </button>

          ))}
        <button
          className="m-1 p-2 border rounded-lg"
          onClick={() => setPage(page + 1)}
          disabled={page === pagination?.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Employee;
