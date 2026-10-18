// English twin of app/(pt)/flyover/page.tsx (/en/flyover/?id=<tourId>), also a universal link.
import { Suspense } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { FlyoverView, FlyoverFallback } from "@/views/FlyoverView";

export const metadata: Metadata = {
  ...pageMetadata("en", "/flyover/", {
    title: "Tour on AeroExplorer",
    description: "Fly over this city in 3D with AeroExplorer: narrated aerial tours on iPhone, iPad and Apple TV.",
  }),
  robots: { index: false, follow: true },
  itunes: { appId: "6752722065", appArgument: `${site.url}/en/flyover/` },
};

export default function Page() {
  return (
    <Suspense fallback={<FlyoverFallback locale="en" />}>
      <FlyoverView locale="en" />
    </Suspense>
  );
}
