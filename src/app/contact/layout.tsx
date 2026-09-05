import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us what is breaking. Send the shape of the problem and our team will reply within one business day with an honest note on whether we can help.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
