import service from "../models/serviceModels.js";

export const createService = async (req, res, next) => {
  try {
    const { name, price } = req.body;
    const panel_id = req.user.panel_id;
    const response = await service.create({ name, price, panel_id });
    res.status(201).json({
      status: true,
      message: "Service created successfully.",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const getServiceById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await service.findOne({
      _id: id,
      panel_id: req.user.panel_id,
    });
    if (!response) {
      return res.status(404).json({ message: "Service not found." });
    }
    res.status(200).json({
      status: true,
      message: "Service fetched successfully.",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllServices = async (req, res, next) => {
  try {
    const { page, limit, sortOrder, sort, search } = req.query;
    const filter = {};
    let sortOptions = {};
    //Pagination
    let pageNumber = 1;
    let limitNumber = 10;
    if (page) {
      pageNumber = page
    }
    if (limit) {
      limitNumber = limit
    }
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }
    if (sort) {
      if (sortOrder === "desc") {
        sortOptions[sort] = -1;
      } else {
        sortOptions[sort] = 1;
      }
    }
    const skip = (pageNumber - 1) * limitNumber;
    const services = await service
      .find({ ...filter, panel_id: req.user.panel_id })
      .skip(skip)
      .limit(limitNumber)
      .sort(sortOptions);
    if (services.length === 0) {
      return res.status(404).json({ message: "No services found." });
    }
    const serviceCount = await service.countDocuments({
      ...filter,
      panel_id: req.user.panel_id,
    });
    const pages = Math.ceil(serviceCount / limitNumber);
    res.status(200).json({
      status: true,
      message: "Services fetched successfully.",
      pagination: {
        serviceCount: serviceCount,
        currentData: services.length,
        totalPages: pages,
        currentPage: pageNumber,
      },
      data: services,
    });
  } catch (err) {
    next(err);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, price } = req.body;
    if (name === undefined && price === undefined) {
      return res.status(400).json({ message: "Please add one field atleast." });
    }
    const response = await service.findOne({
      _id: id,
      panel_id: req.user.panel_id,
    });
    if (!response) {
      return res.status(404).json({ message: "Service not found." });
    }
    const updateService = await service.findOneAndUpdate(
      { _id: id, panel_id: req.user.panel_id },
      {
        $set: {
          name: name ?? response.name,
          price: price ?? response.price,
        },
      },
      { runValidators: true, returnDocument: "after" },
    );
    res.status(200).json({
      status: true,
      message: "Service updated successfully.",
      data: updateService,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteService = async (req,res,next)=>{
    try{
        const id = req.params.id;
        const response = await service.findOne({
            _id : id,
            panel_id : req.user.panel_id
        })
        if(!response){
            return res.status(404).json({message : "Service not found."})
        }
        const deleteService = await service.deleteOne({
            _id : id,
            panel_id : req.user.panel_id
        })
        res.status(200).json({
            status : true,
            message : "Service deleted successfully.",
            data : deleteService
        })
    }
    catch(err){
        next(err)
    }
}