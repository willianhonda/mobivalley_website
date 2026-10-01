import { appParams, appMetadata } from "@/lib/app-routes";
import { AppLegalView } from "@/views/LegalViews";

export const dynamicParams = false;
export const generateStaticParams = appParams;
export const generateMetadata = appMetadata("en", "privacy");

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <AppLegalView locale="en" slug={slug} kind="privacy" />;
}
