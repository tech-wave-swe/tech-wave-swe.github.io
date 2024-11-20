import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import "./index.css";
import React, { useEffect, useState } from "react";

// function HomepageHeader() {
// 	const { siteConfig } = useDocusaurusContext();
// 	return (
// 		<header className={clsx("hero hero--primary", styles.heroBanner)}>
// 			<div className='container'>
// 				<Heading as='h1' className='hero__title'>
// 					{siteConfig.title}
// 				</Heading>
// 				<p className='hero__subtitle'>{siteConfig.tagline}</p>
// 				<div className={styles.buttons}>
// 					<Link
// 						className='button button--secondary button--lg'
// 						to='/docs/intro'>
// 						Tutta la documentazione
// 					</Link>
// 				</div>
// 			</div>
// 		</header>
// 	);
// }

// const TypewriterItem = ({ text, typingSpeed = 10 }) => {
// 	const [displayedText, setDisplayedText] = useState(""); // State to store the text being typed
// 	const [index, setIndex] = useState(0); // State to track the current position in the string

// 	useEffect(() => {
// 		if (index < text.length) {
// 			const timeout = setTimeout(() => {
// 				setDisplayedText((prev) => prev + text.charAt(index)); // Add the next character
// 				setIndex((prev) => prev + 1); // Increment the index
// 			}, typingSpeed);
// 			return () => clearTimeout(timeout); // Cleanup the timeout on unmount
// 		}
// 	}, [index, text, typingSpeed]); // Dependencies: re-run effect when index changes

// 	return (
// 		<span>
// 			{displayedText}
// 			{index < text.length && <span>|</span>}{" "}
// 			{/* Show the cursor only while typing */}
// 		</span>
// 	);
// };

const Typewriter = ({ children, typingSpeed = 50, onComplete }) => {
	const [displayedText, setDisplayedText] = useState(""); // Currently displayed text
	const [index, setIndex] = useState(0);

	const content =
		typeof children === "string" ? children : children.props.children; // Extract text

	useEffect(() => {
		if (index < content.length) {
			const timeout = setTimeout(() => {
				setDisplayedText((prev) => prev + content[index]); // Add next character
				setIndex((prev) => prev + 1);
			}, typingSpeed);
			return () => clearTimeout(timeout); // Cleanup timeout
		} else if (onComplete) {
			onComplete(); // Notify completion
		}
	}, [index, content, typingSpeed, onComplete]);

	return typeof children === "string" ? (
		<span>{displayedText}</span>
	) : (
		React.cloneElement(children, { children: displayedText })
	);
};

const SequentialTypewriter = ({ lines, typingSpeed = 5 }) => {
	const [currentLine, setCurrentLine] = useState(0);

	const handleComplete = () => {
		setCurrentLine((prev) => prev + 1); // Move to the next line
	};

	return (
		<div>
			{lines.map((line, index) => (
				<div key={index}>
					{index === currentLine && (
						<Typewriter
							typingSpeed={typingSpeed}
							onComplete={handleComplete}>
							{line}
						</Typewriter>
					)}
					{index < currentLine && line}{" "}
					{/* Render completed lines fully */}
				</div>
			))}
		</div>
	);
};

function HeroSection() {
	const lines = [
		<p className='line'>
			{" "}
			<span className='command-base'>Group_Name</span>: "
			<span className='command-value'>TechWave</span>"
		</p>,
		<p className='line'>
			{" "}
			<span className='command-base'>Group_Description'</span>: "
			<span className='command-value'>
				Gruppo 5 del corso di Ingegneria del Software.
			</span>
			"
		</p>,
		<p className='line'>
			{" "}
			<span className='command-base'>Stakeholder</span>: "
			<span className='command-value'>BlueWind</span>"
		</p>,
		<p className='line'>
			{" "}
			<span className='command-base'>Project_Name</span>: "
			<span className='command-value'>
				Requirement Tracker - Plug-in VSCode
			</span>
			"
		</p>,
		<p className='line'>
			{" "}
			<span className='command-base'>Available_Pages</span>: [
			<a href='/docs/Candidatura/'>Candidatura</a>,{" "}
			<a href='/docs/RTB/'>RTB</a>, <a href='/docs/PB/'>PB</a>]
		</p>,
		<p className='line'>
			{" "}
			<span className='command-base'>Devs</span>: [
			<a href='mailto:agnese.carraro@studenti.unipd.it'>Carraro Agnese</a>
			,
			<a href='mailto:riccardo.dalbianco@studenti.unipd.it'>
				Dal Bianco Riccardo
			</a>
			,
			<a href='mailto:giulia.marcon.6@studenti.unipd.it'>Marcon Giulia</a>
			,<a href='mailto:luca.monetti.1@studenti.unipd.it'>Monetti Luca</a>,
			<a href='mailto:gaia.pistori@studenti.unipd.it'>Pistori Gaia</a>,
			<a href='mailto:andrea.piola@studenti.unipd.it'>Piola Andrea</a>,
			<a href='mailto:manuelfelipe.vasquez@studenti.unipd.it'>
				Vasquez Manuel Felipe
			</a>
			]
		</p>,
		<p className='line'>
			{" "}
			<span className='command-base'>HAVE A NICE DAY :-)</span>
		</p>,
	];

	return (
		<div className='hero_container'>
			<div id='terminal'>
				<SequentialTypewriter lines={lines} typingSpeed={300} />
			</div>
		</div>
	);
}

export default function Home(): JSX.Element {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout
			title={`Hello from ${siteConfig.title}`}
			description='Description will go into a meta tag in <head />'>
			<main>
				<HeroSection />
			</main>
		</Layout>
	);
}
