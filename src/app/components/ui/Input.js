import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Input = React.forwardRef(
  (
    {
      label,
      name,
      type = "text",
      value,
      onChange,
      error,
      disabled,
      required,
      className = "",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const baseInputStyles =
      "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm " +
      "focus:outline-none focus:ring-2 focus:ring-offset-2 " +
      "disabled:cursor-not-allowed disabled:opacity-50 " +
      (error
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-200 focus:ring-blue-500") +
      " " +
      (type === "password" ? "pr-10" : "") +
      " " +
      className;

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="relative w-full">
        {label && (
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={name}
            name={name}
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className={baseInputStyles}
            {...props}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={handleTogglePassword}
              className={
                "absolute right-2.5 top-1/2 -translate-y-1/2 " +
                "text-gray-500 hover:text-gray-700 focus:outline-none " +
                "transition-colors duration-200 " +
                (disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer")
              }
              disabled={disabled}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
        {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
