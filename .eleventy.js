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
