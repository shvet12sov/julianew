
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'premium';
  className?: string;
  children: React.ReactNode;
}

export const Button = ({ variant = 'primary', className = '', children, ...props }: ButtonProps) => {
  const baseStyles = "px-7 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all duration-300 active:scale-95 text-center";
  const variants = {
    primary: "bg-neutral-900 text-white hover:bg-indigo-600 shadow-lg shadow-neutral-100",
    outline: "border border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300",
    premium: "btn-premium px-10 py-5 rounded-2xl text-xs"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
