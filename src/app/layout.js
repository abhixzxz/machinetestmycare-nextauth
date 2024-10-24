import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "./components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Auth App",
  description: "Next.js Authentication App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthProvider>
          <div className="min-h-screen bg-gray-100">
            <Header />
            <main>{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
