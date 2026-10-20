// Local, language-specific search history. A trailing space is significant
// to the search engine (whole-word search), so preserve the original query.
export const MAX_RECENT_SEARCHES = 8;

export function sanitizeRecentSearches(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const items: string[] = [];
  const seen = new Set<string>();
  for (const item of value) {
    if (typeof item !== 'string' || item.trim().length < 2) continue;
    const query = item.trimStart();
    const identity = query.toLowerCase();
    if (seen.has(identity)) continue;
    seen.add(identity);
    items.push(query);
    if (items.length === MAX_RECENT_SEARCHES) break;
  }
  return items;
}

export function addRecentSearch(items: string[], query: string): string[] {
  return sanitizeRecentSearches([query, ...items]);
}

export function readRecentSearches(key: string): string[] {
  try {
    return sanitizeRecentSearches(JSON.parse(localStorage.getItem(key) || '[]'));
  } catch {
    return [];
  }
}

export function saveRecentSearches(key: string, items: string[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(sanitizeRecentSearches(items)));
  } catch {
    // Private browsing, quota exceeded or storage unavailable: keep the UI usable.
  }
}
