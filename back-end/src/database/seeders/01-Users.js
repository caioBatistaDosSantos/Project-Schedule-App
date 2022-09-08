module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('users',
      [
        {
          id: 1,
          name: 'Caio Santos',
          email: 'caio@santos.com',
          password: 'e10adc3949ba59abbe56e057f20f883e',
            // 123456
        },
        {
          id: 2,
          name: 'example user 1',
          email: 'example1@user.com',
          password: 'e10adc3949ba59abbe56e057f20f883e',
            // 123456
        },
        {
          id: 3,
          name: 'example user 2',
          email: 'example2@email.com',
          password: 'e10adc3949ba59abbe56e057f20f883e',
            // 123456
        },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};