import fs from "node:fs";
import path from "node:path";

export function readCaptureManifest(file) {
	if (!fs.existsSync(file)) return new Map();
	const records = JSON.parse(fs.readFileSync(file, "utf8"));
	if (!Array.isArray(records))
		throw new Error("capture manifest must be a JSON array");
	const entries = new Map();
	for (const record of records) {
		if (
			typeof record.key !== "string" ||
			typeof record.name !== "string" ||
			!/^[a-z0-9-]+$/.test(record.key) ||
			!/^[a-z0-9-]+$/.test(record.name)
		)
			throw new Error("invalid capture manifest key or name");
		const fileName = `blog/img/${record.key}/${record.name}.webp`;
		if (record.file && record.file !== fileName)
			throw new Error(`capture path must be /${fileName}`);
		entries.set(`/${fileName}`, { ...record, file: fileName });
	}
	return entries;
}

export function missingCaptures(sources, manifest, publicDir) {
	return sources.filter((src) => {
		if (!/^\/blog\/img\/[a-z0-9-]+\/[a-z0-9-]+\.webp$/.test(src)) return false;
		const record = manifest.get(src);
		return !record || !fs.existsSync(path.join(publicDir, record.file));
	});
}
