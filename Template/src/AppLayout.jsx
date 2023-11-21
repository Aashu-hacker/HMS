// utils
import { lazy, Suspense } from 'react';

// components
import ScrollProgress from '@ui/ScrollProgress';
import Panel from '@layout/Panel';
import Sidebar from '@layout/Sidebar';
import { Navigate, Route, Routes } from 'react-router-dom';
import BottomMenu from '@layout/BottomMenu';
import WidgetsLoader from '@components/WidgetsLoader';
import RoomType from '@pages/RoomManagement/RoomType';
import RateMaster from '@pages/RoomManagement/RateMaster';

// hooks
import useWindowSize from '@hooks/useWindowSize';
import usePageIsOverflow from '@hooks/usePageIsOverflow';
import { useRef, useEffect } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import Login from '@pages/login/Login';
import DepatrmentSetup from '@pages/DepatrmentSetup';
import StateCitySetup from '@pages/StateCitySetup/StateCitySetup';
import CompanySetup from '@pages/CompanySetup';
import Billgroup from '@pages/master/bill group/Billgroup';
import PincodeMaster from '@pages/StateCitySetup/PincodeMaster';
import BillGroup from '@pages/master/bill group/Billgroup';
import Pathology from '@pages/master/pathlogy/Pathology';
import StoreMaster from '@pages/master/store/StoreMaster';
import Servicedetails from '@pages/master/Service Details/Servicedetails';
import PageNotFound from '@pages/PageNotFound';
import AppointmetScreen from '@pages/appointmentScreen/AppointmetScreen';
import PatientsList from '@pages/appointmentScreen/patientList/PatientList';
import PatientRegisterForm2 from '@pages/appointmentScreen/patientRegisterForm2/PatientRegisterForm2';
import Product from '@pages/Product/Product';
import CathLab from '@pages/CathLab/CathLab';
import AppointmentAndShedulingSetup from '@pages/master/appointmnet_&_shedulingSetup/AppointmentAndShedulingSetup';
import AppointmentBilling from '@pages/appointmentScreen/appointment_billing_screen/AppointmentBilling';
import Procurement from '@pages/Procurement/Procurement';
import ProductForm from '@pages/Product/ProductForm';

// pages
const DashboardA = lazy(() => import('@pages/DashboardA'));
const DashboardB = lazy(() => import('@pages/DashboardB'));
const DashboardC = lazy(() => import('@pages/DashboardC'));
const DashboardD = lazy(() => import('@pages/DashboardD'));
const DashboardE = lazy(() => import('@pages/DashboardE'));
const DashboardF = lazy(() => import('@pages/DashboardF'));
const DashboardG = lazy(() => import('@pages/DashboardG'));
const DashboardH = lazy(() => import('@pages/DashboardH'));
const DashboardI = lazy(() => import('@pages/DashboardI'));
const DashboardJ = lazy(() => import('@pages/DashboardJ'));
const DashboardK = lazy(() => import('@pages/DashboardK'));
const DoctorAppointments = lazy(() => import('@pages/DoctorAppointments'));
const PatientAppointments = lazy(() => import('@pages/PatientAppointments'));
const Patients = lazy(() => import('@pages/Patients'));
const Tests = lazy(() => import('@pages/Tests'));
const Doctors = lazy(() => import('@pages/Doctors'));
const StaffList = lazy(() => import('@pages/Staff'));
const DoctorMessenger = lazy(() => import('@pages/DoctorMessenger'));
const PatientMessenger = lazy(() => import('@pages/PatientMessenger'));
const DoctorsReviews = lazy(() => import('@pages/DoctorsReviews'));
const PatientReviews = lazy(() => import('@pages/PatientReviews'));
const Finances = lazy(() => import('@pages/Finances'));
const Settings = lazy(() => import('@pages/Settings'));
const Designation = lazy(() => import('@pages/master/designation/Designation'));
const Radiology = lazy(() => import('@pages/master/radiology/Radiology'));
const Payment_category = lazy(() => import('@pages/master/payment_category/Payment_category'));
const Outsource_diagnostics = lazy(() => import('@pages/master/outsource_diagnostics/Outsource_diagnostics'));
const Surgery_packages = lazy(() => import('@pages/master/surgery_packages/SurgeryPackages'));
const AddSurgicalPackage = lazy(() => import('@pages/master/surgery_packages/addsurgicalpackage/AddSurgicalPackage'));
const SurgicalService = lazy(() => import('@pages/master/surgery_packages/surgicalService/SurgicalService'));
const AddServiceScreen = lazy(() => import('@pages/master/surgery_packages/addServiceScreen/AddService'));
const Store = lazy(() => import('@pages/store_screens/store/Store'));
const Product_transfer = lazy(() => import('@pages/store_screens/productTransfer/ProductTransfer'));
const Product_Issue = lazy(() => import('@pages/store_screens/productIssue/ProductIssue'));
const Product_Return = lazy(() => import('@pages/store_screens/productReturn/ProductReturn'));
const Asset_Register = lazy(() => import('@pages/store_screens/assetRegister/AssetRegister'));
//staff
const Nursing = lazy(() => import('@pages/staff/nursing_staff/Nursing'));
const Admin = lazy(() => import('@pages/staff/admin_staff/Admin'));
const Consultant = lazy(() => import('@pages/staff/consultants_staff/Consultans'));

