import { useNavigate } from "react-router-dom";

function EmployeeCard({employee, onDelete}) {
    let salaryMethod = "Not updated"
    if(employee.salary){
    if(employee.salary.method == "fixed") salaryMethod = "Fixed Salary";
    if(employee.salary.method == "percentage") salaryMethod = "Commission Only";
    if(employee.salary.method == "hybrid") salaryMethod = "Basic + Commission";
    }
    const navigate = useNavigate();
   return (
    <div className="w-full max-w-sm mx-auto overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700" >
      <div className="p-6 text-center">
        <div className="relative inline-block">
          <img
            className="w-24 h-24 mx-auto rounded-full object-cover ring-4 ring-indigo-50 dark:ring-gray-700"
            src= "https://placehold.co/200"
            alt=""
          />
        </div>

        <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
          {employee?.name}
        </h3>
        <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
          Staff
        </p>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {employee.phone}
        </p>

        <div className="flex flex-wrap justify-center gap-1.5 mt-4">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
           {salaryMethod}
          </span>
         {
            employee.isActive? (
                 <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            Active
          </span>
            ):
            (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            Inactive    
          </span>
            )
         }
        </div>
      </div>

      <div className="flex border-t border-gray-200 bg-gray-50 dark:bg-gray-700/50 dark:border-gray-700">
        <button
          type="button"
          className="inline-flex items-center justify-center w-1/2 px-4 py-3 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 transition-colors border-r border-gray-200 dark:border-gray-700 gap-2"
          onClick={()=> navigate(`/employee/edit/${employee._id}`) }
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
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          Edit
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center w-1/2 px-4 py-3 text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-950/30 transition-colors gap-2"
          onClick={()=>onDelete(employee._id)}
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
}
export default EmployeeCard;
