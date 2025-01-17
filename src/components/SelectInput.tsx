import type { UseFormRegister } from "react-hook-form";
import type { FormData } from "../FormData";

interface SelectOption {
	value: string;
	label: string;
}

interface SelectInputProps {
	id: keyof FormData;
	label: string;
	options: SelectOption[];
	register: UseFormRegister<FormData>;
}

export function SelectInput({
	id,
	label,
	options,
	register,
}: SelectInputProps) {
	return (
		<div className="mb-4">
			<label
				htmlFor={id}
				className="block text-gray-700 text-sm font-bold mb-2"
			>
				{label}:
			</label>
			<select
				id={id}
				{...register(id)}
				className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-300"
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
}
