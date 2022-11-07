import { FC } from "react";
import { IPaymentInfo, TPaymentForm } from "../../types/payment";
import { Formik, Field, Form, ErrorMessage } from "formik";
import FormError from "../FormError/FormError";

const year = new Date().getFullYear();
const years = Array.from(new Array(20), (val, index) => index + year);

const initialFormValues = {
  note: "",
  userName: "",
  cardNumber: "",
  cardExpMonth: "01",
  cardExpYear: `${years[0]}`,
  cvv: "",
  amount: "",
};

interface PaymentFormProps {
  onSubmit: (payment: IPaymentInfo) => Promise<void>;
}

const createUniqueReferenceId = () => {
  return Math.random().toString(36).substring(2, 15);
};

const PaymentForm: FC<PaymentFormProps> = ({ onSubmit }) => {
  const onFormSubmit = (payment: TPaymentForm) => {
    const data = {
      ...payment,
      referenceId: createUniqueReferenceId(),
      processAt: "now",
      amount: Number(payment.amount) * 100,
      note: JSON.stringify({
        bookName: payment?.note,
        userName: payment?.userName,
      }),
    };
    return onSubmit(data);
  };

  return (
    <div className="flex items-center justify-center px-5 pb-10 pt-16">
      <div className="w-full max-w-[600px] mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700">
        <div className="w-full pt-1 pb-5">
          <div className="bg-[var(--main-color)] text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
            <span className="material-symbols-outlined text-3xl">
              credit_card
            </span>
          </div>
        </div>
        <div className="mb-10">
          <h1 className="text-center font-bold text-xl uppercase">
            Secure payment info
          </h1>
        </div>

        <Formik
          initialValues={initialFormValues}
          validate={(values) => {
            const errors: any = {};
            Object.keys(values).forEach((key) => {
              if (!values[key as keyof TPaymentForm]) {
                errors[key] = "Required";
              }
            });

            if (
              (values.amount && isNaN(parseFloat(values.amount))) ||
              parseFloat(values.amount) <= 0
            ) {
              errors.amount = "Amount must be a positive number";
            }

            if (
              values.cardNumber &&
              (values.cardNumber.length !== 16 ||
                isNaN(Number(values.cardNumber)))
            ) {
              errors.cardNumber = "Card number must be 16 digits";
            }

            if (
              values.cvv &&
              (values.cvv.length !== 3 || isNaN(Number(values.cvv)))
            ) {
              errors.cvv = "CVV must be 3 digits";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            onFormSubmit(values).finally(() => setSubmitting(false));
          }}
        >
          {({ handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label className="font-bold text-sm mb-2 ml-1">
                  Name on card
                </label>
                <div>
                  <input
                    className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="John Smith"
                    type="text"
                    name="userName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="userName"
                    render={(msg) => <FormError>{msg}</FormError>}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="font-bold text-sm mb-2 ml-1">
                  Card number
                </label>
                <div>
                  <Field
                    name="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                  ></Field>
                  <ErrorMessage
                    name="cardNumber"
                    render={(msg) => <FormError>{msg}</FormError>}
                  />
                </div>
              </div>
              <div className="mb-3  flex flex-col">
                <label className="font-bold text-sm mb-2 ml-1">
                  Expiration date
                </label>
                <div className="flex gap-3">
                  <div className="w-1/2">
                    <div>
                      <Field
                        as="select"
                        name="cardExpMonth"
                        className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                      >
                        {Array.from(new Array(12), (val, index) => index + 1)
                          .map((month) => month.toString().padStart(2, "0"))
                          .map((month) => (
                            <option key={month} value={month}>
                              {month}
                            </option>
                          ))}
                      </Field>
                      <ErrorMessage
                        name="cardExpMonth"
                        render={(msg) => <FormError>{msg}</FormError>}
                      />
                    </div>
                  </div>
                  <div className="w-1/2">
                    <Field
                      as="select"
                      name="cardExpYear"
                      className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                    >
                      {years.map((year, index) => {
                        return (
                          <option key={`year${index}`} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </Field>
                    <ErrorMessage
                      name="cardExpYear"
                      render={(msg) => <FormError>{msg}</FormError>}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3 flex items-start">
                <div className="pr-2 w-1/3">
                  <label className="font-bold text-sm mb-2 ml-1">
                    Security code
                  </label>
                  <div>
                    <Field
                      className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="000"
                      type="text"
                      name="cvv"
                    />
                    <ErrorMessage
                      name="cvv"
                      render={(msg) => <FormError>{msg}</FormError>}
                    />
                  </div>
                </div>
                <div className="pl-2 w-2/3">
                  <label className="font-bold text-sm mb-2 ml-1">Amount</label>
                  <div>
                    <Field
                      className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="00.0"
                      name="amount"
                    />
                    <ErrorMessage
                      name="amount"
                      render={(msg) => <FormError>{msg}</FormError>}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-10 flex items-baseline">
                <div className="w-full">
                  <label className="font-bold text-sm mb-2 ml-1">Notes</label>
                  <div>
                    <Field
                      className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="Note"
                      name="note"
                    />
                    <ErrorMessage
                      name="note"
                      render={(msg) => <FormError>{msg}</FormError>}
                    />
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  } block w-full max-w-xs mx-auto bg-[var(--main-color)] text-white rounded-lg px-3 py-3 font-semibold`}
                >
                  <i className="mdi mdi-lock-outline mr-1"></i> PAY NOW
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PaymentForm;
