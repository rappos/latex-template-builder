import type { UseFormRegister } from "react-hook-form";
import type { FormData } from "../FormData";

interface CheckboxInputProps {
	id: keyof FormData;
	label: string;
	register: UseFormRegister<FormData>;
}

export function CheckboxInput({ id, label, register }: CheckboxInputProps) {
	return (
		<div className="mb-4 flex items-center">
			<input type="checkbox" id={id} {...register(id)} className="mr-2" />
			<label htmlFor={id} className="text-gray-700 text-sm font-bold">
				{label}
			</label>
		</div>
	);
}
