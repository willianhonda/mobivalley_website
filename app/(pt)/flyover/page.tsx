// Shared tour links from AeroExplorer land here (/flyover/?id=<tourId>). With the app installed, iOS
// opens the app instead (universal link, see public/.well-known/apple-app-site-association).
import { Suspense } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { FlyoverView, FlyoverFallback } from "@/views/FlyoverView";

export const metadata: Metadata = {
  ...pageMetadata("pt", "/flyover/", {
    title: "Tour no AeroExplorer",
    description: "Sobrevoe esta cidade em 3D com o AeroExplorer: tours aéreos narrados no iPhone, no iPad e na Apple TV.",
  }),
  // One page for every tour: keep it out of search results.
  robots: { index: false, follow: true },
  // FlyoverView swaps app-argument for the full link, including ?id=.
  itunes: { appId: "6752722065", appArgument: `${site.url}/flyover/` },
};

export default function Page() {
  return (
    <Suspense fallback={<FlyoverFallback locale="pt" />}>
      <FlyoverView locale="pt" />
    </Suspense>
  );
}
