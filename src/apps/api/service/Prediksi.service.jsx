import API_ENDPOINT from '../global';
import { api } from '../global/config';

const {
  GET_PREDIKSI,
  GET_PREDIKSI_BY_ID,
  GET_PREDIKSI_BY_TAHUN,
  GET_PREDIKSI_BY_TAHUN_ZONA,
  ADD_PREDIKSI,
  DELETE_PREDIKSI,
  DELETE_ALL_PREDIKSI,
  GENERATE_PREDIKSI,
  PREDICT_PYTHON
} = API_ENDPOINT;

class ServicePrediksi {
  static async add(data) {
    const response = await api.post(ADD_PREDIKSI, data);
    return response.data;
  }

  static async get() {
    const response = await api.get(GET_PREDIKSI);
    return response.data;
  }

  static async getbyId(id) {
    const response = await api.get(GET_PREDIKSI_BY_ID(id));
    return response.data;
  }

  static async getByTahun(tahun) {
    const response = await api.get(GET_PREDIKSI_BY_TAHUN(tahun));
    return response.data;
  }

  static async getByTahunZona(tahun, zona) {
    const response = await api.get(GET_PREDIKSI_BY_TAHUN_ZONA(tahun, zona));
    return response.data;
  }

  static async generate(tahun) {
    const response = await api.post(GENERATE_PREDIKSI, { tahun });
    return response.data;
  }

  static async delete(id) {
    const response = await api.delete(DELETE_PREDIKSI(id));
    return response.data;
  }

  static async deleteAll() {
    const response = await api.delete(DELETE_ALL_PREDIKSI);
    return response.data;
  }

  static async predict(data) {
    const response = await api.post(PREDICT_PYTHON, data);
    return response.data;
  }
}

export default ServicePrediksi;
