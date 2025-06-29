'use client';

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import data from "../data.json";
import LoadingIndicator from "./components/loading-indicator";
import ScrollSection from "./components/scroll-section";
import CollapsibleNav from "./components/collapsible-nav";
import GitHubProjects from "./components/github-projects";
import EmailJSContact from "./components/emailjs-contact";
import LoadingScreen from "./components/loading-screen";

const languages = [
	{ name: "Python", value: 90 },
	{ name: "Java", value: 80 },
	{ name: "JavaScript", value: 85 },
	{ name: "C++", value: 75 },
];

const frontend = [
	{ name: "HTML/CSS", value: 90 },
	{ name: "TypeScript", value: 80 },
	{ name: "Tailwind CSS", value: 85 },
	{ name: "Next.js", value: 75 },
];

const backend = [
	{ name: "Express.js", value: 80 },
	{ name: "MongoDB", value: 75 },
	{ name: "PostgreSQL", value: 70 },
	{ name: "Redis", value: 65 },
];

const ai = [
	{ name: "TensorFlow", value: 75 },
	{ name: "PyTorch", value: 80 },
	{ name: "OpenAI API", value: 85 },
	{ name: "Hugging Face", value: 70 },
];

const navigation = [
	{ name: "Home", href: "#home" },
	{ name: "Tech Stack", href: "#proficiency" },
	{ name: "Projects", href: "#projects" },
	{ name: "Contact", href: "#contact" },
];

export default function Home(props) {
	const [isLoading, setIsLoading] = useState(true);
	const [searchParams, setSearchParams] = useState({});

	useEffect(() => {
		// Extract search params from URL
		const urlParams = new URLSearchParams(window.location.search);
		const customUsername = urlParams.get('customUsername');
		setSearchParams({ customUsername });
	}, []);

	const handleLoadingComplete = () => {
		setIsLoading(false);
	};

	if (isLoading) {
		return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
	}

	return <LandingComponent searchParams={searchParams} />;
}

