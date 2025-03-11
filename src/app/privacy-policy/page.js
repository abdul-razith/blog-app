import Privacy from "@/components/MoreInfo/Privacy";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Read the FitLife360 privacy policy to understand how we collect, use, and protect your data. Your privacy matters to us.",

  keywords: [
    "FitLife privacy policy",
    "data protection",
    "user information policy",
    "fitness site privacy",
    "GDPR compliance",
  ],

  robots: "noindex, follow",
  alternates: {
    canonical: "https://www.fitlife360.life/privacy-policy",
  },
};


export default function Home() {
  return (
    <div>
      <Privacy />
    </div>
  );
}
