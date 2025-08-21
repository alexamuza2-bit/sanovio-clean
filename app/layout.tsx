import "./globals.css";

export const metadata = {
  title: "Sanovio Clean",
  description: "Curățenie profesională în București & Ilfov"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
