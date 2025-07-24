import { useEffect, useState } from "react";
import Layout from "../Layout";
import SweetAlertService from "../../helper/sweetalertService";
import ServiceProduksi from "../../api/service/Produksi.service";
import ServiceKecamatan from "../../api/service/Kecamatan.service";
import { useNavigate } from "react-router-dom";

const FormAddProduksiPage = () => {
  const [tahun, setTahun] = useState("");
  const [zona, setZona] = useState(""); // Diset otomatis
  const [kecamatan, setKecamatan] = useState("");
  const [tbm, setTbm] = useState("");
  const [tm, setTm] = useState("");
  const [tr, setTr] = useState("");
  const [produksi, setProduksi] = useState("");
  const [produktifitas, setProduktifitas] = useState("");
  const [errors, setErrors] = useState({});
  const [dataKecamatan, setDataKecamatan] = useState([]);

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!tahun) newErrors.tahun = "Tahun wajib diisi";
    if (!kecamatan) newErrors.kecamatan = "Kecamatan wajib dipilih";
    if (!tbm) newErrors.tbm = "TBM wajib diisi";
    if (!tm) newErrors.tm = "TM wajib diisi";
    if (!tr) newErrors.tr = "TR wajib diisi";
    if (!produksi) newErrors.produksi = "Produksi wajib diisi";
    if (!produktifitas) newErrors.produktifitas = "Produktivitas wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleKecamatanChange = (e) => {
    const selectedId = e.target.value;
    setKecamatan(selectedId);

    const selectedKec = dataKecamatan.find(kec => kec._id === selectedId);
    if (selectedKec) {
      setZona(selectedKec.ZONA || ""); // Set zona otomatis
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    const jumlah = parseFloat(tbm || 0) + parseFloat(tm || 0) + parseFloat(tr || 0);

    try {
      const data = {
        TAHUN: parseInt(tahun),
        IDKECAMATAN: kecamatan,
        LUAS_AREAL: {
          TBM: parseFloat(tbm),
          TM: parseFloat(tm),
          TR: parseFloat(tr),
          JUMLAH: jumlah,
        },
        PRODUKSI_TON: parseFloat(produksi),
        PRODUKTIVITAS: parseFloat(produktifitas),
      };
      const response = await ServiceProduksi.add(data);
      console.log(response)
      if (!response || response.error) {
        return SweetAlertService.showError("Gagal", response.message || "Terjadi kesalahan");
      }
      SweetAlertService.showSuccess("Berhasil", "Data berhasil ditambahkan");
      navigate("/produksi");
      window.location.reload();
    } catch (error) {
      SweetAlertService.showError("Error", error.message);
    }
  };

  const getKecamatan = async () => {
    try {
      const response = await ServiceKecamatan.get();
      setDataKecamatan(response);
    } catch (error) {
      SweetAlertService.showError("Error", error.message);
    }
  };

  useEffect(() => {
    getKecamatan();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-3 px-5 my-2 border-lg shadow w-full py-3 bg-white">
        <p className="text-lg font-bold uppercase">Tambah Data Produksi</p>
        <hr />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <InputField label="Tahun" value={tahun} setValue={setTahun} error={errors.tahun} type="number" />

          {/* Kecamatan */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm">Kecamatan</label>
            <select
              value={kecamatan}
              onChange={handleKecamatanChange}
              className={`border rounded px-3 py-2 w-full bg-white ${errors.kecamatan ? "border-red-500" : ""}`}
            >
              <option value="">-- Pilih Kecamatan --</option>
              {dataKecamatan.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.NAMA}
                </option>
              ))}
            </select>
            {errors.kecamatan && <span className="text-red-500 text-xs mt-1">{errors.kecamatan}</span>}
          </div>

          {/* Zona Otomatis */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm">Zona</label>
            <input
              type="text"
              value={zona}
              readOnly
              className="border rounded px-3 py-2 w-full bg-gray-100 text-gray-700"
              placeholder="Zona dari kecamatan"
            />
          </div>

          <InputField label="TBM (Ha)" value={tbm} setValue={setTbm} error={errors.tbm} type="number" />
          <InputField label="TM (Ha)" value={tm} setValue={setTm} error={errors.tm} type="number" />
          <InputField label="TR (Ha)" value={tr} setValue={setTr} error={errors.tr} type="number" />
          <InputField label="Produksi (Ton)" value={produksi} setValue={setProduksi} error={errors.produksi} type="number" />
          <InputField label="Produktivitas (Kg/Ha/Th)" value={produktifitas} setValue={setProduktifitas} error={errors.produktifitas} type="number" />
        </div>

        <div className="px-6 pb-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="mt-3 inline-flex justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-400"
          >
            Tambah Data Produksi
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

export default FormAddProduksiPage;
