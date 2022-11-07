import React, { useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../../services/client";
import {
  IPaymentHistory,
  IPaymentHistoryResponse,
} from "../../../types/payment";

const Header = () => (
  <div className="text-2xl font-bold text-center">Payment History</div>
);

const displayAmount = (amount: number) => amount / 100;

const mapPaymentHistory = (
  history: IPaymentHistoryResponse[]
): IPaymentHistory[] => {
  return history.map((payment) => {
    const { userName, bookName } = JSON.parse(payment.note);
    const { id, processAt, status, amountPennies } = payment;
    return {
      userName,
      bookName,
      amount: displayAmount(amountPennies),
      id,
      processAt,
      status,
    };
  });
};

const PaymentHistoryPage = () => {
  const [payments, setPayments] = React.useState<IPaymentHistory[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      api.getPayments().then((res) => {
        const payments: IPaymentHistoryResponse[] = res.result;

        setPayments((prev) => {
          setIsLoading(false);
          return mapPaymentHistory(payments);
        });
      });
    };

    fetchData().catch((err) => {
      toast.error(err.message);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (payments.length === 0) {
    return (
      <div className="text-center">
        <Header />
        <p className="text-xl">No payments yet</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="overflow-x-auto relative mt-5 max-w-3xl m-auto">
        <table className="w-full text-sm text-left text-gray-500 table-auto  ">
          <thead className="text-regular text-white uppercase bg-[var(--main-color)]">
            <tr>
              <th scope="col" className="py-3 px-6">
                Book Title
              </th>
              <th scope="col" className="py-3 px-6 hidden sm:table-cell">
                Name of Payer
              </th>
              <th scope="col" className="py-3 px-6">
                Amount
              </th>
              <th scope="col" className="py-3 px-6 hidden sm:table-cell">
                Date Paid
              </th>
              <th scope="col" className="py-3 px-6">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr className="bg-white border-b" key={`tr_${payment.id}`}>
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                >
                  {payment.bookName}
                </th>
                <td className="py-4 px-6 hidden sm:table-cell">
                  {payment.userName}
                </td>
                <td className="py-4 px-6">${payment.amount}</td>
                <td className="py-4 px-6 hidden sm:table-cell">
                  {new Date(payment.processAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-6">{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PaymentHistoryPage;
