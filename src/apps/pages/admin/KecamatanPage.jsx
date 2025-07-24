import { useEffect, useState } from "react";
import Layout from "../Layout";
import SweetAlertService from "../../helper/sweetalertService";
import ServiceKecamatan from "../../api/service/Kecamatan.service";
import TableKecamatan from "../../components/Table/TableKecamatan";
import { useNavigate } from "react-router-dom";

const KecamatanPage = () => {
  const navigate = useNavigate();
  const [dataKecamatan, setDataKecamatan] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [excelFile, setExcelFile] = useState(null);

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
          const response = await ServiceKecamatan.deleteAll();
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

  const handleUploadExcel = async () => {
    if (!excelFile) {
      return SweetAlertService.showError("Gagal", "Silakan pilih file terlebih dahulu");
    }

    const formData = new FormData();
    formData.append("file", excelFile);

    try {
      const response = await ServiceKecamatan.uploadExcel(formData);
      if (response.status) {
        SweetAlertService.showSuccess("Berhasil", response.message);
        getKecamatan();
        setShowModal(false);
        setExcelFile(null);
      } else {
        SweetAlertService.showError("Gagal", response.message);
      }
    } catch (error) {
      SweetAlertService.showError("Error", error.response?.data?.message || error.message);
    }
  };

  const handleFileChange = (e) => {
    setExcelFile(e.target.files[0]);
  };

  const handleNavigateAdd = () => {
    navigate("/kecamatan/add-kecamatan");
  };

  useEffect(() => {
    getKecamatan();
  }, []);

  return (
    <Layout>
      <div className="px-6 py-4 w-full">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-800 uppercase">Data Kecamatan</h1>
              <p className="text-sm text-gray-500">Manajemen data kecamatan berdasarkan zona.</p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button
                onClick={handleNavigateAdd}
                className="bg-blue-500 hover:bg-blue-400 text-white text-sm px-4 py-2 rounded-md shadow"
              >
                + Tambah Kecamatan
              </button>
              {/* <button
                onClick={() => setShowModal(true)}
                className="bg-green-500 hover:bg-green-400 text-white text-sm px-4 py-2 rounded-md shadow"
              >
                📤 Upload Excel
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
            {dataKecamatan.length > 0 ? (
              <TableKecamatan dataKecamatan={dataKecamatan} />
            ) : (
              <div className="text-center text-gray-500 text-sm py-8">
                Belum ada data kecamatan yang tersedia.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Upload */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Upload Data Kecamatan via Excel</h2>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="mb-4 block w-full text-sm"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm"
              >
                Batal
              </button>
              <button
                onClick={handleUploadExcel}
                className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-md text-sm"
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

export default KecamatanPage;
