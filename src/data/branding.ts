// Bump this version when the public logo artwork changes to refresh cached images.
const logoVersion = 'teal-plum-2';

export const logoUrls = {
  arc: {
    light: `/favicon.svg?v=${logoVersion}`,
    dark: `/favicon-dark.svg?v=${logoVersion}`,
  },
  roCrate: {
    light: `/ro-crate-logo.svg?v=${logoVersion}`,
    dark: `/ro-crate-logo-dark.svg?v=${logoVersion}`,
  },
} as const;
