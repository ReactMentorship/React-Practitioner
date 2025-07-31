import Providers from "@/app/providers";
import { Geist } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./global.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata = {
  title: "Discovering the World",
  description:
    "A blog about exploring and learning new things around the globe.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.className}>
      <body>
        <Providers>
          <Navbar />
          <main style={{ height: "calc(100vh - 80px)" }}>{children}</main>
          <ReactQueryDevtools initialIsOpen={false} />
        </Providers>
      </body>
    </html>
  );
}
