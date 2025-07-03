import { Helmet } from 'react-helmet-async';

import React from 'react';

export default function SeoComp({
  seoTitle,
  description,
  image,
  url,
  keywords = [],
  twitterCard = 'summary_large_image',
}) {
  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />

      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}
