module.exports = function (eleventyConfig) {
  // Copy static assets straight through
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "admin": "admin" });

  // Blog posts collection (newest first)
  eleventyConfig.addCollection("posts", (c) =>
    c.getFilteredByGlob("src/posts/*.md").sort((a, b) => (b.date || 0) - (a.date || 0))
  );

  // Service area (town) pages, alphabetical
  eleventyConfig.addCollection("serviceAreas", (c) =>
    c.getFilteredByGlob("src/service-areas/*.md").sort((a, b) =>
      (a.data.title || "").localeCompare(b.data.title || "")
    )
  );

  // Parse a YouTube/Vimeo URL into embed data (null if unrecognized)
  eleventyConfig.addFilter("videoData", (url) => {
    if (!url) return null;
    let m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
    if (m) return {
      provider: "youtube", id: m[1],
      poster: `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg`,
      src: `https://www.youtube-nocookie.com/embed/${m[1]}?autoplay=1&rel=0`,
    };
    m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (m) return {
      provider: "vimeo", id: m[1], poster: "",
      src: `https://player.vimeo.com/video/${m[1]}?autoplay=1`,
    };
    return null;
  });

  // Readable date filter
  eleventyConfig.addFilter("readableDate", (d) => {
    if (!d) return "";
    const dt = new Date(d);
    return dt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
