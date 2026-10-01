// This URL is referenced from App Store listings. Keep the path stable.
import { getDictionary } from "@/lib/dictionary";
import { pageMetadata } from "@/lib/metadata";
import { SitePrivacyView } from "@/views/LegalViews";

const t = getDictionary("pt");
export const metadata = pageMetadata("pt", "/privacypolicy/", { title: t.footer.privacy });

export default function Page() {
  return <SitePrivacyView locale="pt" />;
}