const AppLayout = () => {
    const appRef = useRef(null);
    const isOverflow = usePageIsOverflow();
    const { width } = useWindowSize();
    const isMobile = width < 768;
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("loginToken")

    const userIsNotLoggedIn = localStorage.getItem("loginToken") ? true : false

    useEffect(() => {
        if (appRef.current) {
            appRef.current.scrollTo(0, 0);
        }
        if (!userIsNotLoggedIn) {
            navigate('/login');
        }
    }, [userIsNotLoggedIn]);

    return (
        <>
            {token ?
                <div className="app" ref={appRef}>
                    {isOverflow ? <ScrollProgress /> : null}
                    <Sidebar />
                    <div className="app_content">
                        <Panel />
                        <Suspense fallback={<WidgetsLoader />}>
                            <Routes>
                                <Route path="/" element={<Navigate to="/dashboard_a" />} />
                                <Route path="/dashboard_a" element={<DashboardA />} />
                                <Route path="/dashboard_b" element={<DashboardB />} />
                                <Route path="/dashboard_c" element={<DashboardC />} />
                                <Route path="/dashboard_d" element={<DashboardD />} />
                                <Route path="/dashboard_e" element={<DashboardE />} />
                                <Route path="/dashboard_f" element={<DashboardF />} />
                                <Route path="/dashboard_g" element={<DashboardG />} />
                                <Route path="/dashboard_h" element={<DashboardH />} />
                                <Route path="/dashboard_i" element={<DashboardI />} />
                                <Route path="/dashboard_j" element={<DashboardJ />} />
                                <Route path="/dashboard_k" element={<DashboardK />} />
                                <Route path="/doctor_appointments" element={<DoctorAppointments />} />
                                <Route path="/patient_appointments" element={<PatientAppointments />} />
                                <Route path="/bill_group" element={<BillGroup />} />
                                <Route path="/service-details" element={<Servicedetails />} />
                                <Route path="/patients" element={<Patients />} />
                                <Route path="/tests" element={<Tests />} />
                                <Route path="/doctors" element={<Doctors />} />
                                <Route path="/staff" element={<StaffList />} />
                                <Route path="/doctor_messenger" element={<DoctorMessenger />} />
                                <Route path="/patient_messenger" element={<PatientMessenger />} />
                                <Route path="/doctor_reviews" element={<DoctorsReviews />} />
                                <Route path="/patient_reviews" element={<PatientReviews />} />
                                <Route path="/company_setup" element={<CompanySetup />} />
                                <Route path="/department_setup" element={<DepatrmentSetup />} />
                                <Route path="/designation_master" element={<Designation />} />
                                <Route path="/room-type" element={<RoomType />} />
                                <Route path="/rate-master" element={<RateMaster />} />
                                <Route path="/product" element={<Product />} />
                                <Route path="/product-form" element={<ProductForm />} />
                                <Route path="/state-and-city" element={<StateCitySetup />} />
                                <Route path="/pincode" element={<PincodeMaster />} />
                                <Route path="/finances" element={<Finances />} />
                                <Route path="/settings" element={<Settings />} />
                                <Route path="/404" element={<PageNotFound />} />
                                <Route path="*" element={<Navigate to="/dashboard_a" replace />} />
                                <Route path="/radiology" element={<Radiology />} />
                                <Route path="/pathlogy" element={<Pathology />} />
                                <Route path="/store" element={<StoreMaster />} />
                                <Route path="/appointment_sheduling_setup" element={<AppointmentAndShedulingSetup />} />
                                <Route path="/appointment_billing" element={<AppointmentBilling />} />
                                <Route path="/appointment_screen" element={<AppointmetScreen />} />
                                <Route path="/payment_category" element={<Payment_category />} />
                                <Route path="/outsource_diagnostics" element={<Outsource_diagnostics />} />
                                <Route path="/surgery_packages" element={<Surgery_packages />} />
                                <Route path="/add_surgical_package" element={<AddSurgicalPackage />} />
                                <Route path="/surgery_packages/:id" element={<SurgicalService />} />
                                <Route path="/add_service_screen" element={<AddServiceScreen />} />
                                <Route path="/store_screen" element={<Store />} />
                                <Route path="/product_transfer" element={<Product_transfer />} />
                                <Route path="/product_issue" element={<Product_Issue />} />
                                <Route path="/product_return" element={<Product_Return />} />
                                <Route path="/asset_register" element={<Asset_Register />} />

                                <Route path="/patient_list" element={<PatientsList />} />
                                <Route path="patient_registration_form2" element={<PatientRegisterForm2 />} />
                                <Route path="/procurement" element={<Procurement />} />
                                <Route path="/cathlab" element={<CathLab />} />

                                {/* staff */}
                                <Route path='/nursing' element={<Nursing />} />
                                <Route path='/admin' element={<Admin />} />
                                <Route path='/consultant' element={<Consultant />} />
                            </Routes>
                        </Suspense>
                    </div>
                    {isMobile ? <BottomMenu /> : null}
                </div> : <div className="app" ref={appRef}>
                    {isOverflow ? <ScrollProgress /> : null}
                    <div className="app_content">
                        <Suspense fallback={<WidgetsLoader />}>
                            <Routes>
                                <Route path="/" element={<Navigate to="/login" />} />
                                <Route path="/login" element={<Login />} />
                            </Routes>
                        </Suspense>
                    </div>
                    {isMobile ? <BottomMenu /> : null}
                </div>}
        </>
    )
}

export default AppLayout;