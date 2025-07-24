import API_ENDPOINT from '../global';
import { api } from '../global/config';

const {
  GET_CUACA,
  GET_CUACA_BY_ID,
  ADD_CUACA,
  EDIT_CUACA,
  ADD_CUACA_EXCEL,
  DELETE_CUACA,
  DELETE_ALL_CUACA
} = API_ENDPOINT;

class ServiceCuaca {
  static async get() {
    const response = await api.get(GET_CUACA);
    return response.data;
  }

  static async getById(ID) {
    const response = await api.get(GET_CUACA_BY_ID(ID));
    return response.data;
  }

  static async add(data) {
    const response = await api.post(ADD_CUACA, data);
    return response.data;
  }

  static async edit(ID, data) {
    const response = await api.put(EDIT_CUACA(ID), data);
    return response.data;
  }

  static async importExcel(data) {
    const response = await api.post(ADD_CUACA_EXCEL, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }

  static async delete(id) {
    const response = await api.delete(DELETE_CUACA(id));
    return response.data;
  }

  static async deleteAll() {
    const response = await api.delete(DELETE_ALL_CUACA);
    return response.data;
  }
}

export default ServiceCuaca;
