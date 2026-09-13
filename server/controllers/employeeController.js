import Employee from "../models/employeeModel.js";

// GET ALL EMPLOYEES
export const getEmployees = async (req, res, next) => {
  try {
    const { isActive, salaryMethod, search, sort, sortOrder, limit, page } =
      req.query;
    const filter = {};
    
    let sortOptions = {};
    //PANIGATION VALIDATION
    let pageNumber = 1;
    let limitNumber = 10;
    if (page) {
      pageNumber = page;
    }
    if (limit) {
      limitNumber = limit;
    }
    const skip = (pageNumber - 1) * limitNumber;
    //PANIGATION VALIDATION ENDED

    //isActive Validation
    if (isActive) {
      filter.isActive = isActive;
    }

    //SALARY METHOD VALIDATION
    if (salaryMethod) {
      filter["salary.method"] = salaryMethod;
    }
    if (sort) {
      if (sortOrder === "desc") {
        sortOptions[sort] = -1;
      } else {
        sortOptions[sort] = 1;
      }
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }
    const dynamicFilter = {
      ...filter,
      panel_id: req.user.panel_id,
    };
    const employees = await Employee.find(dynamicFilter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNumber);
    if (employees.length === 0) {
      return res.status(404).json({ message: "No employees found." });
    }
    const totalEmployees = await Employee.countDocuments(dynamicFilter);
    const pages = Math.ceil(totalEmployees / limitNumber);
    res.status(200).json({
      status: true,
      message: "Employees fetched successfully.",
      pagination: {
        employeeCount: totalEmployees,
        currentData: employees.length,
        totalPages: pages,
        currentPage: pageNumber,
      },
      data: employees,
    });
  } catch (err) {
    next(err);
  }
};

// GET EMPLOYEE BY ID
export const getEmployeeById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const employee = await Employee.findById({
      _id: id,
      panel_id: req.user.panel_id,
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }
    res.status(200).json({
      status: true,
      message: "Employee fetched successfully.",
      data: employee,
    });
  } catch (err) {
    next(err);
  }
};
// CREATE EMPLOYEE
export const createEmployee = async (req, res, next) => {
  const { name, phone, salary, isActive } = req.body;
  if (!name || !phone || !salary) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    const employee = await Employee.create({
      name,
      phone,
      salary,
      isActive,
      panel_id: req.user.panel_id,
    });
    res.status(201).json({
      status: true,
      message: "Employee created successfully.",
      data: employee,
    });
  } catch (err) {
    next(err);
  }
};

//UPDATE EMPLOYEE BY ID
export const updateEmployee = async (req, res, next) => {
  const id = req.params.id;
  const { name, phone, salary, isActive } = req.body;
  try {
    if (
      name === undefined &&
      phone === undefined &&
      salary === undefined &&
      isActive === undefined
    ) {
      return res.status(400).json({ message: "Please add one field atleast." });
    }
    const employee = await Employee.findOne({
      _id: id,
      panel_id: req.user.panel_id,
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }
    const updateEmployee = await Employee.findOneAndUpdate(
      {_id: id, panel_id: req.user.panel_id},
      {
        $set: {
          name: name ?? employee.name,
          phone: phone ?? employee.phone,
          salary: salary ?? employee.salary,
          isActive: isActive ?? employee.isActive,
        },
      },
      {
        runValidators: true,
        returnDocument: "after",
      },
    );
    res.status(200).json({
      status: true,
      message: "Employee updated successfully.",
      data: updateEmployee,
    });
  } catch (err) {
    next(err);
  }
};

//DELETE Employee By ID
export const deleteEmployee = async (req, res, next) => {
  const id = req.params.id;
  try {
    const employee = await Employee.findById({
      _id: id,
      panel_id: req.user.panel_id,
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }
    await Employee.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Employee deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};

// ——————————————————————————————————————————————————————————————————————————————————————————

// GET ALL EMPLOYEES WITH MANUAL VALIDATION CODE
// export const getEmployees = async (req, res, next) => {
//   try {
//     const { isActive, salaryMethod, search, sort, limit, page} = req.query;
//     const filter = {};
//     const sortOptions = {};
//     //SALARY METHODS
//     let allowSalaryMethods = ["fixed", "percentage", "hybrid"];
//     //ALLOWED SORT OPTIONS
//     let allowSortOptions = ["name", "phone", "salary", "joinedDate"];
//     //PANIGATION VALIDATION
//     let pageNumber = 1;
//     let limitNumber = 10;
//     if(page !== undefined) {
//       pageNumber = Number(page);
//       if(pageNumber < 1 || !Number.isInteger(pageNumber)){
//         return res.status(400).json({ message: "Invalid page number." });
//     }
//   }
//   if(limit !== undefined){
//     limitNumber = Number(limit);
//     if(limitNumber < 1 || !Number.isInteger(limitNumber)){
//       return res.status(400).json({ message: "Invalid limit number." });
//     }
//     if(limitNumber > 100){
//       return res.status(400).json({ message: "Limit cannot exceed 100." });
//     }
//   }

//     const skip = (pageNumber - 1) * limitNumber;
//     //PANIGATION VALIDATION ENDED

//     //isActive Validation
//     if (isActive !== undefined) {
//       if(isActive !== "true" && isActive !== "false") {
//         return res.status(400).json({ message: "Invalid isActive value." });
//       }
//       filter.isActive = isActive === "true";
//     }

//     //SALARY METHOD VALIDATION
//      if (salaryMethod !== undefined) {
//       if(!allowSalaryMethods.includes(salaryMethod)) {
//         return res.status(400).json({ message: "Invalid salary method." });
//       }
//       filter["salary.method"] = salaryMethod;
//     }

//     //SORT VALIDATION
//     if(sort !== undefined) {
//       let sortField = sort.startsWith("-") ? sort.substring(1) : sort;
//       if(!allowSortOptions.includes(sortField)) {
//         return res.status(400).json({ message: "Invalid sort option." });
//       }
//       sortOptions[sortField] = sort.startsWith("-") ? -1 : 1;

//     }

//     if(search !== undefined) {
//       if(search.trim() === "") {
//         return res.status(400).json({ message: "Search query cannot be empty." });
//       }
//       filter.name = { $regex: search, $options: "i" };
//     }
//     const employees = await Employee.find(filter).sort(sortOptions).skip(skip).limit(limitNumber);
//     if (employees.length === 0) {
//       return res.status(404).json({ message: "No employees found." });
//     }
//     const totalEmployees = await Employee.countDocuments();
//     const pages = Math.ceil(totalEmployees/limitNumber);
//     res.status(200).json({
//       status: true,
//       message: "Employees fetched successfully.",
//       panigation: {
//         employeeCount: totalEmployees,
//         currentData: employees.length,
//         totalPages: pages,
//         currentPage: pageNumber
//       },
//       data: employees,
//     });
//   } catch (err) {
//     next(err);
//   }
// };
