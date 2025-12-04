export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Try to serve the static asset first.
    let response = await env.ASSETS.fetch(request);

    // For SPA routes (404 on assets), return index.html so client routing works.
    if (response.status === 404 && request.method === "GET") {
      const indexUrl = new URL("/index.html", url.origin);
      response = await env.ASSETS.fetch(new Request(indexUrl, request));
    }

    return response;
  },
};
