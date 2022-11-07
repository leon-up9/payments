import { toast } from "react-toastify";
import api from "../../../services/client";
import { IPaymentInfo } from "../../../types/payment";
import PaymentForm from "../../PaymentForm/PaymentForm";

const PaymentPage = () => {
  const onFormButtonClick = async (info: IPaymentInfo) => {
    return api
      .createPayment(info)
      .then(() => {
        toast.success("Payment created successful");
      })
      .catch((err) => {
        toast.error(err.error);
      });
  };

  return <PaymentForm onSubmit={onFormButtonClick} />;
};

export default PaymentPage;
