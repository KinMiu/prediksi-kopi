import { useState } from "react";
import Layout from "../Layout";
import SweetAlertService from "../../helper/sweetalertService";
import ServicePrediksi from "../../api/service/Prediksi.service";
import { useNavigate } from "react-router-dom";

const FormAddPrediksiPage = () => {
  const navigate = useNavigate()
  const [tahun, setTahun] = useState("");
  const [errors, setErrors] = useState({});
  const [hasilPrediksi, setHasilPrediksi] = useState([]);

  const validate = () => {
    const newErrors = {};
    if (!tahun) newErrors.tahun = "Tahun wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const response = await ServicePrediksi.predict({ tahun: parseInt(tahun) });
      console.log(response)

      if (!response || response.error) {
        return SweetAlertService.showError("Gagal", response.message || "Terjadi kesalahan saat prediksi.");
      }

      SweetAlertService.showSuccess("Berhasil", `Prediksi untuk tahun ${tahun} berhasil`);
      setHasilPrediksi(response.data); // response.data berisi array hasil prediksi
      return navigate(`/prediksi/detail/${response.data._id}`)
    } catch (error) {
      console.log(error)
      SweetAlertService.showError("Error", error.message);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-3 px-5 my-2 border-lg shadow w-full py-3 bg-white">
        <p className="text-lg font-bold uppercase">Prediksi Waktu Panen</p>
        <hr />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <InputField
            label="Tahun Prediksi"
            type="number"
            value={tahun}
            setValue={setTahun}
            error={errors.tahun}
          />
        </div>

        <div className="px-6 pb-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="mt-3 inline-flex justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-400"
          >
            Jalankan Prediksi
          </button>
        </div>

        {hasilPrediksi.length > 0 && (
          <div className="px-6 pt-4">
            <p className="font-semibold text-lg mb-2">Hasil Prediksi:</p>
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="border px-2 py-1">Zona</th>
                  <th className="border px-2 py-1">Bulan Terbaik</th>
                  <th className="border px-2 py-1">Skor</th>
                </tr>
              </thead>
              <tbody>
                {hasilPrediksi.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="border px-2 py-1">{item.ZONA}</td>
                    <td className="border px-2 py-1">{item.BULAN}</td>
                    <td className="border px-2 py-1">{item.SKOR_CUACA}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

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

export default FormAddPrediksiPage;
