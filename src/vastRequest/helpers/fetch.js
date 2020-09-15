/* eslint-disable filenames/match-exported, import/no-unassigned-import */
import 'whatwg-fetch';

const fetch = async (endpoint, options = {}) => {
  const defaults = {
    credentials: 'include'
  };

  const fetchOptions = Object.assign({}, defaults, options);

  try {
    const response = await window.fetch(endpoint, fetchOptions);

    if (response.status >= 400) {
      const error = new Error(response.statusText);

      error.response = response;
      throw error;
    }

    return response;
  } catch (error) {
    fetchOptions.credentials = 'omit';
    const response = await window.fetch(endpoint, fetchOptions);

    if (response.status >= 400) {
      const errorWithCors = new Error(response.statusText);

      errorWithCors.response = response;
      throw errorWithCors;
    }

    return response;
  }
};

export default fetch;
