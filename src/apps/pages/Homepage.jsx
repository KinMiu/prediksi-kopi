import { useEffect, useState } from "react";
import Layout from "./Layout";
import ServiceProduksi from "../api/service/Produksi.service";
import ServiceKecamatan from "../api/service/Kecamatan.service";
import ServicePrediksi from "../api/service/Prediksi.service";
import SweetAlertService from "../helper/sweetalertService";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import PerbandinganPrediksiTable from "../components/Table/PerbandinganPrediksiTable.jsx";

const DashboardPrediksi = () => {
  const [dataProduksi, setDataProduksi] = useState([]);
  const [dataKecamatan, setDataKecamatan] = useState([]);
  const [dataPrediksi, setDataPrediksi] = useState([]);
  const [selectedTahun, setSelectedTahun] = useState("all");
  const [zonaFilter, setZonaFilter] = useState("A");

  const getData = async () => {
    try {
      const [resProduksi, resKecamatan, resPrediksi] = await Promise.all([
        ServiceProduksi.get(),
        ServiceKecamatan.get(),
        ServicePrediksi.get(),
      ]);
      setDataProduksi(resProduksi);
      setDataKecamatan(resKecamatan);
      setDataPrediksi(resPrediksi);
    } catch (error) {
      SweetAlertService.showError("Error", error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const totalKecamatan = dataKecamatan.length;

  const totalProduksi = dataProduksi.reduce(
    (sum, item) => sum + (item.PRODUKSI_TON || 0),
    0
  );

  const produksiPerTahun = dataProduksi.reduce((acc, item) => {
    const tahun = item.TAHUN || "Tidak Diketahui";
    acc[tahun] = (acc[tahun] || 0) + (item.PRODUKSI_TON || 0);
    return acc;
  }, {});

  const dataBar = Object.entries(produksiPerTahun)
    .map(([tahun, produksi]) => ({
      tahun,
      produksi: parseFloat(produksi.toFixed(2)),
    }))
    .sort((a, b) => parseInt(a.tahun) - parseInt(b.tahun));

  const filteredProduksi =
    selectedTahun === "all"
      ? dataProduksi
      : dataProduksi.filter((item) => item.TAHUN === parseInt(selectedTahun));

  const zonaDistribusi = filteredProduksi.reduce((acc, item) => {
    const zona = item.KECAMATAN?.ZONA || "Tidak Diketahui";
    acc[zona] = (acc[zona] || 0) + (item.PRODUKSI_TON || 0);
    return acc;
  }, {});

  const pieData = Object.entries(zonaDistribusi).map(([zona, value]) => ({
    name: `Zona ${zona}`,
    value: parseFloat(value.toFixed(2)),
  }));

  const pieColors = ["#34d399", "#60a5fa", "#fbbf24"];

  const tahunOptions = Array.from(
    new Set(dataProduksi.map((item) => item.TAHUN))
  ).sort();

  const chartData = Array.from(
    new Set([...dataProduksi.map((p) => p.TAHUN), ...dataPrediksi.map((p) => p.TAHUN)])
  )
    .sort()
    .map((tahun) => {
      const dataAktual = dataProduksi.filter(
        (p) => p.TAHUN === tahun && p.KECAMATAN?.ZONA === zonaFilter
      );
      const totalAktual = dataAktual.reduce((sum, item) => sum + (item.PRODUKSI_TON || 0), 0);
      const rataAktual =
        dataAktual.length > 0
          ? parseFloat(totalAktual.toFixed(2))
          : null;

      const dataPred = dataPrediksi.find((p) => p.TAHUN === tahun);
      const hasilZona = dataPred?.PREDIKSI?.find((z) => z.ZONA === zonaFilter);

      const prediksi = hasilZona?.TOTAL_PRODUKSI_PANEN ?? hasilZona?.PRODUKSI_PREDIKSI ?? null;

      return {
        tahun,
        aktual: rataAktual,
        prediksi: prediksi !== null ? parseFloat(prediksi.toFixed(2)) : null,
      };
    });

  return (
    <Layout>
      <div className="px-6 py-4">
        <h1 className="text-xl font-semibold mb-4">📊 Dashboard Prediksi Panen Kopi</h1>

        <PerbandinganPrediksiTable />

        {/* Bar Chart Prediksi vs Aktual */}
        <div className="bg-white p-4 shadow rounded mb-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-md font-semibold">
              📉 Perbandingan Produksi Aktual vs Prediksi
            </h2>
            <select
              value={zonaFilter}
              onChange={(e) => setZonaFilter(e.target.value)}
              className="text-sm border rounded px-2 py-1"
            >
              {["A", "B", "C"].map((z) => (
                <option key={z} value={z}>
                  Zona {z}
                </option>
              ))}
            </select>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="tahun" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="aktual" fill="#10b981" name="Aktual" />
              <Bar dataKey="prediksi" fill="#3b82f6" name="Prediksi" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Ringkasan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-md font-medium mb-2">🌱 Total Produksi</h2>
            <p className="text-3xl font-bold text-green-600">
              {totalProduksi.toFixed(2).toLocaleString()} ton
            </p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-md font-medium mb-2">🧍 Total Kecamatan</h2>
            <p className="text-4xl font-bold text-purple-600">
              {totalKecamatan}
            </p>
          </div>
        </div>

        {/* Produksi Tahunan dan Pie Zona */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-md font-medium mb-4">📈 Produksi Kopi per Tahun</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dataBar}>
                <XAxis dataKey="tahun" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="produksi" fill="#60a5fa" name="Produksi (Ton)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-md font-medium">🥧 Distribusi Produksi per Zona</h2>
              <select
                value={selectedTahun}
                onChange={(e) => setSelectedTahun(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="all">All Time</option>
                {tahunOptions.map((tahun) => (
                  <option key={tahun} value={tahun}>
                    {tahun}
                  </option>
                ))}
              </select>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={80}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPrediksi;
