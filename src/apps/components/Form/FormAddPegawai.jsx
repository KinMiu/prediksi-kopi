import { useState } from "react";
import SweetAlertService from "../../helper/sweetalertService";
import ServiceSurat from "../../api/service/Produksi.service";

const FormAddSurat = ({ onClose }) => {
  const [tanggalTerima, setTanggalTerima] = useState("");
  const [tanggalSurat, setTanggalSurat] = useState("");
  const [noSurat, setNoSurat] = useState("");
  const [pengirim, setPengirim] = useState("");
  const [perihal, setPerihal] = useState("");
  const [file, setFile] = useState(null);
  const [keterangan, setKeterangan] = useState("");

  const handleSubmit = async () => {
    try {
      if (
        !tanggalTerima ||
        !tanggalSurat ||
        !noSurat ||
        !pengirim ||
        !perihal ||
        !file
      ) {
        return SweetAlertService.showError("Error", "Lengkapi semua data!");
      }

      const formData = new FormData();
      formData.append("tanggal_terima", tanggalTerima);
      formData.append("tanggal_surat", tanggalSurat);
      formData.append("no_surat", noSurat);
      formData.append("pengirim", pengirim);
      formData.append("perihal", perihal);
      formData.append("file", file);
      formData.append("keterangan", keterangan);

      const response = await ServiceSurat.addSuratMasuk(formData);
      if (response.status === false) {
        return SweetAlertService.showError("Gagal", response.message);
      }

      SweetAlertService.showSuccess("Berhasil", response.message);
      window.location.reload();
    } catch (error) {
      SweetAlertService.showError("Error !!", error.message);
    }
  };

  return (
    <div className="relative z-10" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl sm:max-w-lg w-full">
            <div className="bg-white p-6 flex flex-col gap-3">
              <p className="text-xl font-semibold text-gray-900">
                Tambah Surat Masuk
              </p>
              <input
                type="date"
                value={tanggalTerima}
                onChange={(e) => setTanggalTerima(e.target.value)}
                className="border rounded px-3 py-1"
                placeholder="Tanggal Terima"
              />
              <input
                type="date"
                value={tanggalSurat}
                onChange={(e) => setTanggalSurat(e.target.value)}
                className="border rounded px-3 py-1"
                placeholder="Tanggal Surat"
              />
              <input
                type="text"
                value={noSurat}
                onChange={(e) => setNoSurat(e.target.value)}
                className="border rounded px-3 py-1"
                placeholder="No Surat"
              />
              <input
                type="text"
                value={pengirim}
                onChange={(e) => setPengirim(e.target.value)}
                className="border rounded px-3 py-1"
                placeholder="Pengirim"
              />
              <input
                type="text"
                value={perihal}
                onChange={(e) => setPerihal(e.target.value)}
                className="border rounded px-3 py-1"
                placeholder="Perihal"
              />
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="border rounded px-3 py-1"
              />
              <textarea
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
                className="border rounded px-3 py-1"
                placeholder="Keterangan"
              />
            </div>
            <div className="bg-gray-50 px-4 py-3 flex justify-end gap-2">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded"
              >
                Upload
              </button>
              <button
                onClick={onClose}
                className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddSurat;