const LandingComponent = ({ searchParams }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const username = searchParams?.customUsername || process.env.NEXT_PUBLIC_GITHUB_USERNAME || data.githubUsername;

	useEffect(() => {
		const fetchUser = async () => {
			try {
				setLoading(true);
				const response = await fetch(`https://api.github.com/users/${username}`);
				
				if (!response.ok) {
					throw new Error(`GitHub API error: ${response.status}`);
				}
				
				const userData = await response.json();
				setUser(userData);
			} catch (error) {
				console.error('Error fetching user:', error);
				setUser({ name: data.displayName, avatar_url: data.avatarUrl, bio: data.bio });
			} finally {
				setLoading(false);
			}
		};

		if (username) {
			fetchUser();
		}
	}, [username]);

	if (loading) {
		return <LoadingIndicator />;
	}

	return (
		<div className="flex h-screen overflow-hidden bg-linear-to-tl from-black via-zinc-600/20 to-black">
			{/* Collapsible Navigation */}
			<CollapsibleNav navigation={navigation} />

			{/* Main Content Area */}
			<div className="flex-1 md:ml-12 overflow-y-auto transition-all duration-300">
				{/* Home Section */}
				<ScrollSection id="home" className="flex flex-col items-center justify-center min-h-[80vh] pt-16 md:pt-0">
					<div className="hidden w-full h-px animate-glow md:block animate-fade-left bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
					<div className="relative">
						<h1 className="flex items-center z-10 text-2xl hover:scale-110 text-transparent duration-1000 cursor-default text-edge-outline animate-title font-display sm:text-4xl md:text-6xl lg:text-9xl whitespace-nowrap bg-clip-text bg-white p-5">
							{user?.name || data.displayName}
							<Image 
								alt='👨‍💻' 
								width={100} 
								height={100} 
								src={user?.avatar_url || data.avatarUrl} 
								className="float-right rounded-full mx-4" 
							/>
						</h1>
						{/* Mail Button positioned at the right side below the name */}
						<div className="absolute right-[5%] top-full mt-0 md:mt-2">
							<a 
								href="mailto:zawad1@gmail.com" 
								className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-600 hover:border-zinc-500 text-zinc-300 hover:text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm"
								target="_blank"
								rel="noopener noreferrer"
								title="Send email to zawad1@gmail.com"
							>
								<svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
								</svg>
							</a>
						</div>
					</div>
					<div className="hidden w-full h-px animate-glow md:block animate-fade-right bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
					
					{/* About Me Section */}
					<div className="w-full max-w-5xl mx-auto px-2 md:px-6 animate-fade-in">
						<h2 className="text-2xl md:text-3xl text-zinc-300 font-display mb-6 md:mb-8 text-left">About Me</h2>
						<p className="text-base md:text-lg text-zinc-500 leading-relaxed mb-6 md:mb-8 text-justify">
						Born in Bangladesh, I am currently an undergraduate student at BRAC University with a strong 
						enthusiasm for technology and research. My primary interests lie in Natural Language Processing 
						(NLP) and fine-tuning large language models (LLMs), where I enjoy exploring new ideas and innovative 
						solutions. I am also committed to expanding my expertise in fullstack development by learning and applying 
						modern frameworks. Throughout my academic journey, I have demonstrated leadership in both academic 
						and extracurricular activities, often taking the initiative to guide teams and foster collaboration. 
						My enthusiasm for learning and my proactive approach help me inspire others and drive projects forward. 
						I am eager to contribute to impactful work at the intersection of AI research and software development, 
						while continuously growing as a leader and a passionate learner.
						</p>
					</div>
				</ScrollSection>

				{/* Proficiency Section */}
				<ScrollSection id="proficiency" className="flex flex-col items-center justify-center min-h-[80vh] pt-16 md:pt-0">
					<div className="hidden w-full h-px animate-glow md:block animate-fade-left bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
					<h1 className="z-10 text-2xl md:text-4xl lg:text-6xl xl:text-7xl text-transparent duration-1000 cursor-default text-edge-outline animate-title font-display whitespace-nowrap bg-clip-text bg-white p-5">
						Tech Stack
					</h1>
					<div className="hidden w-full h-px animate-glow md:block animate-fade-right bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
					<div className="my-4 md:my-8 animate-fade-in w-full max-w-7xl px-4">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
							{/* Languages */}
							<div className="bg-zinc-800/30 p-6 rounded-lg border border-zinc-700">
								<h3 className="text-xl md:text-2xl text-zinc-300 font-display mb-6 text-center">Languages</h3>
								<div className="space-y-4">
									{languages.map((lang) => (
										<div key={lang.name}>
											<div className="flex justify-between mb-1">
												<span className="text-sm md:text-base text-zinc-300 font-semibold">{lang.name}</span>
												<span className="text-sm md:text-base text-zinc-400">{lang.value}%</span>
											</div>
											<div className="w-full bg-zinc-800 rounded-full h-3 md:h-4">
												<div
													className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 md:h-4 rounded-full transition-all duration-700"
													style={{ width: `${lang.value}%` }}
												></div>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Frontend */}
							<div className="bg-zinc-800/30 p-6 rounded-lg border border-zinc-700">
								<h3 className="text-xl md:text-2xl text-zinc-300 font-display mb-6 text-center">Frontend</h3>
								<div className="space-y-4">
									{frontend.map((tech) => (
										<div key={tech.name}>
											<div className="flex justify-between mb-1">
												<span className="text-sm md:text-base text-zinc-300 font-semibold">{tech.name}</span>
												<span className="text-sm md:text-base text-zinc-400">{tech.value}%</span>
											</div>
											<div className="w-full bg-zinc-800 rounded-full h-3 md:h-4">
												<div
													className="bg-gradient-to-r from-purple-400 to-purple-600 h-3 md:h-4 rounded-full transition-all duration-700"
													style={{ width: `${tech.value}%` }}
												></div>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Backend */}
							<div className="bg-zinc-800/30 p-6 rounded-lg border border-zinc-700">
								<h3 className="text-xl md:text-2xl text-zinc-300 font-display mb-6 text-center">Backend</h3>
								<div className="space-y-4">
									{backend.map((tech) => (
										<div key={tech.name}>
											<div className="flex justify-between mb-1">
												<span className="text-sm md:text-base text-zinc-300 font-semibold">{tech.name}</span>
												<span className="text-sm md:text-base text-zinc-400">{tech.value}%</span>
											</div>
											<div className="w-full bg-zinc-800 rounded-full h-3 md:h-4">
												<div
													className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 md:h-4 rounded-full transition-all duration-700"
													style={{ width: `${tech.value}%` }}
												></div>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* AI */}
							<div className="bg-zinc-800/30 p-6 rounded-lg border border-zinc-700">
								<h3 className="text-xl md:text-2xl text-zinc-300 font-display mb-6 text-center">AI</h3>
								<div className="space-y-4">
									{ai.map((tech) => (
										<div key={tech.name}>
											<div className="flex justify-between mb-1">
												<span className="text-sm md:text-base text-zinc-300 font-semibold">{tech.name}</span>
												<span className="text-sm md:text-base text-zinc-400">{tech.value}%</span>
											</div>
											<div className="w-full bg-zinc-800 rounded-full h-3 md:h-4">
												<div
													className="bg-gradient-to-r from-pink-400 to-pink-600 h-3 md:h-4 rounded-full transition-all duration-700"
													style={{ width: `${tech.value}%` }}
												></div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</ScrollSection>

				{/* Projects Section */}
				<ScrollSection id="projects" className="flex flex-col items-center justify-center min-h-[80vh] pt-16 md:pt-0">
					<div className="hidden w-full h-px animate-glow md:block animate-fade-left bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
					<h1 className="z-10 text-2xl md:text-4xl lg:text-6xl xl:text-7xl text-transparent duration-1000 cursor-default text-edge-outline animate-title font-display whitespace-nowrap bg-clip-text bg-white p-5">
						Projects
					</h1>
					<div className="hidden w-full h-px animate-glow md:block animate-fade-right bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
					<div className="my-4 md:my-8 animate-fade-in px-4">
						<p className="text-base md:text-lg text-zinc-500 mb-6 md:mb-8 text-center">
							Check out my latest projects and contributions
						</p>
						<GitHubProjects username={username} />
					</div>
				</ScrollSection>

				{/* Contact Section */}
				<ScrollSection id="contact" className="flex flex-col items-center justify-center min-h-[80vh] pt-16 md:pt-0">
					<div className="hidden w-full h-px animate-glow md:block animate-fade-left bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
					<h1 className="z-10 text-2xl md:text-4xl lg:text-6xl xl:text-7xl text-transparent duration-1000 cursor-default text-edge-outline animate-title font-display whitespace-nowrap bg-clip-text bg-white p-5">
						Contact
					</h1>
					<div className="hidden w-full h-px animate-glow md:block animate-fade-right bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
					<div className="my-4 md:my-8 animate-fade-in px-4">
						<div className="max-w-4xl mx-auto">
							<div className="text-center mb-12">
								<p className="text-xl md:text-2xl text-zinc-300 font-display mb-4">
									Let's Connect
								</p>
								<p className="text-base md:text-lg text-zinc-500 max-w-2xl mx-auto">
									I'm always open to discussing new opportunities, collaborations, or just having a chat about technology and innovation.
								</p>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
								{/* Contact Info */}
								<div className="bg-zinc-800/30 p-8 rounded-xl border border-zinc-700">
									<h3 className="text-2xl text-zinc-300 font-display mb-6">Get In Touch</h3>
									<div className="space-y-6">
										<div className="flex items-center space-x-4 group">
											<div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
												<svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
												</svg>
											</div>
											<div>
												<p className="text-sm text-zinc-400">Email</p>
												<a href="mailto:zawadul1@gmail.com" className="text-lg text-zinc-300 hover:text-white transition-colors font-medium">
													zawadul1@gmail.com
												</a>
											</div>
										</div>

										<div className="flex items-center space-x-4 group">
											<div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center group-hover:bg-green-600/30 transition-colors">
												<svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
													<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
												</svg>
											</div>
											<div>
												<p className="text-sm text-zinc-400">GitHub</p>
												<a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="text-lg text-zinc-300 hover:text-white transition-colors font-medium">
													@{username}
												</a>
											</div>
										</div>

										<div className="flex items-center space-x-4 group">
											<div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
												<svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
													<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
												</svg>
											</div>
											<div>
												<p className="text-sm text-zinc-400">LinkedIn</p>
												<a href="https://www.linkedin.com/in/zawadul-karim/" target="_blank" rel="noopener noreferrer" className="text-lg text-zinc-300 hover:text-white transition-colors font-medium">
													A.S.M. Zawadul Karim
												</a>
											</div>
										</div>

										<div className="flex items-center space-x-4 group">
											<div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center group-hover:bg-indigo-600/30 transition-colors">
												<svg className="w-6 h-6 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
													<path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
												</svg>
											</div>
											<div>
												<p className="text-sm text-zinc-400">Discord</p>
												<a href="https://discord.com/users/hypnosphynx" target="_blank" rel="noopener noreferrer" className="text-lg text-zinc-300 hover:text-white transition-colors font-medium">
													hypnosphynx
												</a>
											</div>
										</div>
									</div>
								</div>

								{/* Quick Message */}
								<div className="bg-zinc-800/30 p-8 rounded-xl border border-zinc-700">
									<h3 className="text-2xl text-zinc-300 font-display mb-6">Quick Message</h3>
									<EmailJSContact />
								</div>
							</div>

							{/* Additional Info */}
							<div className="text-center">
								<div className="inline-flex items-center space-x-2 text-zinc-400 text-sm">
									<span>📍</span>
									<span>Based in Dhaka, Bangladesh</span>
									<span>•</span>
									<span>Available for remote work</span>
									<span>•</span>
									<span>Open to collaborations</span>
								</div>
							</div>
						</div>
					</div>
				</ScrollSection>

				{/* Copyright Footer */}
				<footer className="w-full py-8 text-center">
					<div className="hidden w-full h-px animate-glow md:block animate-fade-left bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
					<p className="text-sm text-zinc-500 mt-8">
						© A.S.M. Zawadul Karim 2025. All rights reserved.
					</p>
				</footer>
			</div>
		</div>
	);
}
