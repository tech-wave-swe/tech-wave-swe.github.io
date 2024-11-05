\ProvidesClass{TWDocumentFull}[2024/10/22 Custom Reports]

% OPTIONS
\newif\ifhidedate
\hidedatefalse

% Declare Options
\DeclareOption{hidedate}{\hidedatetrue}

\ProcessOptions\relax

% BASE CLASS
\LoadClass[a4paper,11pt]{article}

% GENERAL PACKAGES
\usepackage{etoolbox, titlesec}

% GRAPHICS
\RequirePackage{graphicx}
\graphicspath{{../public/images}}
\newcommand{\@mainlogo}{logo.png}

% PAGE MARGINS
\RequirePackage[top=4.75cm,        bottom=2.5cm,
                left=2.3cm,        right=2.3cm,
                headheight=4.25cm, headsep=5mm,
                footskip=2.5ex]{geometry}

% COLORS
\RequirePackage{xcolor}
\definecolor{twgray}{RGB/cmyk}{235,235,230/0,0,0,.1}
\definecolor{twblue}{HTML}{35A8F6}
\colorlet{twlightblue}{twblue!20}

% CUSTOM FONTS
\usepackage[T1]{fontenc}
\usepackage{lmodern}
\usepackage{slantsc}
\usepackage{relsize}

\renewcommand*\familydefault{\sfdefault}
\usefont{T1}{lmss}{m}{n}\selectfont
\DeclareFontShape{T1}{lmss}{m}{sc}{<->ssub*lmss/m/n}{}

