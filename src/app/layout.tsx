import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ModalProvider } from "@store/ModalContext";
import ModalContainer from "@components/ModalContainer";




export const metadata: Metadata = {
  title: "VSTECS Randomizer",
  description: "VSTECS Randomizer",
};

export default function RootLayout({children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-poppins text-gray-700`}>
        <ModalProvider>
          <ModalContainer />
          <Toaster
            position="bottom-right"
            reverseOrder={false}
          />
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}
