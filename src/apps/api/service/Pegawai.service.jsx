import API_ENDPOINT from '../global'
import { api } from '../global/config'

const { 
  GET_PEGAWAI, 
  GET_SURAT_MASUK_BY_ID, 
  ADD_PEGAWAI, 
  EDIT_SURAT_MASUK,
  ADD_SURAT_MASUK_EXCEL, 
  DELETE_PEGAWAI,
  DELETE_ALL
} = API_ENDPOINT

class ServicePegawai {
  static async addPegawai(data) {
    const response = await api.post(ADD_PEGAWAI, data)
    return response.data
  }
  static async editSuratMasuk(ID, data) {
    const response = await api.put(EDIT_SURAT_MASUK(ID), data)
    return response.data
  }
  static async addSuratMasukExcel(data) {
    const response = await api.post(ADD_SURAT_MASUK_EXCEL, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }
  static async getPegawai() {
    const response = await api.get(GET_PEGAWAI)
    return response.data
  }
  static async getSuratMasukByID(ID) {
    const response = await api.get(GET_SURAT_MASUK_BY_ID(ID))
    return response.data
  }
  static async deletePegawai(id) {
    const response = await api.delete(DELETE_PEGAWAI(id))
    return response.data
  }
  static async deleteAll() {
    const response = await api.delete(DELETE_ALL)
    return response.data
  }
}

export default ServicePegawai