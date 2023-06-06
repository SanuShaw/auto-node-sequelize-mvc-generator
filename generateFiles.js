const fs = require('fs');

function generateModelFile(modelName) {
    const capitalizedModelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const modelContent = `
const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    
    const ${capitalizedModelName} = sequelize.define("${modelName.toUpperCase()}", {
        column1: {
            type: Sequelize.DATATYPE        //DATATYPE can be STRING or NUMBER or Boolean
        },
        column2: {
            type: Sequelize.DATATYPE
        },
        // Add more columns here as needed

    });

    return ${capitalizedModelName};
};

// The sequelize object represents the Sequelize instance, which should be previously configured to connect to your database.
// In the index.js file of the model folder, you can import and initialize the models using the following syntax:
// db.${capitalizedModelName} = require("./${modelName.toLowerCase()}.model.js")(sequelize);

`;
    // Create the model directory if it doesn't exist
    if (!fs.existsSync('./model')) {
        fs.mkdirSync('./model');
    }
    fs.writeFileSync(`./model/${modelName.toLowerCase()}.model.js`, modelContent);
}


// ------------
function generateControllerFile(modelName) {
    const capitalizedModelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);

    const controllerContent = `
const ${capitalizedModelName} = require('../model/${modelName}.model.js');

class ${capitalizedModelName}Controller {
  static async create(req, res) {
    try {
      const { ...data } = req.body;
      const result = await ${capitalizedModelName}.create({ ...data });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const result = await ${capitalizedModelName}.findAll();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await ${capitalizedModelName}.find(id);
      if (!result) {
        res.status(404).json({ error: 'Record not found' });
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { ...data } = req.body;
      const [updatedCount, updatedRows] = await ${capitalizedModelName}.update(
        { ...data },
        { where: { id } }
      );
      if (updatedCount === 0) {
        res.status(404).json({ error: 'Record not found' });
      } else {
        res.status(200).json(updatedRows[0]);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedCount = await ${capitalizedModelName}.destroy({ where: { id } });
      if (deletedCount === 0) {
        res.status(404).json({ error: 'Record not found' });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ${capitalizedModelName}Controller;
`;

    // Create the controller directory if it doesn't exist
    if (!fs.existsSync('./controller')) {
        fs.mkdirSync('./controller');
    }
    fs.writeFileSync(`./controller/${modelName.toLowerCase()}Controller.js`, controllerContent);
}




// Example usage: node generateFiles.js User
const modelName = process.argv[2];

if (!modelName) {
    console.error('Please provide a model name as an argument.');
    process.exit(1);
}

generateModelFile(modelName);
generateControllerFile(modelName);

console.log(`Files generated successfully for ${modelName}.`);