import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SEOWrapper({
  title = 'NextLogic AI',
  description = 'Teacher-controlled AI learning platform',
  keywords = '',
  canonical = '',
  noindex = false,
  ogImage = '/assets/og-image.png',
  children
}) {
  const location = useLocation();

  useEffect(() => {
    // Update page title
    document.title = title;

    // Update meta description
    updateMetaTag('name', 'description', description);

    // Update keywords
    if (keywords) {
      updateMetaTag('name', 'keywords', keywords);
    }

    // Update canonical URL
    if (canonical) {
      updateLinkTag('canonical', canonical);
    }

    // Update robots tag
    updateMetaTag('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // Update Open Graph tags
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', ogImage);
    updateMetaTag('property', 'og:url', window.location.href);
    updateMetaTag('property', 'og:type', 'website');

    // Update Twitter Card tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', ogImage);
  }, [title, description, keywords, canonical, noindex, ogImage, location]);

  return children;
}

// Helper function to update meta tags
function updateMetaTag(attribute, key, content) {
  let element = document.querySelector(`meta[${attribute}="${key}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
}

// Helper function to update link tags
function updateLinkTag(rel, href) {
  let element = document.querySelector(`link[rel="${rel}"]`);
  
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  
  element.setAttribute('href', href);
}