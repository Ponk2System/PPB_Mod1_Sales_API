import { CustomerModel } from "../models/customerModel.js";

// Helper fungsi validasi (menggunakan throw Error)
const validateCustomerInput = (data) => {
  if (!data.email || !data.email.includes("@")) {
    throw new Error("Email wajib memiliki karakter @");
  }
  if (!data.phone || data.phone.length < 10) {
    throw new Error("Phone (nomor telepon) harus diisi minimal 10 karakter");
  }
};

export const CustomerController = {
  async getAll(req, res) {
    try {
      // Mengambil parameter dari req.query (GET URL params)
      const { name, page, limit } = req.query;
      const customers = await CustomerModel.getAll(name, page, limit);
      res.json(customers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const customer = await CustomerModel.getById(req.params.id);
      res.json(customer);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      // 1. Panggil helper fungsi yang sesuai
      validateCustomerInput(req.body);

      // 2. Simpan ke database jika lolos validasi
      const customer = await CustomerModel.create(req.body);
      res.status(201).json(customer);
    } catch (err) {
      // 3. Tangkap error validasi (status 400)
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      
      // 1. Panggil helper fungsi yang sesuai
      validateCustomerInput(req.body);

      // 2. Update database jika lolos validasi
      const customer = await CustomerModel.update(id, req.body);
      res.json(customer);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      await CustomerModel.remove(req.params.id);
      res.json({ message: "Customer deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};