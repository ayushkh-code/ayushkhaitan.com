import { useEffect } from "react";
import { siteMeta } from "../data/pageMeta";

function setMetaTag(attribute, key, content) {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!href) {
    link?.remove();
    return;
  }
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

function applyMeta(meta) {
  document.title = meta.title;
  setMetaTag("name", "description", meta.description);
  setMetaTag("property", "og:title", meta.ogTitle);
  setMetaTag("property", "og:description", meta.ogDescription);
  setMetaTag("property", "og:url", meta.ogUrl);
  setCanonical(meta.canonical);
}

export default function usePageMeta(meta) {
  useEffect(() => {
    applyMeta(meta);
    return () => applyMeta(siteMeta);
  }, [meta]);
}
