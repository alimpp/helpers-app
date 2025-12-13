export const useCustomFetch = () => {
  const token = useCookie("token").value;

  const customFetch = $fetch.create({
    onRequest({ options }) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    },
    onRequestError({ error }) {
      console.error("Request error:", error);
    },
  });

  return customFetch;
};
