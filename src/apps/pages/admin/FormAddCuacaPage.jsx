import { useState } from "react";
import Layout from "../Layout";
import SweetAlertService from "../../helper/sweetalertService";
import ServiceCuaca from "../../api/service/Cuaca.service";
import { useNavigate } from "react-router-dom";

const FormAddCuacaPage = () => {
  const navigate = useNavigate();
  const [tahun, setTahun] = useState("");
  const [bulan, setBulan] = useState("");
  const [suhu, setSuhu] = useState("");
  const [kelembaban, setKelembaban] = useState("");
  const [curahHujan, setCurahHujan] = useState("");
  const [kecepatanAngin, setKecepatanAngin] = useState("");
  const [radiasiMatahari, setRadiasiMatahari] = useState("");
  const [errors, setErrors] = useState({});

  const bulanOptions = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const validate = () => {
    const newErrors = {};
    if (!tahun) newErrors.tahun = "Tahun wajib diisi";
    if (!bulan) newErrors.bulan = "Bulan wajib dipilih";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const data = {
      TAHUN: parseInt(tahun),
      BULAN: bulan,
      SUHU: parseFloat(suhu),
      KELEMBABAN: parseFloat(kelembaban),
      CURAH_HUJAN: parseFloat(curahHujan),
      KECEPATAN_ANGIN: parseFloat(kecepatanAngin),
      RADIASI_MATAHARI: parseFloat(radiasiMatahari),
    };

    try {
      const response = await ServiceCuaca.add(data);
      if (!response || response.error) {
        return SweetAlertService.showError("Gagal", response.message || "Terjadi kesalahan");
      }
      SweetAlertService.showSuccess("Berhasil", "Data cuaca berhasil ditambahkan");
      navigate("/cuaca");
      window.location.reload();
    } catch (error) {
      SweetAlertService.showError("Error", error.message);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-3 px-5 my-2 border-lg shadow w-full py-3 bg-white">
        <p className="text-lg font-bold uppercase">Tambah Data Cuaca</p>
        <hr />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <InputField label="Tahun" type="number" value={tahun} setValue={setTahun} error={errors.tahun} />

          {/* Bulan */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm">Bulan</label>
            <select
              value={bulan}
              onChange={(e) => setBulan(e.target.value)}
              className={`border rounded px-3 py-2 w-full bg-white ${errors.bulan ? "border-red-500" : ""}`}
            >
              <option value="">-- Pilih Bulan --</option>
              {bulanOptions.map((bln, idx) => (
                <option key={idx} value={bln}>{bln}</option>
              ))}
            </select>
            {errors.bulan && <span className="text-red-500 text-xs mt-1">{errors.bulan}</span>}
          </div>

          <InputField label="Suhu (°C)" value={suhu} setValue={setSuhu} type="number" />
          <InputField label="Kelembaban (%)" value={kelembaban} setValue={setKelembaban} type="number" />
          <InputField label="Curah Hujan (mm)" value={curahHujan} setValue={setCurahHujan} type="number" />
          <InputField label="Kecepatan Angin (m/s)" value={kecepatanAngin} setValue={setKecepatanAngin} type="number" />
          <InputField label="Radiasi Matahari (kJ/m²)" value={radiasiMatahari} setValue={setRadiasiMatahari} type="number" />
        </div>

        <div className="px-6 pb-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="mt-3 inline-flex justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-400"
          >
            Tambah Data Cuaca
          </button>
        </div>
      </div>
    </Layout>
  );
};

// Komponen input field reusable
const InputField = ({ label, value, setValue, error, type = "text" }) => (
  <div className="flex flex-col">
    <label className="mb-1 font-medium text-sm">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={`border rounded px-3 py-2 w-full ${error ? "border-red-500" : ""}`}
      placeholder={`Masukkan ${label}`}
    />
    {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
  </div>
);

export default FormAddCuacaPage;
