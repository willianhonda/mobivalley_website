import { appParams, appMetadata } from "@/lib/app-routes";
import { AppView } from "@/views/AppView";

export const dynamicParams = false;
export const generateStaticParams = appParams;
export const generateMetadata = appMetadata("en", "page");

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <AppView locale="en" slug={slug} />;
}
