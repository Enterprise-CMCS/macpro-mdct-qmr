export const fireTealiumPageView = (user, url, pathname) => {
  // TODO: this will need to be updated for the upcoming Combined Ratio page view
  const isReportPage =
    pathname.endsWith("-AD") ||
    pathname.endsWith("-CH") ||
    pathname.endsWith("-HH") ||
    pathname.endsWith("CSQ");
  const contentType = isReportPage ? "form" : "app";
  const sectionName = isReportPage ? pathname.split("/")[1] : "main app";
  const { host: siteDomain } = url ? new URL(url) : null;
  if (window.utag) {
    window.utag.view({
      content_language: "en",
      content_type: contentType,
      page_name: sectionName + ":" + pathname,
      page_path: pathname,
      site_domain: siteDomain,
      site_environment: process.env.NODE_ENV,
      site_section: sectionName,
      logged_in: !!user,
    });
  }
};
