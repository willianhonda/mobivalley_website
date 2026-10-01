import { getDictionary } from "@/lib/dictionary";
import { pageMetadata } from "@/lib/metadata";
import { SitePrivacyView } from "@/views/LegalViews";

const t = getDictionary("en");
export const metadata = pageMetadata("en", "/privacypolicy/", { title: t.footer.privacy });

export default function Page() {
  return <SitePrivacyView locale="en" />;
}
