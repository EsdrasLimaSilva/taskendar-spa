import { LabelHTMLAttributes, ReactNode } from "react";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
    labelTitle: string;
    children: ReactNode;
}

export default function FormLabel({ labelTitle, children, ...rest }: Props) {
    return (
        <label
            className="[&>input:outline-none  flex flex-col  gap-3  [&>input]:rounded-full  [&>input]:border-[1.3px]  [&>input]:border-neutral-400  [&>input]:bg-neutral-50  [&>input]:px-4 [&>input]:py-2 [&>textarea]:h-[200px]  [&>textarea]:rounded-lg  [&>textarea]:border-[1.3px]  [&>textarea]:border-neutral-400  [&>textarea]:bg-neutral-50  [&>textarea]:px-4 [&>textarea]:py-2 [&>textarea]:outline-none"
            {...rest}
        >
            <span className="text-xl text-center">{labelTitle}</span>
            {children}
        </label>
    );
}