\newcommand{\@labeltext}[1]{\textbf{\scriptsize #1}}
\newcommand{\@LabelText}[1]{\MakeUppercase{\@labeltext{#1}}}
\newcommand{\LabelText}[1]{\@LabelText{#1}}

\newcommand{\@LabelValue}[1]{\scriptsize #1}

% SEPARATOR
\newcommand{\@separator}{%
    % To make sure we have spacing on both sides, make an invisible rule, 2X tall
    \rule{0ex}{2ex}%
    % Place the dashed rule 1X high
    \textcolor{twgray}{\rule[1ex]{\textwidth}{0.25pt}}%
}

% FOOTER
\RequirePackage{fancyhdr,lastpage}
\pagestyle{fancy}
\renewcommand{\headrulewidth}{0pt}
\fancyhf{}% clear all header and footer fields

\lhead{\renewcommand{\baselinestretch}{0}%
        \makebox[0pt][l]{\raisebox{4.85mm}{\includegraphics[height=3.62cm]{\@mainlogo}}}%
       }

\newcommand*\PlainPageRef[1]{%
    \pageref*{#1}%
}

\cfoot{%
  \color{gray}
  \@separator\newline
  \hspace*{\tabcolsep}
  \begin{minipage}[c]{0.5\textwidth}
    TechWave - \@title/\@version
  \end{minipage}%
  \hfill
  \thepage\ of \PlainPageRef{LastPage}
  \hspace*{\tabcolsep}\newline
  \@separator
}

% PARTECIPANTS
\RequirePackage{xparse}
\newcommand{\@participantstable}{}
\NewDocumentCommand \participant { O{present} m }{
    \g@addto@macro \@participantstable {
        \multicolumn{2}{l}{#2}
          & \ifstrequal{#1}{present}    {$\bullet$}{}
          & \ifstrequal{#1}{absent}     {$\bullet$}{}\\
    }
}

% TASKLIST
\RequirePackage{tabularx,ltxtable}
\newcommand{\@tasktable}{}
\newcommand{\tasklist}{%
  \subsection*{Attività Assegnate}%
  \vspace{-\baselineskip}
  \begin{longtable}{rp{0.55\textwidth}p{0.2\textwidth}l}
    \multicolumn{4}{@{}c@{}}{\@separator}\\*
    \@LabelText{\#} & \@LabelText{Task} &
    \@LabelText{Responsabile} & \@LabelText{Data}\\*
    \multicolumn{4}{@{}c@{}}{\@separator}
    \@tasktable\\*
  \end{longtable}
}
\newcounter{crtask}
\newcommand{\task}[3]{%
    \g@addto@macro \@tasktable {%
      \\
      \refstepcounter{crtask}\thecrtask & #1 & #2 & #3 \\*
      \multicolumn{4}{@{}c@{}}{\@separator}%
    }%
}

% REDATTORI
% Initialize an empty list for editors
\newcommand{\editorlist}{}
\newcommand{\firsteditor}{true} % A flag to check if it's the first editor

% Define the \editor command to add a new editor to the list
\newcommand{\editor}[1]{%
    \ifthenelse{\equal{\firsteditor}{true}} % Check if it's the first editor
        {\edef\editorlist{#1} \renewcommand{\firsteditor}{false}} % Set editor without comma
        {\edef\editorlist{\editorlist, #1}} % Append with a comma
}

% VERIFICATORI
% Initialize an empty list for editors
\newcommand{\reviewerlist}{}
\newcommand{\firstreviewer}{true} % A flag to check if it's the first editor

% Define the \editor command to add a new editor to the list
\newcommand{\reviewer}[1]{%
    \ifthenelse{\equal{\firstreviewer}{true}} % Check if it's the first editor
        {\edef\reviewerlist{#1} \renewcommand{\firstreviewer}{false}} % Set editor without comma
        {\edef\reviewerlist{\reviewerlist, #1}} % Append with a comma
}

% CLASSIFICAZIONE
\newcommand{\classification}[1]{\def\@classification{#1}}

% VERSIONE
\newcommand{\version}[1]{\def\@version{#1}}

% FRONTMATTER
\usepackage[italian]{datetime2}
\RequirePackage{colortbl,tabularx,setspace,rotating,ltxtable}
\newcommand{\frontmatter}{%

    \newgeometry{left=3.5cm, right=3.5cm}%

    \begin{titlepage}
        \begin{center}

            \raisebox{1cm}{\includegraphics[height=3cm]{logo_unipd.png}}
            \hspace{0.5cm} % Space between images, adjust as needed
            \raisebox{0cm}{\includegraphics[height=5cm]{\@mainlogo}}%

            % \includegraphics[height=5cm]{\@mainlogo}
            % \includegraphics[height=3cm]{logo_unipd.png}
            \vspace{1cm}
            \small\textcolor{darkgray}{techwave.unipd@gmail.com}
            \vspace{0.5cm} \\
            \huge\textbf \@title \\
            \ifhidedate
                {}
            \else
                \Large \@date \\
            \fi
        \end{center}

        \vspace{2cm}

        \noindent Dettagli documento: \\

        \noindent\parbox{\textwidth}{\@labeltext{Redatto da:} \@LabelValue{\editorlist}}
        \noindent\parbox{\textwidth}{\@labeltext{Revisionato da:} \@LabelValue{\reviewerlist}}
        \noindent\parbox{\textwidth}{\@labeltext{Classificazione:} \@LabelValue{\@classification}}
        \noindent\parbox{\textwidth}{\@labeltext{Versione:} \@LabelValue{\@version}}


    \end{titlepage}

    \restoregeometry
}

% PARTECIPANTS

\newcommand{\showPartecipants}{%

    \rowcolors{4}{}{twlightblue}%
    \begin{longtable}{p{0.4\textwidth}p{0.4\textwidth}ccc}
        \rowcolor{white}
        \parbox{\linewidth}{{\@LabelText{Redatto da}}\\\editorlist}
        & \parbox{\linewidth}{{\@LabelText{Revisionato da}}\\\reviewerlist}
        & \raisebox{-1.5cm}{\begin{sideways}%
            \parbox{2cm}{\centering\@LabelText{Presente}}%
            \end{sideways}}
        & \raisebox{-1.5cm}{\begin{sideways}%
            \parbox{2cm}{\centering\@LabelText{Assente}}%
            \end{sideways}}\\
        \rowcolor{white} \multicolumn{5}{@{}c@{}}{\@separator}\\
        \rowcolor{white} \@LabelText{Partecipanti} \vspace{0.5em}\\
        \endfirsthead
        \rowcolor{white} &
        & \raisebox{-1.5cm}{\begin{sideways}%
            \parbox{2cm}{\raggedright\@LabelText{Presente}}%
        \end{sideways}}
        & \raisebox{-1.5cm}{\begin{sideways}%
            \parbox{2cm}{\raggedright\@LabelText{Assente}}%
        \end{sideways}}\\
        \rowcolor{white} \multicolumn{5}{@{}c@{}}{\@separator}\\
        \rowcolor{white} \@LabelText{Partecipanti}\\
        \endhead
        \@participantstable
    \end{longtable}
    \rowcolors{1}{}{} % Back to normal

    \noindent\@separator

    \noindent

}

% SIGNATURE SPACE
\newcommand{\signature}[1]{%
    \vfill
    \begin{flushright}
        \textit{#1}
        \vspace{0.5cm} \\
        \noindent\rule{5cm}{0.4pt} % Adjust width and thickness of the line
    \end{flushright}
}
