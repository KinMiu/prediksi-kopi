import { useEffect, useState } from "react";
import ServiceProduksi from "../../api/service/Produksi.service";
import ServicePrediksi from "../../api/service/Prediksi.service";

const bulanList = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const PerbandinganPrediksiTable = () => {
  const [dataProduksi, setDataProduksi] = useState([]);
  const [dataPrediksi, setDataPrediksi] = useState([]);
  const [zona, setZona] = useState("A");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [produksi, prediksi] = await Promise.all([
          ServiceProduksi.get(),
          ServicePrediksi.get(),
        ]);
        setDataProduksi(produksi);
        setDataPrediksi(prediksi);
      } catch (err) {
        console.error("Gagal memuat data:", err);
      }
    };
    fetchAll();
  }, []);

  const tahunList = Array.from(
    new Set([
      ...dataProduksi.map((p) => p.TAHUN),
      ...dataPrediksi.map((d) => d.TAHUN),
    ])
  ).sort((a, b) => b-a);

  const getProduksiByTahun = (tahun) => {
    const filtered = dataProduksi.filter(
      (item) => item.KECAMATAN?.ZONA === zona && item.TAHUN === tahun
    );
    if (filtered.length === 0) return null;

    console.log(filtered)

    const total = filtered.reduce((sum, item) => sum + (item.PRODUKSI_TON || 0), 0);
    return parseFloat(total.toFixed(2));
  };

  const getPrediksiByTahun = (tahun) => {
    const pred = dataPrediksi.find((p) => p.TAHUN === tahun);
    if (!pred) return { prediksi: null, bulan: null };

    const zonaPred = pred.PREDIKSI.find((z) => z.ZONA === zona);
    return {
      prediksi: zonaPred?.TOTAL_PRODUKSI_PANEN ?? zonaPred?.PRODUKSI_PREDIKSI ?? null,
      bulan: zonaPred?.BULAN_TERBAIK ?? null,
    };
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-lg font-semibold mb-4">📊 Perbandingan Hasil Prediksi & Produksi Aktual</h2>

      <div className="mb-4">
        <label className="font-medium text-sm mr-2">Pilih Zona:</label>
        <select
          value={zona}
          onChange={(e) => setZona(e.target.value)}
          className="border px-3 py-1 text-sm rounded"
        >
          {["A", "B", "C"].map((z) => (
            <option key={z} value={z}>Zona {z}</option>
          ))}
        </select>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full text-sm border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Tahun</th>
              <th className="border px-2 py-1">Zona</th>
              <th className="border px-2 py-1">Produksi Aktual (Ton)</th>
              <th className="border px-2 py-1">Prediksi Total Produksi</th>
              <th className="border px-2 py-1">Bulan Optimal</th>
            </tr>
          </thead>
          <tbody>
            {tahunList.map((tahun, idx) => {
              const aktual = getProduksiByTahun(tahun);
              const { prediksi, bulan } = getPrediksiByTahun(tahun);
              return (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border px-2 py-1 text-center">{tahun}</td>
                  <td className="border px-2 py-1 text-center">{zona}</td>
                  <td className="border px-2 py-1 text-center">
                    {aktual !== null ? aktual.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "-"}
                  </td>
                  <td className="border px-2 py-1 text-center">
                    {prediksi !== null ? prediksi.toFixed(2).toLocaleString() : "-"}
                  </td>
                  <td className="border px-2 py-1 text-center">
                    {bulan ? bulanList[bulan - 1] : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PerbandinganPrediksiTable;
