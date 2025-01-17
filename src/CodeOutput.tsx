import type { FormData } from "./FormData";

export const generateLatex = (data: FormData) => {
	return `\\documentclass[${data.paperSize},${data.fontSize}]{${data.documentClass}}

% Packages
\\usepackage[${data.language}]{babel}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=${data.marginSize}cm]{geometry}
${data.useHyperlinks ? `\\usepackage[colorlinks=${data.colorLinks}]{hyperref}` : ""}
${data.useMath ? "\\usepackage{amsmath,amsfonts,amssymb}" : ""}
${data.useCode ? "\\usepackage{listings}" : ""}
% ... more packages based on options ...

\\title{${data.title}}
\\author{${data.author}}
\\date{${data.date}}

\\begin{document}

\\maketitle
${data.abstract ? `\\begin{abstract}\n${data.abstract}\n\\end{abstract}` : ""}

% Document content goes here

\\end{document}`;
};
