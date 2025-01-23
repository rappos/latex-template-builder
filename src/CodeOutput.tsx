import type { FormData } from "./FormData";

export const generateLatex = (data: FormData) => {
	const lines = [
		"% Preamble setup\n",
		"% Main settings",
		`\\documentclass[${data.paperSize},${data.fontSize}]{${data.documentClass}}`,
		"\\usepackage[LGR, T1]{fontenc}",
		"\\usepackage[utf8]{inputenc}",
		`\\usepackage[${data.language}]{babel}`,
		`\\usepackage[margin=${data.marginSize}cm]{geometry}`,
		"\\usepackage{float}",
		`${data.fontFamily}`,
		"\\usepackage{microtype}",
		"\\usepackage{csquotes}",
		"",
	];

	lines.push(
		"%Metadata",
		`\\title{${data.title}}`,
		`\\author{${data.author}}`,
		`\\date{${data.date === "custom" ? data.customDate : data.date}}`,
	);

	lines.push(
		"\n% Style and layout",
		"\\usepackage{extramarks}",
		"\\usepackage{fancyhdr}",
		"\\pagestyle{fancy}",
		"\\fancyhf{}",
	);
	if (data.indentParagraph) {
		lines.push("\\usepackage[parfill]{parskip}");
	}
	if (data.sectionNumbers) {
		lines.push("\\setcounter{secnumdepth}{0}");
	}
	if (data.compactPage) {
		lines.push("\\usepackage[compact]{titlesec}");
		lines.push("\\usepackage{savetrees}");
	}

	if (data.useReferences) {
		lines.push("\n% Bibliography setup");
		lines.push(`\\usepackage[${data.referenceStyle}]{biblatex}`);
		lines.push("\\addbibresource{references.bib}");
	}

	if (data.useImages) {
		lines.push("\n% Image setup");
		lines.push("\\usepackage{graphicx}");
	}

	if (data.usePDF) {
		lines.push("\n% PDF setup");
		lines.push("\\usepackage{pdfpages}");
	}

	if (data.useMath) {
		lines.push("\n% Math packages");
		lines.push("\\usepackage{amsfonts,amssymb}");
		lines.push("\\usepackage{mathtools}");
	}

	if (data.useCode) {
		lines.push("\n% Code setup");
		lines.push("\\usepackage{minted}");
		lines.push(`\\usemintedstyle{${data.codeTheme}}`);
	}

	if (data.customPackages) {
		lines.push("\n% Custom packages");
		lines.push(`\\usepackage{${data.customPackages}}`);
	}

	lines.push(
		"\n% Links and PDF setup",
		"\\usepackage{xurl}",
		"\\usepackage{hyperref}",
		"\\hypersetup{",
	);
	lines.push(
		`\tpdflang={${data.language === "swedish" || data.language === "english,swedish" ? "sv" : "en"}},`,
	);
	lines.push(
		"\tpdftitle={},",
		`\tpdfsubject={${data.subject}},`,
		`\tpdfauthor={${data.author}},`,
		`\tpdfkeywords={${data.keywords}},`,
		"\tpdffitwindow=false,",
		"\tpdfstartview={FitH},",
		"\tunicode=true,",
		"}\n",
	);

	lines.push("\\begin{document}", "", "\\maketitle");

	if (data.abstract) {
		lines.push("\\begin{abstract}", data.abstract, "\\end{abstract}");
	}

	lines.push("", "% Document content goes here\n");

	if (data.useReferences) {
		lines.push("\\printbibliography\n");
	}

	lines.push("\\end{document}");

	return lines.join("\n");
};
