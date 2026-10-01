import { getDictionary } from "@/lib/dictionary";
import { pageMetadata } from "@/lib/metadata";
import { BrandView } from "@/views/BrandView";

const t = getDictionary("pt").brand;
export const metadata = pageMetadata("pt", "/marca/", { title: t.metaTitle, description: t.metaDescription });

export default function Page() {
  return <BrandView locale="pt" />;
}
