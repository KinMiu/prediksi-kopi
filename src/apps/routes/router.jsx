import { createBrowserRouter } from "react-router-dom";
import { page } from '../pages'
import { RequireAuth } from "./utils/requireAuth";

const router = createBrowserRouter([
  {
    path: '/login',
    element: page.loginpage
  },
  {
    path: '/sign-up',
    element: page.signup
  },
  {
    path: '/',
    element: <RequireAuth redirectPath="/login" />,
    children: [
      {
        path: '/',
        element: page.homepage
      },
      {
        path: '/profile/:id',
        element: page.ProfilePage
      },
      {
        path: '/profile/change-password/:id',
        element: page.ChangePasswordPage
      },
      {
        path: '/profile/change-name/:id',
        element: page.ChangeNamePage
      },
      {
        path: '/produksi',
        element: page.DataProduksiPage
      },
      {
        path: '/cuaca',
        element: page.CuacaPage
      },
      {
        path: '/jenis-surat-page',
        element: page.JenisSuratPage
      },
      {
        path: '/kecamatan',
        element: page.KecamatanPage
      },
      {
        path: '/prediksi',
        element: page.PrediksiPage
      },
      {
        path: '/prediksi/add-prediksi',
        element: page.FormAddPrediksiPage
      },
      {
        path: '/prediksi/detail/:id',
        element: page.DetailPrediksiPage
      },
      {
        path: '/produksi/add-produksi',
        element: page.FormAddProduksiPage
      },
      {
        path: '/kecamatan/add-kecamatan',
        element: page.FormAddKecamatanPage
      },
      {
        path: '/cuaca/add-cuaca',
        element: page.FormAddCuacaPage
      },
    ]
  },
])

export default router