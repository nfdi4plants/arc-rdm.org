
const BASE_PATH = "/arc-website"

export enum URLS {
  Internal_Home = BASE_PATH,
  Internal_Tools = BASE_PATH + "/details/tools-and-services",

  Internal_Com_DataManagement = BASE_PATH + "/details/data-management-principle",
  Internal_Com_Tools = BASE_PATH + "/details/tools-and-services",
  Internal_Com_Documentation = BASE_PATH + "/details/documentation-principle",
  Internal_Com_Organization = BASE_PATH + "/details/organization-principle",
  Internal_Com_Fairness = BASE_PATH + "/details/fairness-and-rdm",

  Internal_Dev_DataModel = BASE_PATH + "/details/arc-data-model",
  Internal_Dev_Representation = BASE_PATH + "/details/arc-representation",
  Internal_Dev_FDO = BASE_PATH + "/details/arc-fdo",


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