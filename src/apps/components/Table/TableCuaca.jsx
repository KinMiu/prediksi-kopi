import SweetAlertService from "../../helper/sweetalertService";
import ServiceCuaca from "../../api/service/Cuaca.service";

const TableCuaca = ({ dataCuaca }) => {

  const handleDelete = async (id) => {
    try {
      const response = await ServiceCuaca.delete(id);
      SweetAlertService.showSuccess("Berhasil", response.message);
      window.location.reload();
    } catch (error) {
      SweetAlertService.showError("Gagal", error.message);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 text-sm">
        <thead>
          <tr className="bg-gray-100">
            {[
              "No",
              "Tahun",
              "Bulan",
              "Suhu (°C)",
              "Kelembaban (%)",
              "Curah Hujan (mm)",
              "Kecepatan Angin (m/s)",
              "Radiasi Matahari (kJ/m²)",
              "Aksi",
            ].map((header, index) => (
              <th key={index} className="px-4 py-2 border">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataCuaca.length === 0 ? (
            <tr>
              <td colSpan={9} className="text-center py-4 text-gray-500 italic">
                Tidak ada data cuaca.
              </td>
            </tr>
          ) : (
            dataCuaca.map((data, index) => (
              <tr key={data._id} className="border-b">
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">{data.TAHUN}</td>
                <td className="px-4 py-2 border">{data.BULAN}</td>
                <td className="px-4 py-2 border text-right">{data.SUHU ?? "-"}</td>
                <td className="px-4 py-2 border text-right">{data.KELEMBABAN ?? "-"}</td>
                <td className="px-4 py-2 border text-right">{data.CURAH_HUJAN ?? "-"}</td>
                <td className="px-4 py-2 border text-right">{data.KECEPATAN_ANGIN ?? "-"}</td>
                <td className="px-4 py-2 border text-right">{data.RADIASI_MATAHARI ?? "-"}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleDelete(data._id)}
                    className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded text-xs"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableCuaca;
