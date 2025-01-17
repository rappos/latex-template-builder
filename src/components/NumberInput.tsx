import type { UseFormRegister } from "react-hook-form";
import type { FormData } from "../FormData";

interface NumberInputProps {
	id: keyof FormData;
	label: string;
	step?: number;
	register: UseFormRegister<FormData>;
}

export function NumberInput({
	id,
	label,
	step = 1,
	register,
}: NumberInputProps) {
	return (
		<div className="mb-4">
			<label
				htmlFor={id}
				className="block text-gray-700 text-sm font-bold mb-2"
			>
				{label}:
			</label>
			<input
				type="number"
				step={step}
				id={id}
				{...register(id)}
				className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-300"
			/>
		</div>
	);
}
