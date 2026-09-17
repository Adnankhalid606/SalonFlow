import Employee from "../models/employeeModel.js";
import service from "../models/serviceModels.js";
import Transaction from "../models/transactionModel.js";

export const getAllTransactions = async (req, res, next) => {
  try {
    const {
      page,
      limit,
      search,
      sort,
      sortOrder,
      processed,
      performedBy,
      employee_id,
      service_id,
    } = req.query;

    const filter = {
      panel_id: req.user.panel_id,
    };

    let pageNumber = 1;
    let limitNumber = 10;
    let sortOptions = {};

    // -------------------------
    // Pagination
    // -------------------------

    if (page) {
      pageNumber = Number(page);
    }

    if (limit) {
      limitNumber = Number(limit);
    }

    const skip = (pageNumber - 1) * limitNumber;

    // -------------------------
    // Processed filter
    // -------------------------

    if (processed !== undefined && processed !== "") {
      filter.processed = processed === "true";
    }

    // -------------------------
    // Performed By filter
    // -------------------------

    if (performedBy) {
      filter.performedBy = performedBy;
    }

    // -------------------------
    // Employee filter
    // -------------------------

    if (employee_id) {
      filter.employee_id = employee_id;
    }

    // -------------------------
    // Service filter
    // -------------------------

    if (service_id) {
      filter.service_id = service_id;
    }

    // -------------------------
    // Search
    // -------------------------

    if (search) {
      const employees = await Employee.find({
        name: { $regex: search, $options: "i" },
        panel_id: req.user.panel_id,
      }).select("_id");

      const services = await service
        .find({
          name: { $regex: search, $options: "i" },
          panel_id: req.user.panel_id,
        })
        .select("_id");

      filter.$or = [
        {
          employee_id: {
            $in: employees.map((employee) => employee._id),
          },
        },
        {
          service_id: {
            $in: services.map((service) => service._id),
          },
        },
      ];
    }

    // -------------------------
    // Sorting
    // -------------------------

    if (sort) {
      sortOptions[sort] = sortOrder === "desc" ? -1 : 1;
    } else {
      sortOptions.createdAt = -1;
    }

    // -------------------------
    // Get transactions
    // -------------------------

    const transactions = await Transaction.find(filter)
      .populate("employee_id", "name phone")
      .populate("service_id", "name price")
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNumber);

    // -------------------------
    // Count
    // -------------------------

    const transactionCount = await Transaction.countDocuments(filter);

    const totalPages = Math.ceil(transactionCount / limitNumber);

    // -------------------------
    // Response
    // -------------------------

    res.status(200).json({
      success: true,
      message: "Transactions fetched successfully.",
      pagination: {
        transactionCount,
        currentData: transactions.length,
        totalPages,
        currentPage: pageNumber,
      },
      data: transactions,
    });
  } catch (err) {
    next(err);
  }
};

export const createTransaction = async (req, res, next) => {
  try {
    const { performedBy, employee_id, service_id, quantity } = req.body;
    let employee = null;
    if (performedBy === "employee") {
      employee = await Employee.findOne({
        _id: employee_id,
        panel_id: req.user.panel_id,
        isActive: true,
      });

      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }
    }

    const service_data = await service.findOne({
      _id: service_id,
      panel_id: req.user.panel_id,
    });

    if (!service_data) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }
    let employeeEarning = 0;
    let employeePercentage = 0;
    const totalAmount = quantity * service_data.price;
    if (
      performedBy === "employee" &&
      (employee.salary.method === "percentage" ||
        employee.salary.method === "hybrid")
    ) {
      employeePercentage = employee.salary.percentage;
      employeeEarning = Math.round(
        (totalAmount * employee.salary.percentage) / 100,
      );
    }

    const ownerEarning = totalAmount - employeeEarning;

    const transaction = await Transaction.create({
      panel_id: req.user.panel_id,
      performedBy,
      employee_id,
      service_id,
      quantity,
      unitPrice: service_data.price,
      totalAmount,
      employeePercentage,
      employeeEarning,
      ownerEarning,
    });

    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    next(err);
  }
};

export const updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { processed } = req.body;

    const transaction = await Transaction.findOne({
      _id: id,
      panel_id: req.user.panel_id,
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found.",
      });
    }

    if (processed === true) {
      transaction.processed = true;
      transaction.processedAt = new Date();
    }

    if (processed === false) {
      transaction.processed = false;
      transaction.processedAt = null;
    }

    await transaction.save();

    res.status(200).json({
      success: true,
      message: "Transaction updated successfully.",
      data: transaction,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOne({
      _id: id,
      panel_id: req.user.panel_id,
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found.",
      });
    }
    if (transaction.processed) {
      return res.status(400).json({
        success: false,
        message: "Processed transactions cannot be deleted.",
      });
    }

    const deletedTransaction = await Transaction.deleteOne({
      _id: id,
      panel_id: req.user.panel_id,
    });

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully.",
      data: deletedTransaction,
    });
  } catch (err) {
    next(err);
  }
};
