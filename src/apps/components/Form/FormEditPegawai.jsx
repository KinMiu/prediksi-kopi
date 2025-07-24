import { useEffect, useState } from "react";
import SweetAlertService from "../../helper/sweetalertService";
import ServicePegawai from "../../api/service/Produksi.service";


const FormEditPegawai = ( {onClose, id} ) => {

  const [name, setName] = useState('')
  const [subarea, setSubarea] = useState('')
  const [position, setPosition] = useState('')
  const [employee, setEmployee] = useState('')
  const [payscale, setPayscale] = useState('')
  const [tmk, setTmk] = useState('')
  const [masaKerja, setMasaKerja] = useState('')
  const [usia, setUsia] = useState('')
  const [religion, setReligion] = useState('')
  const [education, setEducation] = useState('')

  const getPegawai = async (ID) => {
    try {
      const response = await ServicePegawai.getPegawaiByID(ID);
      const data = response.data
      // console.log(data)
      setName(data.NAME)
      setSubarea(data.SUBAREA)
      setPosition(data.POSITION)
      setEmployee(data.EMPLOYEE)
      setPayscale(data.PAYSCALE)
      setTmk(data.TMK)
      setMasaKerja(data.MASAKERJA)
      setUsia(data.USIA)
      setReligion(data.RELIGION)
      setEducation(data.EDUCATION)
    } catch (error) {
      SweetAlertService.showError("Error", error.response.data.message);
    }
  };

  const handleSubmit = async () => {
    if (name === "" || subarea === "") {
      onClose();
      SweetAlertService.showError("Kesalahan", "Harap isi semua kolom.");
      return;
    }
    const data = {
      NAME: name,
      EMAIL: subarea,
      AGE: position,
      ADDRESS: employee
    }
    try {
      // console.log(data)
      const response = await ServicePegawai.editPegawai(id, data)
      if (response.status === false) {
        return SweetAlertService.showError(`${response.message}`, response.message)
      }
      SweetAlertService.showSuccess(`${response.message}`, response.message)
      window.location.reload();
    } catch (error) {
      SweetAlertService.showError('Error !!', error)
    }
  }

  const handleClose = () => {
    onClose()
  }

  useEffect(() => {
    getPegawai(id)
  }, [])

  return (
    <div 
      className="relative z-10" 
      aria-labelledby="modal-title" 
      role="dialog" 
      aria-modal="true"
    >
      <div 
        className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" 
        aria-hidden="true"
      >
      </div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex flex-col gap-3 items-center">
              <p 
                className="text-xl uppercase font-semibold leading-6 text-gray-900" 
                id="modal-title"
              >
                Edit Pegawai
              </p>
              <div className="w-full flex flex-col sm:flex-col  gap-3 mt-3">
                <div className="sm:mx-4 sm:mt-0">
                  <div className="">
                    <div className="">
                      <p className="text-base mb-1 text-gray-500">Nama</p>
                      <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nama"
                        className="bg-white border border-green-700 rounded px-2 py-1 w-full"
                      />
                    </div>
                    <div className="mt-2">
                      <p className="text-base mb-1 text-gray-500">Subarea</p>
                      <input 
                        type=""
                        value={subarea}
                        onChange={(e) => setSubarea(e.target.value)}
                        placeholder="Email"
                        className="bg-white border border-green-700 rounded px-2 py-1 w-full"
                      />
                    </div>
                    <div className="mt-2">
                      <p className="text-base mb-1 text-gray-500">Position</p>
                      <input 
                        type=""
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        placeholder="Umur"
                        className="bg-white border border-green-700 rounded px-2 py-1 w-full"
                      />
                    </div>
                    <div className="mt-2">
                      <p className="text-base mb-1 text-gray-500">Employee</p>
                      <input 
                        type="text"
                        value={employee}
                        onChange={(e) => setEmployee(e.target.value)}
                        placeholder="Address"
                        className="bg-white border border-green-700 rounded px-2 py-1 w-full"
                      />
                    </div>
                    <div className="mt-2">
                      <p className="text-base mb-1 text-gray-500">PayScale</p>
                      <input 
                        type="text"
                        value={payscale}
                        onChange={(e) => setPayscale(e.target.value)}
                        placeholder="Address"
                        className="bg-white border border-green-700 rounded px-2 py-1 w-full"
                      />
                    </div>
                    <div className="mt-2">
                      <p className="text-base mb-1 text-gray-500">TMK</p>
                      <input 
                        type="date"
                        value={tmk}
                        onChange={(e) => setTmk(e.target.value)}
                        placeholder="Address"
                        className="bg-white border border-green-700 rounded px-2 py-1 w-full"
                      />
                    </div>
                    <div className="mt-2">
                      <p className="text-base mb-1 text-gray-500">Masa Kerja</p>
                      <input 
                        type="number"
                        value={parseInt(masaKerja)}
                        onChange={(e) => setMasaKerja(e.target.value)}
                        placeholder="Address"
                        className="bg-white border border-green-700 rounded px-2 py-1 w-full"
                      />
                    </div>
                    <div className="mt-2">
                      <p className="text-base mb-1 text-gray-500">Usia</p>
                      <input 
                        type="number"
                        value={parseInt(usia)}
                        onChange={(e) => setUsia(e.target.value)}
                        placeholder="Address"
                        className="bg-white border border-green-700 rounded px-2 py-1 w-full"
                      />
                    </div>
                    <div className="mt-2">
                      <p className="text-base mb-1 text-gray-500">Religion</p>
                      <input 
                        type="text"
                        value={religion}
                        onChange={(e) => setReligion(e.target.value)}
                        placeholder="Address"
                        className="bg-white border border-green-700 rounded px-2 py-1 w-full"
                      />
                    </div>
                    <div className="mt-2">
                      <p className="text-base mb-1 text-gray-500">Education</p>
                      <input 
                        type="text"
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                        placeholder="Address"
                        className="bg-white border border-green-700 rounded px-2 py-1 w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button 
                type="button" 
                onClick={handleSubmit}
                className="inline-flex w-full justify-center rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-300 sm:ml-3 sm:w-auto"
              >
                Upload
              </button>
              <button 
                type="button" 
                onClick={handleClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormEditPegawai