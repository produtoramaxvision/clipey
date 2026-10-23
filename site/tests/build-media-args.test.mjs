import { describe, expect, it } from "vitest";
import {
	parseOnlyArg,
	selectStills,
	stripStillFromManifest,
} from "../scripts/media/build-args.mjs";

describe("build-media --only", () => {
	it("parses a comma-separated list after --only", () => {
		expect(parseOnlyArg(["node", "build-media.mjs", "--only", "phone-portrait,phone-landscape"])).toEqual([
			"phone-portrait",
			"phone-landscape",
		]);
		expect(parseOnlyArg(["node", "build-media.mjs"])).toBeNull();
	});

	it("rejects --only without names", () => {
		expect(() => parseOnlyArg(["node", "build-media.mjs", "--only"])).toThrow(/pass still names/);
	});

	it("keeps every still when --only is absent", () => {
		const stills = [{ name: "a" }, { name: "b" }];
		expect(selectStills(stills, null)).toBe(stills);
	});

	it("filters to named stills and rejects unknown names", () => {
		const stills = [{ name: "phone-portrait" }, { name: "phone-landscape" }];
		expect(selectStills(stills, ["phone-portrait"])).toEqual([{ name: "phone-portrait" }]);
		expect(() => selectStills(stills, ["missing"])).toThrow(/unknown still/);
	});

	it("removes every width and locale file entry for one still from the manifest", () => {
		const manifest = {
			stills: { "phone-portrait": ["pt-BR"], export: ["en"] },
			files: {
				"phone-portrait-pt-BR-800.webp": { width: 800, height: 1 },
				"phone-portrait-en-1400.webp": { width: 1400, height: 1 },
				"export-en-1920.webp": { width: 1920, height: 1 },
			},
		};
		expect(stripStillFromManifest(manifest, "phone-portrait")).toEqual({
			stills: { "phone-portrait": [], export: ["en"] },
			files: { "export-en-1920.webp": { width: 1920, height: 1 } },
		});
	});
});
