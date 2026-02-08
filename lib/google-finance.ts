export interface GoogleFinanceData {
  peRatio: number | null;
  latestEarnings: number | null;
}

export async function fetchGoogleFinanceData(
  symbol: string
): Promise<GoogleFinanceData> {
  try {
    const url = `https://www.google.com/finance/quote/${symbol}:NSE`;

    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    if (!response.ok) {
      return { peRatio: null, latestEarnings: null };
    }

    const html = await response.text();

    const peRatio = extractPERatio(html);
    const price = extractPrice(html);

    let latestEarnings: number | null = null;
    if (peRatio && price && peRatio > 0) {
      latestEarnings = parseFloat((price / peRatio).toFixed(2));
    }

    return { peRatio, latestEarnings };
  } catch {
    return { peRatio: null, latestEarnings: null };
  }
}

function extractPrice(html: string): number | null {
  const patterns = [
    /data-last-price="([\d,.]+)"/i,
    /₹([\d,]+(?:\.\d+)?)/,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      const value = parseFloat(match[1].replace(/,/g, ''));
      if (!isNaN(value) && value > 0) {
        return value;
      }
    }
  }

  return null;
}

function extractPERatio(html: string): number | null {
  const patterns = [
    /P\/E ratio<\/div>[^<]*<div[^>]*>[^<]*<\/div>[^<]*<div[^>]*>([\d,.]+)<\/div>/i,
    /P\/E ratio[\s\S]{0,500}?([\d]+\.[\d]+)/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      const value = parseFloat(match[1].replace(/,/g, ''));
      if (!isNaN(value) && value > 0 && value < 1000) {
        return value;
      }
    }
  }

  return null;
}

export async function fetchAllGoogleFinanceData(
  symbols: string[]
): Promise<Map<string, GoogleFinanceData>> {
  const results = new Map<string, GoogleFinanceData>();

  const fetchPromises = symbols.map(async (symbol) => {
    try {
      const data = await fetchGoogleFinanceData(symbol);
      results.set(symbol, data);
    } catch {
      results.set(symbol, { peRatio: null, latestEarnings: null });
    }
  });

  await Promise.all(fetchPromises);
  return results;
}
