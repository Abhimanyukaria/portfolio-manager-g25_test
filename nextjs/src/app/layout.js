import { UserProvider } from '@auth0/nextjs-auth0/client';

import localFont from "next/font/local";
import "./globals.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata = {
  title: "Investalyze",
  description: "An App to manage portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" /> */}
       
      <UserProvider>
      {/* <style type="text/css"> */}
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      {/* </style> */}
      </UserProvider>
    </html>
  );
}
