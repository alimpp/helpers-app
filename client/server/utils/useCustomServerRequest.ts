export const useCustomServerRequest = async (
  event: any,
  url: string,
  options: any = {}
) => {
  const token = getCookie(event, "token");

  const headers = {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
    ...options.headers,
  };
  try {
    const response = await $fetch(url, {
      ...options,
      headers,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
