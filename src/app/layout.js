import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import AuthProvider from "@/services/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Car Doctor Pro", // Default title
    template: "%s | Car Doctor", // Template for dynamic titles
  },
  description: "Car Doctor app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="mytheme">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
