module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('queries',
      [
        {
          id: 1,
          userId: 1,
          patientsName: 'Paciente João',
          descripition: 'Consulta',
          totalPrice: 150,
          date: new Date('2022-09-02T19:58:00.000Z'),
          optionPayment: 'À vista',
          methodPayment: 'Dinheiro',
        },
        {
          id: 2,
          userId: 1,
          patientsName: 'Paciente Anna',
          descripition: 'extração de siso',
          totalPrice: 1500,
          date: new Date('2022-09-02T19:58:00.000Z'),
          optionPayment: 'À vista',
          methodPayment: 'Débito',
        },
        {
          id: 3,
          userId: 1,
          patientsName: 'Paciente Pedro',
          descripition: 'gengivectomia',
          totalPrice: 3000,
          date: new Date('2022-09-02T19:58:00.000Z'),
          optionPayment: 'Parcelado',
          methodPayment: 'Crédito',
        },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('queries', null, {});
  },
};