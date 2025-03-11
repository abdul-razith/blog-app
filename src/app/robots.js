export default function robots() {
    return {
      rules: [
        {
          userAgent: "*", // Applies to all search engines
          allow: "/", // Allow indexing for all public pages
          disallow: ["/admin", "/api"], // Prevent indexing of admin & API routes
        },
      ],
      sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
    };
  }
  