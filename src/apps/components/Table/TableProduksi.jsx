import { useState } from "react";
import SweetAlertService from "../../helper/sweetalertService";
import ServiceProduksi from "../../api/service/Produksi.service";

const TableProduksi = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleDelete = async (id) => {
    try {
      const response = await ServiceProduksi.delete(id);
      SweetAlertService.showSuccess("Berhasil", "Data berhasil dihapus");
      window.location.reload();
    } catch (error) {
      SweetAlertService.showError("Gagal", error.message || "Terjadi kesalahan");
    }
  };

  const totalPages = itemsPerPage === "all" ? 1 : Math.ceil(data.length / itemsPerPage);
  const currentData =
    itemsPerPage === "all"
      ? data
      : data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    const val = e.target.value;
    setItemsPerPage(val === "all" ? "all" : parseInt(val));
    setCurrentPage(1);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm text-gray-600">
          Tampilkan{" "}
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="all">Semua</option>
          </select>{" "}
          data per halaman
        </label>
      </div>

      <table className="min-w-full bg-white border border-gray-200 text-sm">
        <thead>
          <tr className="bg-gray-100">
            {[
              "No",
              "Tahun",
              "Zona",
              "Kecamatan",
              "TBM (Ha)",
              "TM (Ha)",
              "TR (Ha)",
              "JMH (Ha)",
              "Produksi (Ton)",
              "Produktivitas (Kg/Ha/Th)",
              "Aksi",
            ].map((header, idx) => (
              <th key={idx} className="px-4 py-2 border">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan={11} className="text-center py-4 text-gray-500 italic">
                Tidak ada data produksi.
              </td>
            </tr>
          ) : (
            currentData.map((item, index) => {
              const luas = item.LUAS_AREAL || {};
              const kecamatan = item.KECAMATAN;

              return (
                <tr key={item._id || index} className="border-b">
                  <td className="px-4 py-2 border text-center">
                    {(itemsPerPage === "all" ? index : (currentPage - 1) * itemsPerPage + index + 1)}
                  </td>
                  <td className="px-4 py-2 border">{item.TAHUN}</td>
                  <td className="px-4 py-2 border">{kecamatan?.ZONA || "-"}</td>
                  <td className="px-4 py-2 border">{kecamatan?.NAMA || "-"}</td>
                  <td className="px-4 py-2 border text-right">
                    {typeof luas.TBM === "number" ? luas.TBM.toFixed(1) : "-"}
                  </td>
                  <td className="px-4 py-2 border text-right">
                    {typeof luas.TM === "number" ? luas.TM.toFixed(1) : "-"}
                  </td>
                  <td className="px-4 py-2 border text-right">
                    {typeof luas.TR === "number" ? luas.TR.toFixed(1) : "-"}
                  </td>
                  <td className="px-4 py-2 border text-right">
                    {typeof luas.JUMLAH === "number" ? luas.JUMLAH.toFixed(1) : "-"}
                  </td>
                  <td className="px-4 py-2 border text-right">
                    {typeof item.PRODUKSI_TON === "number" ? item.PRODUKSI_TON.toFixed(1) : "-"}
                  </td>
                  <td className="px-4 py-2 border text-right">
                    {typeof item.PRODUKTIVITAS === "number" ? item.PRODUKTIVITAS.toFixed(1) : "-"}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded text-xs"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && itemsPerPage !== "all" && (
        <div className="flex justify-center items-center mt-4 gap-2 flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
          >
            ⬅ Prev
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 text-sm rounded ${
                  page === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
};

export default TableProduksi;
