import { pageMetadata } from "@/lib/metadata";
import { HomeView } from "@/views/HomeView";

export const metadata = pageMetadata("pt", "/");

export default function Page() {
  return <HomeView locale="pt" />;
}
