import React, { FC } from "react";

interface FormErrorProps {
  children: React.ReactNode;
}

const FormError: FC<FormErrorProps> = ({ children }) => (
  <span className="text-red-500">
    {children && "*"}
    {children}
  </span>
);

export default FormError;
