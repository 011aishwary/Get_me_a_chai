import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SessionWrapper from "../components/SessionWrapper";
import 'react-toastify/dist/ReactToastify.css';
import NextTopLoader from 'nextjs-toploader';
import ClientLoader from "../components/ClientLoader";

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
        <NextTopLoader color="#92400e"
                       initialPosition={0.08}
                       crawlSpeed={200}
                       height={3}
                       crawl={true}
                       showSpinner={true}
                       easing="ease"
                       speed={200}
                       shadow="0 0 10px #92400e,0 0 5px #c2a991"
        />
        <SessionWrapper>
          <ClientLoader>
            <div className="fixed  top-0 z-[-2] min-h-screen  min-w-full rotate-180 transform bg-[#c2a991] bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(128, 99, 84, 1)_100%)]"></div>
            <Navbar />
            <div className="min-h-screen">
              {children}
            </div>
            <div className="relative  bg-neutral-950 border-t border-gray-400/20 bottom-0 flex items-center justify-center mx-auto">
              <Footer />
            </div>
          </ClientLoader>
        </SessionWrapper>

      </body>
    </html>
  );
}
