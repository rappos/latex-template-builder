import type { UseFormRegister } from "react-hook-form";
import type { FormData } from "../FormData";

interface TextfieldSmallProps {
	id: keyof FormData;
	label: string;
	placeholder?: string;
	register: UseFormRegister<FormData>;
}

export function TextfieldSmall({
	id,
	label,
	placeholder,
	register,
}: TextfieldSmallProps) {
	return (
		<div className="mb-4">
			<label
				htmlFor={id}
				className="block text-gray-700 text-sm font-bold mb-2"
			>
				{label}:
			</label>
			<input
				type="text"
				id={id}
				{...register(id)}
				className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-300"
				placeholder={placeholder}
			/>
		</div>
	);
}
