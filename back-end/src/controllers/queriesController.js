const { StatusCodes } = require('http-status-codes');
const queriesService = require('../services/queriesService');

const getQueriesByUser = async (req, res, next) => {
  try {
    const { data: { id } } = req.user;

    const queries = await queriesService.getQueriesByUser(id);

    return res.status(StatusCodes.OK).json({ queries });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteQueriesByUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    await queriesService.deleteQueriesByUser(id);

    return res.status(StatusCodes.OK).json({ message: 'Query deleted successfully' });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createQueries = async (req, res, next) => {
  try {
    const { data: { id } } = req.user;

    const queries = await queriesService.createQueries({ id, ...req.body });

    return res.status(StatusCodes.OK).json(queries);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getQueriesByUser,
  deleteQueriesByUser,
  createQueries,
};