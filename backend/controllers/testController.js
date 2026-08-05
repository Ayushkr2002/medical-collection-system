const Test = require("../models/Test");

// CREATE TEST
const createTest = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      description,
      includedTests,
      reportTime,
      offer,
      popular,
    } = req.body;

    const exists = await Test.findOne({ name });

    if (exists) {
      return res.status(400).json({
        message: "Test already exists",
      });
    }

    const test = await Test.create({
      name,
      price,
      category,
      description,
      includedTests,
      reportTime,
      offer,
      popular,
    });

    res.status(201).json(test);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL TESTS
const getTests = async (req, res) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.search) {
      filter.name = {
        $regex: req.query.search,
        $options: "i",
      };
    }

    const tests = await Test.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE TEST
const getSingleTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({
        message: "Test not found",
      });
    }

    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE TEST
const updateTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({
        message: "Test not found",
      });
    }

    Object.assign(test, req.body);

    await test.save();

    res.status(200).json({
      message: "Test updated successfully",
      test,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE TEST
const deleteTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({
        message: "Test not found",
      });
    }

    await test.deleteOne();

    res.status(200).json({
      message: "Test deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTest,
  getTests,
  getSingleTest,
  updateTest,
  deleteTest,
};