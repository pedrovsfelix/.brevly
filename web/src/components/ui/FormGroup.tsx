import { WarningIcon } from "@phosphor-icons/react";
import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";
import { Input } from "./Input";

const formGroupVariants = tv({
    base: 'flex flex-col gap-1 w-full',
});

interface FormGroupProps extends ComponentProps<typeof Input> {
    label: string;
    errorMessage?: string;
}

export function FormGroup({
    label,
    errorMessage,
    status,
    className,
    ...inputProps
}: FormGroupProps) {

    const currentStatus = errorMessage ? 'error' : (status || 'default');

    const titleClasses = tv({
        base: 'text-sm font-semibold uppercase tracking-wider',
        variants: {
            status: {
                default: 'text-gray-600',
                active: 'text-primary',
                error: 'text-danger',
            }
        },
        defaultVariants: {
            status: 'default'
        }
    });

    return (
        <div className={formGroupVariants({ className })}>

            <label className={titleClasses({ status: currentStatus })} htmlFor={inputProps.id}>
                {label}
            </label>

            <Input
                status={currentStatus}
                {...inputProps}
            />

            {errorMessage && (
                <div className="flex items-center gap-1 mt-1 text-danger text-md font-semibold">
                    <WarningIcon
                        size={16}
                        className="text-danger"
                    />
                    <span>{errorMessage}</span>
                </div>
            )}
        </div>
    );
}