import "./globals.css";
import { ThemeProvider } from "../components/ui/theme-provider";
import Headers from "../components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "NextStep AI",
  description: "NextStep AI",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider>
        <body className={`${inter.className} antialiased`}>
         <Headers />
          <main className="min-h-screen">
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </main>
          <Toaster richColors />
          <footer className="border-t">
            <div className="container mx-auto flex items-center justify-center py-4">
              <p>Made With ❤️ by Shivam</p>
            </div>
          </footer>
        </body>
      </ClerkProvider>
    </html>
  );
}
