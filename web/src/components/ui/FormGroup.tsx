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
    prefix?: string;
}

export function FormGroup({
    label,
    errorMessage,
    status,
    className,
    prefix,
    ...inputProps
}: FormGroupProps) {

    const currentStatus = errorMessage ? 'error' : (status || 'default');

    const titleClasses = tv({
        base: 'text-md font-semibold uppercase tracking-wider',
        variants: {
            status: {
                default: 'text-gray-400',
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

            <div className="relative flex items-center">
                {prefix && (
                    <span className="absolute left-4 text-gray-400 pointer-events-none select-none z-10 text-md">
                        {prefix}
                    </span>
                )}

                <Input
                    status={currentStatus}
                    {...inputProps}
                    className={prefix ? "pl-[4rem]" : ""}
                />
            </div>

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