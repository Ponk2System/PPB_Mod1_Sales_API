import { supabase } from "../config/supabaseClient.js";
import { supabase } from "../config/supabase.js";

export const CustomerModel = {
  async getAll(name, page, limit) {
  let query = supabase.from("customers").select("*");

  // Soal 1, searching 
  if (name) query = query.ilike("name", `%${name}%`);

  // Soal 2, pagination
  if (page && limit) {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const from = (pageNum - 1) * limitNum;
    const to = from + limitNum - 1;

    query = query.range(from, to);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(customer) {
    const { data, error } = await supabase
      .from("customers")
      .insert([customer])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, customer) {
    const { data, error } = await supabase
      .from("customers")
      .update(customer)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { error } = await supabase.from("customers").delete().eq("id", id);
    if (error) throw error;
    return { message: "Customer deleted successfully" };
  },
};


