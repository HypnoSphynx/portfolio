import "../global.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import data from "../data.json";

const username = process.env.GITHUB_USERNAME || data.githubUsername;
const displayName = data.displayName || username;

/** @type {import('next').Metadata} */
export const metadata = {
	title: {
		default: ["Zawadul Karim"].join(""),
		template: "%s | " + data.displayName + "'s portfolio",
	},
	description: 'GitHub portfolio for ' + displayName,
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	icons: [
		{
			url: "/favicon.png",
			rel: "icon",
			sizes: "any",
			type: "image/svg+xml",
		},
	]
};
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const calSans = LocalFont({
	src: "../public/fonts/CalSans-SemiBold.ttf",
	variable: "--font-calsans",
});

const navigation = [
	{ name: "Projects", href: "/projects" },
	{ name: "Contact", href: "/contact" },
	{ name: "Proficiency", href: "/proficiency" },
];

export default function RootLayout({
	children,
}) {
	return (
		<html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
			<body
				className={`bg-black ${
					process.env.NODE_ENV === "development" ? "debug-screens" : ''
				}`}
			>
				{children}
			</body>
		</html>
	);
}
