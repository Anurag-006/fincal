import "../styles/globals.css";
export const metadata = {
  title: "FinCal - Retire Smart",
  description: "Interactive, educational retirement planning calculator. No jargon.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
