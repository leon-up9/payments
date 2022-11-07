import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import LoadingPage from "../components/Pages/LoadingPage/LoadingPage";
import PaymentHistoryPage from "../components/Pages/PaymentHistoryPage/PaymentHistoryPage";
import PaymentPage from "../components/Pages/PaymentPage/PaymentPage";
import { ROUTES } from "./consts";
import { ProtectedLayout } from "./PrivateRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.LOADING} element={<LoadingPage />} />
      <Route element={<ProtectedLayout authenticationPath={ROUTES.LOADING} />}>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} index element={<PaymentPage />} />
          <Route
            path={ROUTES.PAYMENTS_HISTORY}
            element={<PaymentHistoryPage />}
          />
          <Route path="*" element={<PaymentPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
