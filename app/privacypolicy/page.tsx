import type { Metadata } from "next";
import { Contours } from "@/components/Contours";
import { openGraphBase, site } from "@/lib/site";

// This URL is referenced by App Store listings. Keep the path stable.
export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy of Mobivalley Tecnologia da Informação.",
  alternates: { canonical: "/privacypolicy/" },
  openGraph: {
    ...openGraphBase,
    url: "/privacypolicy/",
    title: "Privacy Policy — Mobivalley",
    description: "Privacy Policy of Mobivalley Tecnologia da Informação.",
  },
};

const sections: { title: string; body: (string | string[])[] }[] = [
  {
    title: "Information Collection and Use",
    body: [
      "For a better experience while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to your name, phone number, and postal address. The information that we collect will be used to contact or identify you.",
    ],
  },
  {
    title: "Log Data",
    body: [
      "We want to inform you that whenever you visit our Service, we collect information that your browser sends to us that is called Log Data. This Log Data may include information such as your computer's Internet Protocol (\"IP\") address, browser version, pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.",
    ],
  },
  {
    title: "Cookies",
    body: [
      "Cookies are files with small amount of data that is commonly used an anonymous unique identifier. These are sent to your browser from the website that you visit and are stored on your computer's hard drive.",
      "Our website uses these \"cookies\" to collection information and to improve our Service. You have the option to either accept or refuse these cookies, and know when a cookie is being sent to your computer. If you choose to refuse our cookies, you may not be able to use some portions of our Service.",
    ],
  },
  {
    title: "Service Providers",
    body: [
      "We may employ third-party companies and individuals due to the following reasons:",
      [
        "To facilitate our Service;",
        "To provide the Service on our behalf;",
        "To perform Service-related services; or",
        "To assist us in analyzing how our Service is used.",
      ],
      "We want to inform our Service users that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.",
    ],
  },
  {
    title: "Security",
    body: [
      "We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.",
    ],
  },
  {
    title: "Links to Other Sites",
    body: [
      "Our Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over, and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.",
    ],
  },
  {
    title: "Children's Privacy",
    body: [
      "Our Services do not address anyone under the age of 13. We do not knowingly collect personal identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.",
    ],
  },
  {
    title: "Changes to This Privacy Policy",
    body: [
      "We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <article lang="en">
      <header className="relative isolate overflow-hidden bg-ink pt-36 pb-16 text-paper sm:pt-44 sm:pb-20">
        <Contours className="-z-10 text-paper [mask-image:linear-gradient(to_bottom,transparent,black)]" lines={10} />
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <p className="eyebrow text-mint">Legal</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">Privacy Policy</h1>
          <p className="mt-4 text-fog">Mobivalley Tecnologia da Informação</p>
        </div>
      </header>

      <div className="on-light bg-paper py-16 text-ink sm:py-24">
        <div className="mx-auto max-w-3xl space-y-5 px-5 text-[1.0625rem] leading-relaxed text-slate sm:px-8">
          <p>
            Mobivalley Tecnologia da Informação operates the www.mobivalley.com.br website, which provides the
            SERVICE.
          </p>
          <p>
            This page is used to inform website visitors regarding our policies with the collection, use, and
            disclosure of Personal Information if anyone decided to use our Service, the Mobivalley website.
          </p>
          <p>
            If you choose to use our Service, then you agree to the collection and use of information in relation
            with this policy. The Personal Information that we collect are used for providing and improving the
            Service. We will not use or share your information with anyone except as described in this Privacy
            Policy.
          </p>
          <p>
            The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is
            accessible at www.mobivalley.com.br, unless otherwise defined in this Privacy Policy.
          </p>

          {sections.map((section) => (
            <section key={section.title} className="pt-6">
              <h2 className="mb-4 text-xl font-semibold tracking-[-0.02em] text-ink">{section.title}</h2>
              <div className="space-y-5">
                {section.body.map((block, i) =>
                  Array.isArray(block) ? (
                    <ul key={i} className="list-disc space-y-1.5 pl-6 marker:text-mint-deep">
                      {block.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={i}>{block}</p>
                  ),
                )}
              </div>
            </section>
          ))}

          <section className="pt-6">
            <h2 className="mb-4 text-xl font-semibold tracking-[-0.02em] text-ink">Contact Us</h2>
            <p>
              If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-medium text-ink underline decoration-mint-deep/40 underline-offset-4 hover:decoration-mint-deep"
              >
                {site.email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
