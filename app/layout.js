import localFont from "next/font/local";
import "./globals.css";
import UserContext from "@/context/context";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "NEC",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-radial from-purple-950 via-[#10001C] to-black min-h-screen`}
      >
        <div className="bg-noise fixed inset-0 opacity-5 z-0 pointer-events-none"></div>
        <UserContext>{children}</UserContext>
      </body>
    </html>
  );
}
