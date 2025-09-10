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

export const handleSignout = async (dispatch, signoutSuccess) => {
  try {
    const res = await fetch('/api/user/signout', {
      method: 'POST',
    });

    const data = await res.json();
    if (!res.ok) {
      console.error(data.message);
    } else {
      dispatch(signoutSuccess());
    }
  } catch (error) {
    console.error(error.message);
  }
};
