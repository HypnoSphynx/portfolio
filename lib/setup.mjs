import { promises as fs } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const data = {
	description: "My octo projects",
	githubUsername: "octocat",
	avatarUrl: "",
	displayName: "",
	email: "",
	socials: {},
};

(async () => {
	dotenv.config({ path: path.join(process.cwd(), '.env') });
	dotenv.config({ path: path.join(process.cwd(), '.env.local') });

	// Read data.json file
	const dataPath = path.join(process.cwd(), 'data.json');
	const dataJsonContent = await fs.readFile(dataPath, 'utf8');
	const dataJson = JSON.parse(dataJsonContent);

	if (!process.env.GH_TOKEN) {
		console.log('⚠️  GH_TOKEN not set. Creating .env.local file with template...');
		const envContent = `GH_TOKEN=your_github_token_here
VC_TOKEN=your_vercel_token_here
IS_TEMPLATE=false`;
		await fs.writeFile(path.join(process.cwd(), '.env.local'), envContent);
		console.log('✅ Created .env.local file. Please add your GitHub token.');
		return;
	}
	if (process.env.IS_TEMPLATE === 'false') {
		// This means it's not the template, it's my legit site
		// I orderride the env variable for my site. This means that when
		// folks clone this repo for the first time, it will delete my personal content
		return;
	}
	if (dataJson.githubUsername !== 'jirihofman') {
		// This means it's not the template, it's someone's legit site
		return;
	}

	console.log('⚠️  This is still a template. Please update data.json file and set IS_TEMPLATE to false in .env.local to use this template');
	console.log('⚙️  Reverting personal data to template data...');

	// Remove favicon.ico if it exists
	const faviconPath = path.join(process.cwd(), 'public', 'favicon.ico');
	try {
		await fs.unlink(faviconPath);
		console.log('⚙️  Removed favicon.ico');
	} catch (error) {
		console.log('ℹ️  favicon.ico not found, skipping...');
	}

	// Open data.json, merge it with data for octocat and save it to disk.
	const newData = { ...dataJson, ...data };
	// Write it back to disk.
	await fs.writeFile(dataPath, JSON.stringify(newData, null, 4));

	console.log('⚙️  Reverted to template data (using octocat).');
})();
