import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { AstroIntegration } from 'astro';
import { specificationAssets, readSpecificationAsset } from '../data/specifications';

/** Publish only the downloads explicitly selected by the documentation adapters. */
export default function specificationAssetsIntegration(): AstroIntegration {
  return {
    name: 'specification-assets',
    hooks: {
      'astro:server:setup': ({ server }) => {
        const assets = new Map(specificationAssets.map((asset) => [asset.path, asset]));
        const types: Record<string, string> = {
          json: 'application/json', jsonld: 'application/ld+json',
          yml: 'application/yaml', yaml: 'application/yaml', md: 'text/markdown; charset=utf-8',
          svg: 'image/svg+xml', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg',
        };
        server.middlewares.use((request, response, next) => {
          const path = new URL(request.url ?? '/', 'http://localhost').pathname;
          const asset = assets.get(path);
          if (!asset) return next();
          const content = readSpecificationAsset(asset);
          response.setHeader('Content-Type', types[path.split('.').pop() ?? ''] ?? 'application/octet-stream');
          response.setHeader('Content-Length', content.byteLength);
          response.end(request.method === 'HEAD' ? undefined : content);
        });
      },
      'astro:build:done': ({ dir, logger }) => {
        const output = fileURLToPath(dir);
        for (const asset of specificationAssets) {
          const destination = resolve(output, `.${asset.path}`);
          if (!destination.startsWith(resolve(output) + sep)) {
            throw new Error(`Specification asset escapes output directory: ${asset.path}`);
          }
          mkdirSync(dirname(destination), { recursive: true });
          writeFileSync(destination, readSpecificationAsset(asset));
        }
        logger.info(`Published ${specificationAssets.length} specification downloads and images.`);
      },
    },
  };
}
