export type TPaymentForm = {
  note: string;
  userName: string;
  amount: number | string;
  cardNumber: string;
  cardExpMonth: string;
  cardExpYear: string;
  cvv: string;
};

export interface IPaymentInfo extends TPaymentForm {
  referenceId: string;
  processAt: string;
}

export interface IPaymentHistory {
  bookName: string;
  userName: string;
  amount: number;
  processAt: string;
  status: string;
  id: string;
}

export interface IPaymentHistoryResponse {
  amountPennies: number;
  authTokenId: number;
  createdAt: string;
  id: string;
  note: string;
  processAt: string;
  referenceId: string;
  status: string;
  updatedAt: string;
}
