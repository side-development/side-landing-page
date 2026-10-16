import type { Metadata } from "next";

export const SITE_URL = "https://sidecode.com.br";

type SocialMetadataInput = {
  title: string;
  description: string;
  locale: "pt-BR" | "en";
  path: string;
};

export function socialMetadata({ title, description, locale, path }: SocialMetadataInput): Pick<Metadata, "openGraph" | "twitter"> {
  const image = {
    url: `${SITE_URL}/brand/social-preview.png`,
    width: 1200,
    height: 630,
    alt: "Side",
  };

  return {
    openGraph: {
      title,
      description,
      url: new URL(path, SITE_URL).href,
      siteName: "Side",
      type: "website",
      locale: locale === "en" ? "en_US" : "pt_BR",
      alternateLocale: locale === "en" ? "pt_BR" : "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}
