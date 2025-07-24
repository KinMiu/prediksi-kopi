import { useEffect, useState } from "react";
import Layout from "../Layout";
import SweetAlertService from "../../helper/sweetalertService";
import ServiceCuaca from "../../api/service/Cuaca.service";
import TableCuaca from "../../components/Table/TableCuaca";
import { useNavigate } from "react-router-dom";

const CuacaPage = () => {
  const [dataCuaca, setDataCuaca] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [excelFile, setExcelFile] = useState(null);

  const navigate = useNavigate();

  const getDataCuaca = async () => {
    try {
      const response = await ServiceCuaca.get();
      setDataCuaca(response);
    } catch (error) {
      SweetAlertService.showError("Error", error.message);
    }
  };

  const handleDeleteAll = async () => {
    SweetAlertService.confirmDeletion().then(async (e) => {
      if (e.isConfirmed) {
        try {
          const response = await ServiceCuaca.deleteAll();
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
    navigate("/cuaca/add-cuaca");
  };

  const handleUploadExcel = async () => {
    if (!excelFile) {
      return SweetAlertService.showError("Gagal", "Silakan pilih file terlebih dahulu");
    }

    const formData = new FormData();
    formData.append("file", excelFile);

    try {
      const response = await ServiceCuaca.importExcel(formData);
      if (response.status) {
        SweetAlertService.showSuccess("Berhasil", response.message);
        getDataCuaca();
        setShowModal(false);
        setExcelFile(null);
      } else {
        SweetAlertService.showError("Gagal", response.message);
      }
    } catch (error) {
      SweetAlertService.showError("Error", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getDataCuaca();
  }, []);

  return (
    <Layout>
      <div className="px-6 py-4 w-full">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-800 uppercase">Data Cuaca</h1>
              <p className="text-sm text-gray-500">Informasi curah hujan dan suhu per kecamatan.</p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button
                onClick={handleNavigateAdd}
                className="bg-blue-500 hover:bg-blue-400 text-white text-sm px-4 py-2 rounded-md shadow"
              >
                + Tambah Cuaca
              </button>
              {/* <button
                onClick={() => setShowModal(true)}
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

          <div className="mt-4">
            {dataCuaca?.length > 0 ? (
              <TableCuaca dataCuaca={dataCuaca} />
            ) : (
              <div className="text-center text-gray-500 text-sm py-8">
                Belum ada data cuaca yang tersedia.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popup Modal Import Excel */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
            <h2 className="text-lg font-semibold mb-4">Unggah File Excel Cuaca</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Pilih File Excel</label>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => setExcelFile(e.target.files[0])}
                className="w-full text-sm border p-2 rounded"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Batal
              </button>
              <button
                onClick={handleUploadExcel}
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

export default CuacaPage;
