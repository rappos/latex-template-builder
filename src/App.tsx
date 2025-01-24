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
			fontFamily: "\\usepackage[otfmath]{XCharter}",
			fontSize: "12pt",
			author: "Name Surname",
			title: "Big report",
			date: "\\today",
			keywords: "",
			subject: "",
		},
	});

	const formData = watch();

	// Highlight on initial load
	useEffect(() => {
		Prism.highlightAll();
	}, []);

	// Highlight on data change
	// biome-ignore lint/correctness/useExhaustiveDependencies: To keep the effect running on data change
	useEffect(() => {
		Prism.highlightAll();
	}, [formData]);

	return (
		<div className="min-h-screen flex flex-col bg-slate-50">
			<header className="py-6  bg-purple-600">
				<div className="container mx-auto text-center">
					<h1 className="text-4xl font-bold text-white">
						Emil's LaTeX Template Builder
					</h1>
				</div>
			</header>

			<main className="grow container mx-auto py-8 px-4">
				<div className="flex flex-wrap -mx-4">
					<div className="w-full md:w-1/2 px-4 space-y-6">
						{/* Document Setup Section */}
						<div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500">
							<h2 className="text-xl font-semibold mb-4 text-purple-700">
								Document Setup
							</h2>
							<SelectInput
								id="documentClass"
								label="Document Class"
								options={[
									{ value: "article", label: "article" },
									{ value: "report", label: "report" },
									{ value: "book", label: "book" },
								]}
								register={register}
							/>
							<SelectInput
								id="paperSize"
								label="Paper Size"
								options={[
									{ value: "a2paper", label: "A2" },
									{ value: "a3paper", label: "A3" },
									{ value: "a4paper", label: "A4" },
									{ value: "a5paper", label: "A5" },
									{ value: "letterpaper", label: "Letter" },
									{ value: "legalpaper", label: "Legal" },
								]}
								register={register}
							/>
							<SelectInput
								id="fontFamily"
								label="Font Family"
								options={[
									{ value: "\\usepackage[otfmath]{XCharter}", label: "Serif" },
									{ value: "\\usepackage{cmbright}", label: "Sans Serif" },
								]}
								register={register}
							/>
							<SelectInput
								id="fontSize"
								label="Font Size"
								options={[
									{ value: "10pt", label: "10pt" },
									{ value: "11pt", label: "11pt" },
									{ value: "12pt", label: "12pt" },
								]}
								register={register}
							/>
							<NumberInput
								id="marginSize"
								label="Margin Size (cm)"
								step={0.5}
								register={register}
							/>
							<SelectInput
								id="language"
								label="Language"
								options={[
									{ value: "english", label: "English" },
									{ value: "swedish", label: "Swedish" },
									{
										value: "swedish,english",
										label: "English (Swedish included)",
									},
									{
										value: "english,swedish",
										label: "Swedish (English included)",
									},
								]}
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
								label="Paragraphs on new lines"
								register={register}
							/>
							<CheckboxInput
								id="sectionNumbers"
								label="Remove numbers from section headers"
								register={register}
							/>
							<CheckboxInput
								id="compactPage"
								label="Compact page layout"
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
										{ value: "ieee", label: "IEEE" },
										{ value: "chicago-authordate", label: "Chicago" },
										{ value: "nature", label: "Nature" },
										{ value: "science", label: "Science" },
										{ value: "mla", label: "MLA" },
										{ value: "chem-acs", label: "ACS" },
										{ value: "phys", label: "AIP" },
									]}
									register={register}
								/>
							)}
							<CheckboxInput
								id="useImages"
								label="Use Images"
								register={register}
							/>
							<CheckboxInput
								id="usePDF"
								label="PDF input support"
								register={register}
							/>
							<CheckboxInput
								id="useMath"
								label="Better Math"
								register={register}
							/>
							<CheckboxInput
								id="useCode"
								label="Use Code"
								register={register}
							/>
							{formData.useCode && (
								<SelectInput
									id="codeTheme"
									label="Code Theme"
									options={[
										{ value: "emacs", label: "Light" },
										{ value: "vs", label: "Light 2" },
										{ value: "monokai", label: "Dark" },
										{ value: "native", label: "Dark 2" },
									]}
									register={register}
								/>
							)}
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
							<SelectInput
								id="date"
								label="Date"
								options={[
									{ value: "\\today", label: "Current Date (Dynamic)" },
									{
										value: new Date().toISOString().split("T")[0],
										label: "Current Date (Fixed)",
									},
									{ value: "custom", label: "Specific Date" },
								]}
								register={register}
							/>
							{formData.date === "custom" && (
								<TextfieldSmall
									id="customDate"
									label="Enter Date"
									placeholder="YYYY-MM-DD"
									register={register}
								/>
							)}
							<TextfieldLarge
								id="subject"
								label="Description/Subject"
								placeholder="Enter short description here..."
								register={register}
							/>
							<TextfieldSmall
								id="keywords"
								label="Keywords"
								placeholder="math, science, LaTeX"
								register={register}
							/>
						</div>

						{/* Advanced Section */}
						<div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-red-500">
							<h2 className="text-xl font-semibold mb-4 text-red-700">
								Advanced Options
							</h2>
							<TextfieldLarge
								id="customPackages"
								label="Custom Packages"
								placeholder="physics, lipsum"
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
							<div className="mt-4 flex gap-2">
								<button
									type="button"
									onClick={() => {
										navigator.clipboard.writeText(generateLatex(formData));
										const btn = document.activeElement as HTMLButtonElement;
										const originalText = btn.textContent;
										btn.textContent = "Copied!";
										setTimeout(() => {
											btn.textContent = originalText;
										}, 1500);
									}}
									className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-sm hover:bg-purple-700 transition-colors"
								>
									Copy to Clipboard
								</button>
								<button
									type="button"
									onClick={() => {
										const blob = new Blob([generateLatex(formData)], {
											type: "text/plain",
										});
										const url = URL.createObjectURL(blob);
										const a = document.createElement("a");
										a.href = url;
										a.download = "template.tex";
										document.body.appendChild(a);
										a.click();
										document.body.removeChild(a);
										URL.revokeObjectURL(url);
									}}
									className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-sm hover:bg-purple-700 transition-colors"
								>
									Download .tex
								</button>
							</div>
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
