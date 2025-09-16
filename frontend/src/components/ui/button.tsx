import React, { ReactNode } from "react";

export type ButtonProps = {
  children?: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  onClick = () => {},
  className = "",
}) => {
  return (
    <button
      className={`w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
