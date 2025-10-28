import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const inputVariants = tv({

    base: [
        'w-full h-12',
        'px-4 py-3',
        'rounded-lg',
        'text-gray-600',
        'transition-all duration-200',
        'outline-none',
        'placeholder:text-gray-400',
    ],

    variants: {

        status: {

            default: [
                'bg-white',
                'border border-gray-200',
                'focus:border-primary',
            ],

            active: [
                'bg-white',
                'border-2 border-primary',
            ],

            error: [
                'bg-white',
                'border-2 border-danger',
            ],
        },

        size: {
            default: '',
            // Se precisar de um input menor:
            // sm: 'h-10 px-3 py-2 text-sm'
        },
    },

    defaultVariants: {
        status: 'default',
        size: 'default',
    },
});

export function Input({
    status,
    size,
    className,
    ...props
}: ComponentProps<'input'> & VariantProps<typeof inputVariants>) {
    return (
        <input className={inputVariants({ status, size, className })} {...props} />
    );
}