const API_ENDPOINT = {
  ADD_USER: "/user/create",
  LOGIN_USER: "/user/login",
  GET_BY_ID: (ID) =>  `/user/get/${ID}`,
  CHANGE_NAME: (ID) =>  `/user/change-name/${ID}`,
  CHANGE_PASSWORD: (ID) =>  `/user/change-password/${ID}`,
  LOGOUT_USER: "/user/logout",
  //Surat Masuk
  GET_SURAT_MASUK:`/surat-masuk/get`,
  GET_SURAT_MASUK_BY_ID: (ID) => `/surat-masuk/get/${ID}`,
  ADD_SURAT_MASUK: `/surat-masuk/create`,
  EDIT_SURAT_MASUK: (ID) => `/surat-masuk/edit/${ID}`,
  ADD_SURAT_MASUK_EXCEL: `/surat-masuk/create/excel`,
  DELETE_SURAT_MASUK: (id) => `/surat-masuk/delete/${id}`,
  DELETE_ALL: `/surat-masuk/delete-all`,
  // Disposisi
  ADD_DISPOSISI: (id) => `/surat-masuk/disposisi/${id}`,
  GET_BY_DISPOSISI: (id) => `/surat-masuk/disposisi/get/${id}`,
  DELETE_DISPOSISI: (idSurat, idPegawai) => `/surat-masuk/disposisi/${idSurat}/${idPegawai}`,
  // Jabatan
  ADD_JABATAN: `/jabatan/create`,
  GET_JABATAN:`/jabatan/get`,
  //Jenis Surat
  ADD_JENIS_SURAT: `/jenis-surat/create`,
  GET_JENIS_SURAT: `/jenis-surat/get`,
  //Pegawai
  ADD_PEGAWAI: `/pegawai/create`,
  GET_PEGAWAI: `/pegawai/get`,
  DELETE_PEGAWAI: (id) => `/pegawai/delete/${id}`,
  // Kecamatan
  ADD_KECAMATAN: `/kecamatan/create`,
  GET_KECAMATAN: `/kecamatan/get`,
  GET_KECAMATAN_BY_ID: (id) => `/kecamatan/get/${id}`,
  EDIT_KECAMATAN: (id) => `/kecamatan/edit/${id}`,
  DELETE_KECAMATAN: (id) => `/kecamatan/delete/${id}`,
  DELETE_ALL_KECAMATAN: `/kecamatan/delete-all`,
  IMPORT_WITH_EXCEL: `/kecamatan/import-excel`,
  // Cuaca
  ADD_CUACA: `/cuaca/create`,
  GET_CUACA: `/cuaca/get`,
  GET_CUACA_BY_ID: (id) => `/cuaca/get/${id}`,
  EDIT_CUACA: (id) => `/cuaca/edit/${id}`,
  ADD_CUACA_EXCEL: `/cuaca/import-excel`,
  DELETE_CUACA: (id) => `/cuaca/delete/${id}`,
  DELETE_ALL_CUACA: `/cuaca/delete-all`,
  // Produksi
  ADD_PRODUKSI: `/produksi/create`,
  GET_PRODUKSI: `/produksi/get`,
  IMPORT_PRODUKSI_EXCEL: `/produksi/import-excel`,
  GET_PRODUKSI_BY_ID: (id) => `/produksi/get/${id}`,
  EDIT_PRODUKSI: (id) => `/produksi/edit/${id}`,
  ADD_PRODUKSI_EXCEL: `/produksi/create/excel`,
  DELETE_PRODUKSI: (id) => `/produksi/delete/${id}`,
  DELETE_ALL_PRODUKSI: `/produksi/delete-all`,
  // Prediksi
  GET_PREDIKSI: '/prediksi/get',
  GET_PREDIKSI_BY_ID: (id)  => `/prediksi/get/${id}`,
  GET_PREDIKSI_BY_TAHUN: (tahun) => `/prediksi/tahun/${tahun}`,
  GET_PREDIKSI_BY_TAHUN_ZONA: (tahun, zona) => `/prediksi/tahun/${tahun}/zona/${zona}`,
  ADD_PREDIKSI: '/prediksi/create',
  DELETE_PREDIKSI: (id) => `/prediksi/${id}`,
  DELETE_ALL_PREDIKSI: '/prediksi/delete-all',
  GENERATE_PREDIKSI: '/prediksi/generate',
  PREDICT_PYTHON: '/prediksi/predict',

}

export default API_ENDPOINT