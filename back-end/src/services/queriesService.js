const Sequelize = require('sequelize');
const { StatusCodes } = require('http-status-codes');
const config = require('../database/config/config');
const { Query, PaymentInstallment } = require('../database/models');
const objectError = require('../utils/objectError');

const sequelize = new Sequelize(config.development);

const getQueriesByUser = async (id) => {
  const queries = await Query.findAll({ where: { userId: id } });

  return queries;
};

const deleteQueriesByUser = async (id) => {
  await Query.destroy({ where: { userId: id } });
};

const createQueries = async (params) => {
  try {
    const { dates, installmentsPrice, id, ...Params } = params;

    return await sequelize.transaction(async (t) => {
      const queries = await Query.create({
        ...Params, date: new Date(), userId: id,
      }, { transaction: t });

      await PaymentInstallment.bulkCreate(
        dates.map((e) => ({
          queryId: queries.id, userId: id, installmentsPrice, date: e, status: false,
        })), { transaction: t },
      );

      return queries; 
    });
  } catch (error) {
    console.log(error);
    throw objectError(StatusCodes.BAD_REQUEST, 'Error making the queries. Try again later');
  }
};

module.exports = {
  getQueriesByUser,
  deleteQueriesByUser,
  createQueries,
};