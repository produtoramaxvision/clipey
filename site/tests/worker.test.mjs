import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import worker from "../src/worker.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Stand-in for the static-assets binding: records what it was asked for and answers like the real one would. */
function fakeAssets(routes = { "/": 200, "/blog/": 200 }) {
	const calls = [];
	return {
		calls,
		ASSETS: {
			async fetch(request) {
				calls.push(request);
				const { pathname } = new URL(request.url);
				const status = routes[pathname] ?? 404;
				return new Response(status === 404 ? "404 page" : `asset ${pathname}`, {
					status,
				});
			},
		},
	};
}

describe("www to apex redirect (S7)", () => {
	it("answers www with a 301 to the apex, keeping path and query exactly", async () => {
		const env = fakeAssets();
		const response = await worker.fetch(
			new Request("https://www.clipey.com.br/blog/en/clipey-1-15-whats-new/?utm_source=x&a=1#top"),
			env,
		);
		expect(response.status).toBe(301);
		expect(response.headers.get("Location")).toBe(
			"https://clipey.com.br/blog/en/clipey-1-15-whats-new/?utm_source=x&a=1",
		);
		expect(env.calls).toHaveLength(0);
	});

	it("redirects the bare www root and percent-encoded paths without touching assets", async () => {
		const env = fakeAssets();
		const root = await worker.fetch(new Request("https://www.clipey.com.br/"), env);
		expect(root.status).toBe(301);
		expect(root.headers.get("Location")).toBe("https://clipey.com.br/");
		const encoded = await worker.fetch(
			new Request("http://www.clipey.com.br/es/b%C3%BAsqueda?q=%C3%B1"),
			env,
		);
		expect(encoded.headers.get("Location")).toBe(
			"https://clipey.com.br/es/b%C3%BAsqueda?q=%C3%B1",
		);
		expect(env.calls).toHaveLength(0);
	});

	it("passes apex requests through to the assets binding unchanged", async () => {
		const env = fakeAssets();
		const request = new Request("https://clipey.com.br/blog/?q=1");
		const response = await worker.fetch(request, env);
		expect(env.calls).toEqual([request]);
		expect(response.status).toBe(200);
		expect(await response.text()).toBe("asset /blog/");
	});

	it("leaves 404 handling to the assets binding", async () => {
		const env = fakeAssets();
		const response = await worker.fetch(
			new Request("https://clipey.com.br/does-not-exist/"),
			env,
		);
		expect(response.status).toBe(404);
		expect(await response.text()).toBe("404 page");
		expect(env.calls).toHaveLength(1);
	});
});

describe("wrangler config for the redirect Worker (S7)", () => {
	const config = JSON.parse(
		readFileSync(path.join(root, "wrangler.jsonc"), "utf8").replace(/^\s*\/\/.*$/gm, ""),
	);

	it("keeps both custom domains bound to the Worker", () => {
		expect(config.routes).toEqual([
			{ pattern: "clipey.com.br", custom_domain: true },
			{ pattern: "www.clipey.com.br", custom_domain: true },
		]);
	});

	it("runs the Worker first so www never gets an asset, and keeps asset semantics", () => {
		expect(config.main).toBe("./src/worker.mjs");
		expect(config.assets).toEqual({
			directory: "./dist",
			binding: "ASSETS",
			html_handling: "auto-trailing-slash",
			not_found_handling: "404-page",
			run_worker_first: true,
		});
	});
});
