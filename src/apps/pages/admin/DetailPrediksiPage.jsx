import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ServicePrediksi from "../../api/service/Prediksi.service";
import Layout from "../Layout";
import SweetAlertService from "../../helper/sweetalertService";

const DetailPrediksiPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prediksiData, setPrediksiData] = useState(null);

  const bulanList = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const zonaBulan = {
    A: [2, 3, 4, 5, 6],  // Maret–Juli
    B: [4, 5, 6, 7, 8],  // Mei–September
    C: [5, 6, 7, 8, 9],  // Juni–Oktober
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ServicePrediksi.getbyId(id);
        setPrediksiData(response);
      } catch (error) {
        SweetAlertService.showError("Gagal memuat detail", error.message);
      }
    };

    fetchData();
  }, [id, navigate]);

  if (!prediksiData) return <div className="p-6">Memuat...</div>;

  return (
    <Layout>
      <div className="p-6 space-y-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Detail Prediksi Tahun {prediksiData.TAHUN}
        </h1>

        {/* Dataset Historis Per Zona */}
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Dataset Historis Per Zona (Musim Panen)
          </h2>

          {["A", "B", "C"].map((zona) => {
            const dataZona = prediksiData.DATASET.filter(
              (item) => item.ZONA === zona && item.TAHUN < prediksiData.TAHUN
            );
            const bulanIndices = zonaBulan[zona];

            if (dataZona.length === 0) return null;

            return (
              <div key={zona} className="mb-8">
                <h3 className="text-md font-semibold text-gray-800 mb-2">Zona {zona}</h3>

                <div className="overflow-auto rounded border border-gray-300 mb-3">
                  <table className="min-w-full text-sm text-center">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="border px-2 py-1 bg-white">Tahun</th>
                        {bulanIndices.map((i) => (
                          <th key={i} className="border px-2 py-1">{bulanList[i]}</th>
                        ))}
                        <th className="border px-2 py-1">Total Produksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataZona.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="border px-2 py-1">{item.TAHUN}</td>
                          {bulanIndices.map((i) => (
                            <td key={i} className="border px-2 py-1">{item.SKOR_CUACA?.[i] ?? "-"}</td>
                          ))}
                          <td className="border px-2 py-1">
                            {/* {item.PRODUKSI_TAHUNAN ?? "-"} */}
                            {typeof item.PRODUKSI_TAHUNAN === "number" ? item.PRODUKSI_TAHUNAN.toFixed(2) : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </section>

        {/* Hasil Prediksi */}
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Hasil Prediksi Per Zona
          </h2>

          {prediksiData.PREDIKSI.map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 mb-6 shadow-sm bg-white"
            >
              <h3 className="text-base font-semibold text-gray-800 mb-2">
                Zona {item.ZONA}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Waktu Paling Optimal:</strong>{" "}
                {bulanList[item.BULAN_TERBAIK - 1] || "-"}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Skor Cuaca Tertinggi:</strong> {item.SKOR_TERBAIK}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Produksi (Bulan Terbaik):</strong> {item.PRODUKSI_PREDIKSI} Ton
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Total Produksi Panen:</strong> {item.TOTAL_PRODUKSI_PANEN} Ton
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Catatan:</strong> {item.CATATAN}
              </p>

              {/* Detail Prediksi Bulanan */}
              <h4 className="text-sm font-medium text-gray-700 mt-4 mb-2">
                Distribusi Produksi Selama Musim Panen
              </h4>
              <table className="min-w-full text-sm border border-gray-300 rounded overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border px-2 py-1">Bulan</th>
                    <th className="border px-2 py-1">Skor Cuaca</th>
                    <th className="border px-2 py-1">Prediksi Produksi</th>
                  </tr>
                </thead>
                <tbody>
                  {item.DETAIL.map((det, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="border px-2 py-1 text-center">
                        {bulanList[det.BULAN - 1]}
                      </td>
                      <td className="border px-2 py-1 text-center">
                        {det.SKOR_CUACA}
                      </td>
                      <td className="border px-2 py-1 text-center">
                        {typeof det.PREDIKSI_PRODUKSI === "number" ? det.PREDIKSI_PRODUKSI.toFixed(2) : "-"}
                        {/* {det.PREDIKSI_PRODUKSI} */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </section>
      </div>
    </Layout>
  );
};

export default DetailPrediksiPage;
