import React from 'react';

const Input = React.forwardRef(({ label="", type="text", placeholder="", required=false, ...props }, ref) => {
    return (
        <div className="mb-5 w-80">
            <label
                htmlFor={label}
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-black"
            >
                {label}
            </label>
            <input
                {...props}
                ref={ref}
                type={type}
                id={label}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder={placeholder}
                required={required}
            />
        </div>
    )
});

export default Input;