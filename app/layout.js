import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SessionWrapper from "../components/SessionWrapper";
import 'react-toastify/dist/ReactToastify.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Get me A Chai",
  description: "For Funding Projects",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionWrapper>



          <div className="fixed top-0 z-[-2] min-h-screen  min-w-full rotate-180 transform bg-[#c2a991] bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(128, 99, 84, 1)_100%)]"></div>
          <Navbar />
          <div className="min-h-screen">

            {children}
          </div>
          <div className="relative  bg-neutral-950 border-t border-gray-400/20 bottom-0 flex items-center justify-center mx-auto">

            <Footer />
          </div>
        </SessionWrapper>

      </body>
    </html>
  );
}
