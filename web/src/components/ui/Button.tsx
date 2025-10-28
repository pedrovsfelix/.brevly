import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
    base: 'flex items-center justify-center text-center gap-2 rounded-lg transition-all disabled:opacity-50 disabled:pointer-events-none',

    variants: {
        size: {
            default: 'p-4 text-white bg-primary hover:bg-primary-dark',
            icon: 'p-2 text-gray-600 bg-gray-200 border hover:border-primary',
            'icon-sm': 'p-1 text-gray-600 hover:text-zinc-100 hover:bg-zinc-800 border-none',
        },
    },

    defaultVariants: {},
})

export function Button({ size, className, ...props }: ComponentProps<'button'> & VariantProps<typeof buttonVariants>) {
    return (
        <button className={buttonVariants({ size, className })} {...props} />
    )
}