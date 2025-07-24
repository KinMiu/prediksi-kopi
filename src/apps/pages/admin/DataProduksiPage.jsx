import { useEffect, useState } from "react";
import Layout from "../Layout";
import SweetAlertService from "../../helper/sweetalertService";
import { useNavigate } from "react-router-dom";
import TableProduksi from "../../components/Table/TableProduksi";
import ServiceProduksi from "../../api/service/Produksi.service";
import ServiceKecamatan from "../../api/service/Kecamatan.service";

const DataProduksiPage = () => {
  const [dataProduksi, setDataProduksi] = useState([]);
  const [dataKecamatan, setDataKecamatan] = useState([]);
  const [showExcelModal, setShowExcelModal] = useState(false);
  const [file, setFile] = useState(null);
  const [kecamatanId, setKecamatanId] = useState("");

  // Filter states
  const [filterTahun, setFilterTahun] = useState("");
  const [filterZona, setFilterZona] = useState("");
  const [filterKec, setFilterKec] = useState("");

  const navigate = useNavigate();

  const getDataProduksi = async () => {
    try {
      const response = await ServiceProduksi.get();
      setDataProduksi(response);
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

  const handleDeleteAll = async () => {
    SweetAlertService.confirmDeletion().then(async (e) => {
      if (e.isConfirmed) {
        try {
          const response = await ServiceProduksi.deleteAll();
          if (response.status) {
            SweetAlertService.showSuccess("Sukses", response.message);
            window.location.reload();
          } else {
            SweetAlertService.showError("Error", response.message);
          }
        } catch (error) {
          SweetAlertService.showError("Error", error.response?.data?.message || error.message);
        }
      }
    });
  };

  const handleNavigateAdd = () => {
    navigate("/produksi/add-produksi");
  };

  const handleExcelUpload = async () => {
  if (!file) return SweetAlertService.showError("Gagal", "File belum dipilih.");
  if (!kecamatanId) return SweetAlertService.showError("Gagal", "Pilih kecamatan terlebih dahulu.");

  try {
    // Upload ke Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "preset_kamu"); // Ganti sesuai pengaturan Cloudinary
    const cloudRes = await fetch("https://api.cloudinary.com/v1_1/NAMA_CLOUDINARY_KAMU/auto/upload", {
      method: "POST",
      body: formData,
    });

    const cloudData = await cloudRes.json();
    const fileUrl = cloudData.secure_url;

    // Kirim ke backend dengan body JSON
    const response = await fetch("/api/import-produksi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileUrl,
        kecamatanId,
      }),
    });

    const result = await response.json();

    if (result.status === false) {
      return SweetAlertService.showError("Gagal", result.message);
    }

    SweetAlertService.showSuccess("Berhasil", result.message);
    setShowExcelModal(false);
    setFile(null);
    setKecamatanId("");
    getDataProduksi();
  } catch (error) {
    SweetAlertService.showError("Error", error.message || "Terjadi kesalahan saat upload");
  }
};

  useEffect(() => {
    getDataProduksi();
    getKecamatan();
  }, []);

  const filteredData = dataProduksi.filter((item) => {
    const zona = item.KECAMATAN?.ZONA;
    const idKec = item.KECAMATAN?._id;
    const matchTahun = filterTahun ? item.TAHUN === parseInt(filterTahun) : true;
    const matchZona = filterZona ? zona === filterZona : true;
    const matchKec = filterKec ? idKec === filterKec : true;
    return matchTahun && matchZona && matchKec;
  });

  return (
    <Layout>
      <div className="px-6 py-4 w-full">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-800 uppercase">Data Produksi Kopi</h1>
              <p className="text-sm text-gray-500">Laporan produksi kopi berdasarkan zona dan kecamatan.</p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button
                onClick={handleNavigateAdd}
                className="bg-blue-500 hover:bg-blue-400 text-white text-sm px-4 py-2 rounded-md shadow"
              >
                + Tambah Data
              </button>
              {/* <button
                onClick={() => setShowExcelModal(true)}
                className="bg-green-600 hover:bg-green-500 text-white text-sm px-4 py-2 rounded-md shadow"
              >
                📥 Import Excel
              </button> */}
              {/* <button
                onClick={handleDeleteAll}
                className="bg-red-500 hover:bg-red-400 text-white text-sm px-4 py-2 rounded-md shadow"
              >
                🗑 Hapus Semua
              </button> */}
            </div>
          </div>

          {/* Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tahun</label>
              <select
                value={filterTahun}
                onChange={(e) => setFilterTahun(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="">Semua Tahun</option>
                {[...new Set(dataProduksi.map(item => item.TAHUN))].sort().map((tahun, idx) => (
                  <option key={idx} value={tahun}>{tahun}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zona</label>
              <select
                value={filterZona}
                onChange={(e) => setFilterZona(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="">Semua Zona</option>
                {[...new Set(dataKecamatan.map(item => item.ZONA))].sort().map((zona, idx) => (
                  <option key={idx} value={zona}>{zona}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kecamatan</label>
              <select
                value={filterKec}
                onChange={(e) => setFilterKec(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="">Semua Kecamatan</option>
                {dataKecamatan.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.NAMA}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            {filteredData.length > 0 ? (
              <TableProduksi data={filteredData} />
            ) : (
              <div className="text-center text-gray-500 text-sm py-8">
                Tidak ada data sesuai filter.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popup Upload Excel */}
      {showExcelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <h2 className="text-lg font-semibold mb-4">Unggah File Excel Produksi</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Pilih Kecamatan</label>
              <select
                value={kecamatanId}
                onChange={(e) => setKecamatanId(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm bg-white"
              >
                <option value="">-- Pilih Kecamatan --</option>
                {dataKecamatan.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.NAMA}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Pilih File Excel</label>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full text-sm border p-2 rounded"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowExcelModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Batal
              </button>
              <button
                onClick={handleExcelUpload}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DataProduksiPage;
