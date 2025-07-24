    import { useState } from "react";
    import ServicePegawai from "../../api/service/Produksi.service";
    import SweetAlertService from "../../helper/sweetalertService";
    import FormEditPegawai from "../Form/FormEditPegawai";

    const TableJenisSurat = ({ dataSurat }) => {
      const [isFormModalOpen, setIsFormModalOpen] = useState(false);
      const [id, setId] = useState("");

      const TableHead = [
        "No",
        "Nama",
        "Keterangan",
        "Action"
      ];

      const openFormModal = (ID) => {
        setId(ID);
        setIsFormModalOpen(true);
      };

      const closeFormModal = () => {
        setIsFormModalOpen(false);
      };

      const handleDelete = async (id) => {
        try {
          const response = await ServicePegawai.deleteSurat(id); // Pastikan method ini sesuai
          SweetAlertService.showSuccess("Success", response.message);
          window.location.reload();
        } catch (error) {
          SweetAlertService.showError("Error", error.message);
        }
      };

      return (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="w-full bg-gray-100 text-left text-sm">
                {TableHead.map((data, index) => (
                  <th key={index} className="px-4 py-2 border-r">
                    {data}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataSurat.map((data, index) => (
                <tr key={data._id} className="border-b text-sm">
                  <td className="px-4 py-2 border-r w-14">{index + 1}</td>
                  <td className="px-4 py-2 border-r">{data.NAMA}</td>
                  <td className="px-4 py-2 border-r">{data.DESKRIPSI}</td>
                  <td className="px-4 py-2 flex flex-row gap-1">
                    <button
                      onClick={() => openFormModal(data.IDJABATAN)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(data.IDJABATAN)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {isFormModalOpen && <FormEditPegawai id={id} onClose={closeFormModal} />}
            </tbody>
          </table>
        </div>
      );
    };

    export default TableJenisSurat;
    