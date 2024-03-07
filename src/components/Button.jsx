import React from 'react'

function Button({  children="", className="", type="button", ...props }) {
    return (
        <button
            className={`bg-custom-primary text-white rounded-[20px] hover:bg-custom-primary hover:text-white hover:shadow-md px-[20px] py-[10px] transition-all duration-[0.3s] ease-in-out ${className}`}
            type={type}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button