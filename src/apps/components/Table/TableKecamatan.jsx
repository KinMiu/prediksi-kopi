import ServiceKecamatan from "../../api/service/Kecamatan.service";
import SweetAlertService from "../../helper/sweetalertService";

const TableKecamatan = ({ dataKecamatan }) => {
  // console.log(dataKecamatan)
  const TableHead = ["No", "Nama Kecamatan", "Zona", "Action"];

  const handleDelete = async (id) => {
    try {
      const response = await ServiceKecamatan.delete(id);
      SweetAlertService.showSuccess("Berhasil", response.message);
      window.location.reload();
    } catch (error) {
      SweetAlertService.showError("Error", error.message);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left text-sm">
            {TableHead.map((head, index) => (
              <th key={index} className="px-4 py-2 border-r">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataKecamatan?.map((data, index) => (
            <tr key={data._id} className="border-b text-sm">
              <td className="px-4 py-2 border-r">{index + 1}</td>
              <td className="px-4 py-2 border-r">{data.NAMA}</td>
              <td className="px-4 py-2 border-r">{data.ZONA}</td>
              <td className="px-4 py-2 flex flex-row gap-1">
                {/* <button
                  onClick={() => openFormModal(data.IDKECAMATAN)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button> */}
                <button
                  onClick={() => handleDelete(data._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableKecamatan;
