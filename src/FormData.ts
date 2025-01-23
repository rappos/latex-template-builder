export interface FormData {
	// Document Setup
	language: string;
	paperSize: string;
	marginSize: number;
	documentClass: string;
	fontFamily: string;
	fontSize: string;

	// Style & Layout
	indentParagraph: boolean;
	sectionNumbers: boolean;
	compactPage: boolean;

	// Metadata
	author: string;
	title: string;
	date: string;
	customDate: string;
	abstract: string;
	subject: string;
	keywords: string;

	// Features
	useReferences: boolean;
	useImages: boolean;
	usePDF: boolean;
	referenceStyle?: string;
	useMath: boolean;
	useCode: boolean;
	codeTheme?: string;

	// Advanced
	customPackages: string;
}
