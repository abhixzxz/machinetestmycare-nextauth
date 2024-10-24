export function Button({ children, ...props }) {
  return (
    <button
      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      {...props}
    >
      {children}
    </button>
  );
}
