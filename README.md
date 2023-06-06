# AutoNodeMVC

AutoNodeMVC is a Node.js project generator that automates the creation of models and controllers for a RESTful API using Sequelize as the ORM (Object-Relational Mapping) tool and PostgreSQL as the database.

## Usage

1. Define your models:

   - Use Sequelize to define your database models in the `model/` directory. You can refer to the Sequelize documentation for more information on defining models.

2. Generate controllers:

   - Run the following command to generate the controllers for your models:

     ```bash
     node generateFiles.js <your_model_name>
     ```

     Replace `<your_model_name>` with the name of your model. This command will automatically create the model file in the `model/` directory and the controller file in the `controller/` directory based on your input.

3. Customize files:

   - Open the generated model file in the `model/` directory and add any additional properties or configuration specific to your model.
   - Open the generated controller file in the `controller/` directory and add your specific business logic and API endpoints as needed.
