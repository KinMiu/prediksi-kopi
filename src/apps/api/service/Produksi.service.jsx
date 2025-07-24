import API_ENDPOINT from '../global';
import { api } from '../global/config';

const {
  GET_PRODUKSI,
  GET_PRODUKSI_BY_ID,
  ADD_PRODUKSI,
  EDIT_PRODUKSI,
  ADD_PRODUKSI_EXCEL,
  DELETE_PRODUKSI,
  DELETE_ALL_PRODUKSI,
  IMPORT_PRODUKSI_EXCEL, // pastikan ini sudah ada di global endpoint config
} = API_ENDPOINT;

class ServiceProduksi {
  static async add(data) {
    const response = await api.post(ADD_PRODUKSI, data);
    return response.data;
  }

  static async edit(ID, data) {
    const response = await api.put(EDIT_PRODUKSI(ID), data);
    return response.data;
  }

  static async addByExcel(data) {
    const response = await api.post(ADD_PRODUKSI_EXCEL, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }

  static async importExcel(data) {
    const response = await api.post(IMPORT_PRODUKSI_EXCEL, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }

  static async get() {
    const response = await api.get(GET_PRODUKSI);
    return response.data;
  }

  static async getById(ID) {
    const response = await api.get(GET_PRODUKSI_BY_ID(ID));
    return response.data;
  }

  static async delete(id) {
    const response = await api.delete(DELETE_PRODUKSI(id));
    return response.data;
  }

  static async deleteAll() {
    const response = await api.delete(DELETE_ALL_PRODUKSI);
    return response.data;
  }
}

export default ServiceProduksi;
