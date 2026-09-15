import { CustomerModel } from "../models/customerModel.js";

// Helper function untuk validasi input
const validateCustomerInput = (data) => {
  if (!data.email || !data.email.includes("@")) {
    return "Email wajib memiliki karakter @";
  }
  if (!data.phone || data.phone.length < 10) {
    return "Phone (nomor telepon) harus diisi minimal 10 karakter";
  }
  return null;
};

export const CustomerController = {
  async getAll(req, res) {
  try {
    const { name, page, limit } = req.body;
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
      // 1. Jalankan validasi terlebih dahulu
      validateCustomerData(req.body);

      // 2. Jika lolos validasi, baru simpan ke database
      const customer = await CustomerModel.create(req.body);
      res.status(201).json(customer);
    } catch (err) {
      // 3. Jika gagal validasi, tangkap di sini dan beri status 400
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      validateCustomerData(req.body);

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
