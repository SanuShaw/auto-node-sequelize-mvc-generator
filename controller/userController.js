
const User = require('../model/User.model.js');

class UserController {
  static async create(req, res) {
    try {
      const { ...data } = req.body;
      const result = await User.create({ ...data });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const result = await User.findAll();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await User.find(id);
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
      const [updatedCount, updatedRows] = await User.update(
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
      const deletedCount = await User.destroy({ where: { id } });
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

module.exports = UserController;
