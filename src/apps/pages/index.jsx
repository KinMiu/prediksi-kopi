import Homepage from './Homepage'
import Login from './LoginPage'
import SignupPage from './SignupPage'
import DataProduksiPage from './admin/DataProduksiPage'
import CuacaPage from './admin/CuacaPage'
import KecamatanPage from './admin/KecamatanPage'
import FormAddProduksiPage from './admin/FormAddProduksiPage'
import FormAddKecamatanPage from './admin/FormAddKecamatanPage'
import FormAddCuacaPage from './admin/FormAddCuacaPage'
import PrediksiPage from './admin/DataPrediksi'
import FormAddPrediksiPage from './admin/FormAddPrediksiPage'
import DetailPrediksiPage from './admin/DetailPrediksiPage'
import ProfilePage from './admin/ProfilePage'
import ChangeNamePage from './admin/ChangeName'
import ChangePasswordPage from './admin/ChangePassword'

export const page = {
  homepage: <Homepage />,
  loginpage: <Login />,
  signup: <SignupPage />,
  ChangePasswordPage: <ChangePasswordPage />,
  ChangeNamePage: <ChangeNamePage />,
  ProfilePage: <ProfilePage />,
  DataProduksiPage: <DataProduksiPage />,
  CuacaPage: <CuacaPage />,
  KecamatanPage: <KecamatanPage />,
  PrediksiPage: <PrediksiPage />,
  FormAddProduksiPage: <FormAddProduksiPage />,
  FormAddKecamatanPage : <FormAddKecamatanPage />,
  FormAddCuacaPage: <FormAddCuacaPage />,
  FormAddPrediksiPage: <FormAddPrediksiPage />,
  DetailPrediksiPage: <DetailPrediksiPage />,
}