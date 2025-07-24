import { useEffect, useState } from "react";
import Layout from "../Layout";
import SweetAlertService from "../../helper/sweetalertService";
import { useNavigate } from "react-router-dom";
import ServicePrediksi from "../../api/service/Prediksi.service";

// const bulanList = [
//   "Januari", "Februari", "Maret", "April", "Mei", "Juni",
//   "Juli", "Agustus", "September", "Oktober", "November", "Desember"
// ];

const PrediksiPage = () => {
  const navigate = useNavigate();
  const [dataPrediksi, setDataPrediksi] = useState([]);

  const fetchPrediksi = async () => {
    try {
      const response = await ServicePrediksi.get();
      setDataPrediksi(response);
    } catch (err) {
      SweetAlertService.showError("Gagal Memuat Data", err.message);
    }
  };

  const handlePrediksiBaru = () => {
    navigate("/prediksi/add-prediksi");
  };

  const handleDetail = (id) => {
    navigate(`/prediksi/detail/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await ServicePrediksi.delete(id);
      SweetAlertService.showSuccess("Berhasil", "Data berhasil dihapus");
      window.location.reload();
    } catch (error) {
      SweetAlertService.showError("Gagal", error.message || "Terjadi kesalahan");
    }
  };

  useEffect(() => {
    fetchPrediksi();
  }, []);

  return (
    <Layout>
      <div className="px-6 py-4 w-full">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-800 uppercase">
                Riwayat Prediksi Waktu Panen Kopi
              </h1>
              <p className="text-sm text-gray-500">
                Menampilkan waktu panen paling optimal berdasarkan prediksi produksi dan cuaca.
              </p>
            </div>
            <button
              onClick={handlePrediksiBaru}
              className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded shadow text-sm"
            >
              🔮 Prediksi Tahun Baru
            </button>
          </div>

          {dataPrediksi.length === 0 ? (
            <div className="text-gray-500 text-sm">Belum ada data prediksi.</div>
          ) : (
            <div className="overflow-auto">
              <table className="min-w-full text-sm border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">Tahun</th>
                    <th className="border p-2">Zona</th>
                    <th className="border p-2">Tanggal Prediksi</th>
                    <th className="border p-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPrediksi.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border p-2 text-center">{item.TAHUN}</td>
                      <td className="border p-2 text-center">{item.PREDIKSI?.length || 0} Zona</td>
                      <td className="border p-2 text-center">{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td className="border p-2 text-center flex flex-row gap-2 justify-center">
                        <button
                          onClick={() => handleDetail(item._id)}
                          className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded text-xs"
                        >
                          Detail
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded text-xs"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PrediksiPage;
