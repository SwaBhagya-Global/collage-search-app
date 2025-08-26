"use client";

import Image from "next/image";

export default function AdBanner() {
  // Sample data (replace/add as many URLs as you want)
  const ads = [
    {
      src: "../logo-mba.png",
      alt: "Ad 1",
    },
  ];

  return (
    <section className="flex flex-col items-center gap-4 py-4">
      {ads.slice(0,1).map((ad, index) => (
        <Image
          key={index}
          src={ad.src}
          alt={ad.alt}
          width={800}
          height={200}
          className="object-cover rounded-lg w-full max-w-[800px]"
        />
      ))}
    </section>
  );
}


