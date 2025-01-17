export interface FormData {
	// Document Setup
	language: string;
	paperSize: string;
	marginSize: number;
	documentClass: string;
	fontSize: string;

	// Style & Layout
	indentParagraph: boolean;
	sectionNumbers: boolean;
	headerStyle: string;
	footerStyle: string;
	lineSpacing: string;
	pageNumbering: string;

	// Metadata
	author: string;
	title: string;
	date: string;
	abstract: string;

	// Features
	useReferences: boolean;
	referenceStyle?: string;
	useMath: boolean;
	useCode: boolean;
	useImages: boolean;
	useTables: boolean;
	useHyperlinks: boolean;
	colorLinks: boolean;

	// Advanced
	customPackages: string;
	documentOptions: string;
}
