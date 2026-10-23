/**
 * CLI helpers for build-media.mjs: `--only <name,...>` limits which stills are encoded without touching COPIES.
 */
export function parseOnlyArg(argv) {
	const index = argv.indexOf("--only");
	if (index === -1) return null;
	const value = argv[index + 1];
	if (!value || value.startsWith("-"))
		throw new Error("pass still names after --only, e.g. --only phone-portrait,phone-landscape");
	return value.split(",").map((name) => name.trim()).filter(Boolean);
}

/** @param {readonly { name: string }[]} stills */
export function selectStills(stills, onlyNames) {
	if (!onlyNames) return stills;
	const wanted = new Set(onlyNames);
	const picked = stills.filter((still) => wanted.has(still.name));
	const missing = onlyNames.filter((name) => !picked.some((still) => still.name === name));
	if (missing.length)
		throw new Error(`unknown still name(s) for --only: ${missing.join(", ")}`);
	return picked;
}

/** Drop manifest file entries for one still name (all locales and widths). */
export function stripStillFromManifest(manifest, stillName) {
	const prefix = `${stillName}-`;
	const files = Object.fromEntries(
		Object.entries(manifest.files).filter(([file]) => !file.startsWith(prefix)),
	);
	const stills = { ...manifest.stills, [stillName]: [] };
	return { stills, files };
}
