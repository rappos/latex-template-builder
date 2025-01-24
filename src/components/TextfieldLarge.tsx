import type { UseFormRegister } from "react-hook-form";
import type { FormData } from "../FormData";

interface TextfieldLargeProps {
	id: keyof FormData;
	label: string;
	placeholder?: string;
	register: UseFormRegister<FormData>;
}

export function TextfieldLarge({
	id,
	label,
	placeholder,
	register,
}: TextfieldLargeProps) {
	return (
		<div className="mb-4">
			<label
				htmlFor={id}
				className="block text-gray-700 text-sm font-bold mb-2"
			>
				{label}:
			</label>
			<textarea
				id={id}
				{...register(id)}
				className="shadow-sm appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-hidden focus:shadow-outline border-gray-300"
				placeholder={placeholder}
			/>
		</div>
	);
}
