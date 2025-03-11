import TermsAndConditions from "@/components/MoreInfo/TermsAndConditions";


export const metadata = {
  title: "Terms & Conditions",
  description:
    "Read FitLife360's terms and conditions to understand the rules and policies governing the use of our website and services.",

  keywords: [
    "FitLife terms and conditions",
    "fitness website policies",
    "legal agreements",
    "terms of use",
    "user agreements",
  ],

  robots: "noindex, follow",
  alternates: {
    canonical: "https://www.fitlife360.life/terms-and-conditions",
  },
};



export default function Home() {
  return (
    <div>
      <TermsAndConditions />
    </div>
  );
}
