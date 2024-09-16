
const BASE_PATH = "/arc-website"

export enum URLS {
  Internal_Home = BASE_PATH,
  Internal_Tools = BASE_PATH + "/details/tools-and-services",
  Internal_Partners = BASE_PATH + "/details/partners",
  
  GITHUB_REPO = "https://github.com/nfdi4plants/arc-website"
}

export function getUrlFromEnum(key: string): string | null {
  // Check if the input key is a valid key in the URLS enum
  if (key in URLS) {
    // Return the associated value from the enum
    return URLS[key as keyof typeof URLS];
  } else {
    // Return undefined if the key is not found
    return null;
  }
}