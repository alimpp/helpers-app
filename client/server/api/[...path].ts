import { useCustomServerRequest } from "~/server/utils/useCustomServerRequest";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.baseUrl;
  const method = event.method;
  const path = event.context.params?.path;

  const body =
    method !== "GET" && method !== "HEAD" ? await readBody(event) : undefined;
  console.log(
    `METHOD ---> ${method} , SERVICE CALL PATH ---> ${baseUrl}/${path}`
  );

  switch (method) {
    case "GET":
      return await useCustomServerRequest(event, `${baseUrl + "/" + path}`, {
        method: method,
      });
    case "POST":
      return await useCustomServerRequest(event, `${baseUrl + "/" + path}`, {
        method: method,
        body: body,
      });

    case "PUT":
      return await useCustomServerRequest(event, `${baseUrl + "/" + path}`, {
        method: method,
        body: body,
      });

    case "PATCH":
      return await useCustomServerRequest(event, `${baseUrl + "/" + path}`, {
        method: method,
        body: body,
      });

    case "DELETE":
      return await useCustomServerRequest(event, `${baseUrl + "/" + path}`, {
        method: method,
      });

    default:
      throw createError({
        statusCode: 405,
        statusMessage: "Method Not Allowed",
      });
  }
});
