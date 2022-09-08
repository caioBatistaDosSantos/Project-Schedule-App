module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('payment_installments',
      [
        {
          id: 1,
          userId: 1,
          queryId: 1,
          installmentsPrice: 150,
          date: new Date('2022-10-02T19:58:00.000Z'),
          status: false,
        },
        {
          id: 2,
          userId: 1,
          queryId: 2,
          installmentsPrice: 1500,
          date: new Date('2022-10-02T19:58:00.000Z'),
          status: false,
        },
        {
          id: 3,
          userId: 1,
          queryId: 3,
          installmentsPrice: 1000,
          date: new Date('2022-10-02T19:58:00.000Z'),
          status: false,
        },
        {
          id: 4,
          userId: 1,
          queryId: 3,
          installmentsPrice: 1000,
          date: new Date('2022-11-02T19:58:00.000Z'),
          status: false,
        },
        {
          id: 5,
          userId: 1,
          queryId: 3,
          installmentsPrice: 1000,
          date: new Date('2022-12-02T19:58:00.000Z'),
          status: false,
        },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('payment_installments', null, {});
  },
};