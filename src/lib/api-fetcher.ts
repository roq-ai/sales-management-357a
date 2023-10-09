import queryString from 'qs';
export async function fetcher(url: string, options: RequestInit, params?: Record<string, any>) {
  try {
    if (params) {
      console.log('params: ', params);
      url = url + '?' + queryString.stringify(params);
    }
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json(); // Assuming the server returns error details as JSON
      throw new Error(`Error ${response.status}: ${response.statusText}\n${JSON.stringify(errorData)}`);
    }
    return await response.json();
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    throw error; // Re-throwing the error so it can be caught/handled by the calling code if needed
  }
}
