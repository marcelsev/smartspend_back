module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Expenses', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        amount: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        exp_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        location: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        note: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        CategoryId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Categories', // Nombre de la tabla de la categoría
            key: 'id', // Clave primaria de la tabla de la categoría
          },
          allowNull: true, // Cambia a false si deseas que el campo sea obligatorio
          onUpdate: 'CASCADE', // Actualizar automáticamente el campo si cambia la categoría
          onDelete: 'SET NULL', // Establecer el campo en nulo si se elimina la categoría
        },
        Method_payId: {
            type : Sequelize.INTEGER,
            references: {
                model: 'Method_pays',
                key: 'id',
            },
            allowNull: true,
            onUpdate: 'CASCADE', 
            onDelete: 'SET NULL',
        },
        UserId: {
            type : Sequelize.INTEGER,
            references: {
                model: 'Users',
                key: 'id',
            },
            allowNull: true,
            onUpdate: 'CASCADE', 
            onDelete: 'SET NULL',
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Expenses');
    }
  };
  