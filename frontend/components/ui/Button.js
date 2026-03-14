"use client";
import clsx from "clsx";
export default function Button({ children, onClick, variant="primary", size="md", disabled=false, className="", type="button" }) {
  const base = "inline-flex items-center justify-center font-body font-semibold rounded-xl transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-DEFAULT disabled:opacity-40 disabled:cursor-not-allowed select-none";
  const variants = {
    primary:   "bg-blue-DEFAULT hover:bg-blue-dark active:scale-[.98] text-white shadow-sm hover:shadow-lg",
    secondary: "bg-blue-DEFAULT hover:opacity-85 text-white border border-blue-DEFAULT",
    ghost:     "bg-blue-DEFAULT hover:opacity-85 text-white border border-blue-DEFAULT",
    danger:    "bg-red-50 hover:bg-red-100 text-red-700 border border-red-200",
    orange:    "bg-orange-600 hover:bg-orange-700 text-white shadow-sm",
  };
  const sizes = { sm:"px-3 py-1.5 text-sm", md:"px-5 py-2.5 text-base", lg:"px-8 py-3.5 text-lg" };
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={clsx(base, variants[variant], sizes[size], className)}>
      {children}
    </button>
  );
}
