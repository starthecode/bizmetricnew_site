export async function fetchApi({
  url,
  method = 'GET',
  data = null,
  headers = {},
}) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const res = await fetch(url, options);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    return await res.json();
  } catch (error) {
    console.error('API Error', error.message);
    throw error;
  }
}
