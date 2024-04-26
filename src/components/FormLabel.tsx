import { LabelHTMLAttributes, ReactNode } from "react";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
    labelTitle: string;
    children: ReactNode;
}

export default function FormLabel({ labelTitle, children, ...rest }: Props) {
    return (
        <label
            className="
            flex 
            flex-col gap-3 

            [&>input]:px-4 
            [&>input]:py-2 
            [&>input]:bg-neutral-50 
            [&>input]:border-[1.3px] 
            [&>input]:border-neutral-400 
            [&>input]:rounded-full
            [&>input]:outline-none

            [&>textarea]:px-4 
            [&>textarea]:py-2 
            [&>textarea]:bg-neutral-50 
            [&>textarea]:border-[1.3px] 
            [&>textarea]:border-neutral-400 
            [&>textarea]:rounded-lg
            [&>textarea]:outline-none
            [&>textarea]:h-[200px]
            "
            {...rest}
        >
            <span className="text-xl text-center">{labelTitle}</span>
            {children}
        </label>
    );
}
