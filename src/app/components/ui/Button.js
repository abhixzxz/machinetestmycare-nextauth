export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}) {
  const baseStyles =
    "px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center justify-center";

  const variants = {
    primary:
      "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-800 disabled:bg-blue-300",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400 disabled:bg-gray-100",
    danger:
      "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:bg-red-300",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className} disabled:cursor-not-allowed`}
      {...props}
    >
      {children}
    </button>
  );
}
