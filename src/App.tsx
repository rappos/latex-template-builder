import Prism from "prismjs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { generateLatex } from "./CodeOutput";
import type { FormData } from "./FormData";
import { CheckboxInput } from "./components/CheckboxInput";
import { NumberInput } from "./components/NumberInput";
import { SelectInput } from "./components/SelectInput";
import { TextfieldLarge } from "./components/TextfieldLarge";
import { TextfieldSmall } from "./components/TextfieldSmall";
import "prismjs/components/prism-latex";
import "prismjs/themes/prism-coy.css";

export default function App() {
	const { register, watch } = useForm<FormData>({
		defaultValues: {
			language: "english",
			paperSize: "a4paper",
			marginSize: 2.5,
			documentClass: "article",
			fontSize: "12pt",
			lineSpacing: "1.5",
			pageNumbering: "arabic",
		},
	});

	const formData = watch();

	useEffect(() => {
		// Highlight on initial load
		Prism.highlightAll();
	}, []);

	return (
		<div className="min-h-screen flex flex-col bg-slate-50">
			<header className="py-6  bg-purple-600">
				<div className="container mx-auto text-center">
					<h1 className="text-4xl font-bold text-white">
						Emil's LaTeX Template Builder
					</h1>
				</div>
			</header>

			<main className="flex-grow container mx-auto py-8 px-4">
				<div className="flex flex-wrap -mx-4">
					<div className="w-full md:w-1/2 px-4 space-y-6">
						{/* Document Setup Section */}
						<div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500">
							<h2 className="text-xl font-semibold mb-4 text-purple-700">
								Document Setup
							</h2>
							<SelectInput
								id="language"
								label="Language"
								options={[
									{ value: "english", label: "English" },
									{ value: "swedish", label: "Swedish" },
								]}
								register={register}
							/>
							<SelectInput
								id="paperSize"
								label="Paper Size"
								options={[
									{ value: "a4paper", label: "A4" },
									{ value: "letterpaper", label: "Letter" },
								]}
								register={register}
							/>
							<NumberInput
								id="marginSize"
								label="Margin Size (cm)"
								register={register}
							/>
							<TextfieldSmall
								id="documentClass"
								label="Document Class"
								placeholder="e.g., article, report"
								register={register}
							/>
							<TextfieldSmall
								id="fontSize"
								label="Font Size"
								placeholder="e.g., 10pt, 12pt"
								register={register}
							/>
						</div>

						{/* Style & Layout Section */}
						<div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
							<h2 className="text-xl font-semibold mb-4 text-blue-700">
								Style & Layout
							</h2>
							<CheckboxInput
								id="indentParagraph"
								label="Indent Paragraphs"
								register={register}
							/>
							<CheckboxInput
								id="sectionNumbers"
								label="Include Section Numbers"
								register={register}
							/>
							<TextfieldSmall
								id="headerStyle"
								label="Header Style"
								placeholder="e.g., fancy, plain"
								register={register}
							/>
							<TextfieldSmall
								id="footerStyle"
								label="Footer Style"
								placeholder="e.g., myfooter, empty"
								register={register}
							/>
							<TextfieldSmall
								id="lineSpacing"
								label="Line Spacing"
								placeholder="e.g., 1.0, 1.5"
								register={register}
							/>
							<TextfieldSmall
								id="pageNumbering"
								label="Page Numbering"
								placeholder="e.g., arabic, roman"
								register={register}
							/>
						</div>

						{/* Metadata Section */}
						<div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500">
							<h2 className="text-xl font-semibold mb-4 text-green-700">
								Document Metadata
							</h2>
							<TextfieldSmall id="author" label="Author" register={register} />
							<TextfieldSmall
								id="title"
								label="Document Title"
								register={register}
							/>
							<TextfieldSmall
								id="date"
								label="Date"
								placeholder="e.g., \\today"
								register={register}
							/>
							<TextfieldLarge
								id="abstract"
								label="Abstract"
								placeholder="Enter abstract here..."
								register={register}
							/>
						</div>

						{/* Features Section */}
						<div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-amber-500">
							<h2 className="text-xl font-semibold mb-4 text-amber-700">
								Features
							</h2>
							<CheckboxInput
								id="useReferences"
								label="Use References"
								register={register}
							/>
							{formData.useReferences && (
								<SelectInput
									id="referenceStyle"
									label="Reference Style"
									options={[
										{ value: "apa", label: "APA" },
										{ value: "mla", label: "MLA" },
										{ value: "ieee", label: "IEEE" },
									]}
									register={register}
								/>
							)}
							<CheckboxInput
								id="useMath"
								label="Use Math"
								register={register}
							/>
							<CheckboxInput
								id="useCode"
								label="Use Code"
								register={register}
							/>
							<CheckboxInput
								id="useImages"
								label="Use Images"
								register={register}
							/>
							<CheckboxInput
								id="useTables"
								label="Use Tables"
								register={register}
							/>
							<CheckboxInput
								id="useHyperlinks"
								label="Use Hyperlinks"
								register={register}
							/>
							{formData.useHyperlinks && (
								<CheckboxInput
									id="colorLinks"
									label="Color Links"
									register={register}
								/>
							)}
						</div>

						{/* Advanced Section */}
						<div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-red-500">
							<h2 className="text-xl font-semibold mb-4 text-red-700">
								Advanced Options
							</h2>
							<TextfieldLarge
								id="customPackages"
								label="Custom Packages"
								placeholder="Enter custom packages here..."
								register={register}
							/>
							<TextfieldLarge
								id="documentOptions"
								label="Document Options"
								placeholder="Enter document options here..."
								register={register}
							/>
						</div>
					</div>

					<div className="w-full md:w-1/2 px-4">
						<div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
							<h2 className="text-xl font-semibold mb-4 text-gray-700">
								LaTeX Output
							</h2>
							<pre className="relative">
								<code className="language-latex block max-h-[70vh] overflow-y-auto p-4 bg-gray-800 rounded-lg text-sm">
									{generateLatex(formData)}
								</code>
							</pre>
						</div>
					</div>
				</div>
			</main>

			<footer className="py-4 bg-purple-600 text-white text-center">
				<div className="container mx-auto">
					<p>&copy; {new Date().getFullYear()} Emil's LaTeX Template Builder</p>
				</div>
			</footer>
		</div>
	);
}
