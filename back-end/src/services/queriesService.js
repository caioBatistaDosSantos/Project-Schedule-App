const Sequelize = require('sequelize');
const { StatusCodes } = require('http-status-codes');
const config = require('../database/config/config');
const { Query } = require('../database/models');
const objectError = require('../utils/objectError');

const sequelize = new Sequelize(config.development);

// const createSale = async (params) => {
//   try {
//     const { productIds, ...saleParams } = params;
//     return await sequelize.transaction(async (t) => {
//       const sale = await Sale.create({
//         ...saleParams, status: 'Pendente', saleDate: new Date(),
//       }, { transaction: t });

//       await SalesProduct.bulkCreate(
//         productIds.map(({ itemId: productId, itemQtd: quantity }) => ({
//           saleId: sale.id, productId, quantity,
//         })), { transaction: t },
//       );

//       return sale; 
//     });
//   } catch (error) {
//     console.log(error);
//     throw objectError(StatusCodes.BAD_REQUEST, 'Error making the sale. Try again later');
//   }
// };

// const getSaleByRole = async (userId, roleUser) => {
//   const role = roleUser === 'customer' ? 'userId' : 'sellerId';

//   const sales = await Sale.findAll({ where: { [role]: userId } });

//   return sales;
// };

// const getSaleById = async (id) => {
//   const sale = await Sale.findByPk(id,
//    { include: [
//       { model: Product, as: 'products', through: {} },
//     ],
//   });

//   if (!sale) throw objectError(StatusCodes.NOT_FOUND, 'Sale does not exist');

//   return sale;
// };

// const updateSaleById = async (id, status) => {
//   await Sale.update(
//     { status },
//     { where: { id } },
//   );
// };

const getQueriesByUser = async (id) => {
  const queries = await Query.findAll({ where: { userId: id } });

  return queries;
};

const deleteQueriesByUser = async (id) => {
  await Query.destroy({ where: { userId: id } });
};

module.exports = {
  getQueriesByUser,
  deleteQueriesByUser,
};