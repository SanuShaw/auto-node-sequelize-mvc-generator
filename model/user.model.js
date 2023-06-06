
const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    
    const User = sequelize.define("USER", {
        column1: {
            type: Sequelize.DATATYPE        //DATATYPE can be STRING or NUMBER or Boolean
        },
        column2: {
            type: Sequelize.DATATYPE
        },
        // Add more columns here as needed

    });

    return User;
};

// The sequelize object represents the Sequelize instance, which should be previously configured to connect to your database.
// In the index.js file of the model folder, you can import and initialize the models using the following syntax:
// db.User = require("./user.model.js")(sequelize);

