export interface DataHubMetrics {
  arcs: number | null;
  gigabytes: number | null;
  contributions: number | null;
}

const nonnegativeNumber = (value: unknown): number | null =>
  typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : null;

/** Missing values are unavailable, never silently counted as zero. */
export function readDataHubMetrics(payload: unknown): DataHubMetrics {
  const empty = { arcs: null, gigabytes: null, contributions: null };
  if (!payload || typeof payload !== 'object' || !('total' in payload)) return empty;
  const total = payload.total;
  if (!total || typeof total !== 'object') return empty;
  const values = total as Record<string, unknown>;
  const counts = [values.internal, values.private, values.public].map(nonnegativeNumber);
  const sum = counts.every((value): value is number => value !== null)
    ? counts.reduce((result, value) => result + value, 0)
    : null;
  const bytes = nonnegativeNumber(values.size);
  return {
    arcs: sum !== null && Number.isFinite(sum) ? sum : null,
    gigabytes: bytes === null ? null : bytes / 1e9,
    contributions: nonnegativeNumber(values.commits),
  };
}

