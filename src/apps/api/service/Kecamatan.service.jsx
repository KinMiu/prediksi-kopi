import API_ENDPOINT from '../global';
import { api } from '../global/config';

const {
  GET_KECAMATAN,
  GET_KECAMATAN_BY_ID,
  ADD_KECAMATAN,
  EDIT_KECAMATAN,
  DELETE_KECAMATAN,
  IMPORT_WITH_EXCEL,
  DELETE_ALL_KECAMATAN
} = API_ENDPOINT;

class ServiceKecamatan {
  static async get() {
    const response = await api.get(GET_KECAMATAN);
    return response.data;
  }

  static async getById(ID) {
    const response = await api.get(GET_KECAMATAN_BY_ID(ID));
    return response.data;
  }

  static async add(data) {
    const response = await api.post(ADD_KECAMATAN, data);
    return response.data;
  }

  static async edit(ID, data) {
    const response = await api.put(EDIT_KECAMATAN(ID), data);
    return response.data;
  }

  static async delete(id) {
    const response = await api.delete(DELETE_KECAMATAN(id));
    return response.data;
  }

  static async deleteAll() {
    const response = await api.delete(DELETE_ALL_KECAMATAN);
    return response.data;
  }
  static async uploadExcel(formData) {
    const response = await api.post(IMPORT_WITH_EXCEL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

export default ServiceKecamatan;
