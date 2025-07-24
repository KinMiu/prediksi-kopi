import { useState } from "react";
import Layout from "../Layout";
import SweetAlertService from "../../helper/sweetalertService";
import ServiceKecamatan from "../../api/service/Kecamatan.service";
import { useNavigate } from "react-router-dom";

const FormAddKecamatanPage = () => {
  const [nama, setNama] = useState("");
  const [zona, setZona] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!nama) newErrors.nama = "Nama Kecamatan wajib diisi";
    if (!zona) newErrors.zona = "Zona wajib dipilih";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      const data = {
        NAMA: nama,
        ZONA: zona,
      };
      const response = await ServiceKecamatan.add(data);
      if (response.status === false) {
        return SweetAlertService.showError("Gagal", response.message);
      }
      SweetAlertService.showSuccess("Berhasil", response.message);
      navigate("/kecamatan");
      return window.location.reload();
    } catch (error) {
      SweetAlertService.showError("Error", error.message);
    }
  };

  const zonaOptions = ["A", "B", "C"];

  return (
    <Layout>
      <div className="flex flex-col gap-3 px-5 my-2 border-lg shadow w-full py-3 bg-white">
        <p className="text-lg font-bold uppercase">Tambah Data Kecamatan</p>
        <hr />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          {/* Nama Kecamatan */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm">Nama Kecamatan</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className={`border rounded px-3 py-2 w-full ${errors.nama ? "border-red-500" : ""}`}
              placeholder="Masukkan Nama Kecamatan"
            />
            {errors.nama && <span className="text-red-500 text-xs mt-1">{errors.nama}</span>}
          </div>

          {/* Zona */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm">Zona</label>
            <select
              value={zona}
              onChange={(e) => setZona(e.target.value)}
              className={`border rounded px-3 py-2 w-full bg-white ${errors.zona ? "border-red-500" : ""}`}
            >
              <option value="">-- Pilih Zona --</option>
              {zonaOptions.map((item, idx) => (
                <option key={idx} value={item}>{item}</option>
              ))}
            </select>
            {errors.zona && <span className="text-red-500 text-xs mt-1">{errors.zona}</span>}
          </div>
        </div>

        <div className="px-6 pb-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="mt-3 inline-flex justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-400"
          >
            Tambah Kecamatan
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default FormAddKecamatanPage;
