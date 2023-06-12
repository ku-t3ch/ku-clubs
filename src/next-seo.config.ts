import { DefaultSeoProps } from "next-seo";

export default {
  title: "KU Clubs",
  description: "KU Clubs คือ เว็บรวบรวมกลุ่มกิจกรรมของมหาวิทยาลัยเกษตรศาสตร์",
  openGraph: {
    title: "KU Clubs",
    url: "https://clubs.kutech.club",
    type: "website",
    description: "KU Clubs คือ เว็บรวบรวมกลุ่มกิจกรรมของมหาวิทยาลัยเกษตรศาสตร์",
    images: [
      //   {
      //     url: "/og-image.png",
      //     width: 1600,
      //     height: 900,
      //     alt: "KU Clubs",
      //   },
    ],
    siteName: "KU Clubs",
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
} as DefaultSeoProps;
