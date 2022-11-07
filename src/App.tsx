import { ToastContainer } from "react-toastify";
import "./App.css";
import { AuthProvider } from "./context/authContext";
import { AppRoutes } from "./routes/Routes";

export default function App() {
  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />
    </>
  );
}
