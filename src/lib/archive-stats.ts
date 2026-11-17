export const ARCHIVE_COMMUNITY_URL = 'https://archive.nfdi4plants.org/communities/dataplant/records';

// Community search returns published records; latest versions avoid counting releases twice.
// https://inveniordm.docs.cern.ch/reference/rest_api_communities/#get-community-records
export const ARCHIVE_RECORDS_API = 'https://archive.nfdi4plants.org/api/communities/dataplant/records?size=1&allversions=false';

export interface PublishedArcStats {
  count: number | null;
  retrievedAt: string | null;
}

/** Read the search total, not the number of records in the requested page. */
export function readPublishedArcCount(payload: unknown): number | null {
  if (!payload || typeof payload !== 'object' || !('hits' in payload)) return null;
  const hits = payload.hits;
  if (!hits || typeof hits !== 'object' || !('total' in hits)) return null;
  const total = hits.total;
  return typeof total === 'number' && Number.isSafeInteger(total) && total >= 0 ? total : null;
}

/** Fetch during rendering: ARChive does not currently allow cross-origin browser requests. */
export async function fetchPublishedArcStats(fetcher: typeof fetch = fetch): Promise<PublishedArcStats> {
  try {
    const response = await fetcher(ARCHIVE_RECORDS_API, {
      headers: { Accept: 'application/json' },
      credentials: 'omit',
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`ARChive returned HTTP ${response.status}`);
    const count = readPublishedArcCount(await response.json());
    if (count === null) throw new Error('ARChive returned an invalid record total');
    return { count, retrievedAt: new Date().toISOString() };
  } catch (error) {
    console.warn('[archive-stats] Published ARC count unavailable:', error instanceof Error ? error.message : error);
    return { count: null, retrievedAt: null };
  }
}
