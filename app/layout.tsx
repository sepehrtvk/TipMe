import "./css/style.css";

import Header from "@/components/ui/header";

export const metadata = {
  title: "تیپ می",
  description: "پرداخت آنلاین انعام",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='fa' dir='rtl'>
      <body
        className={` font-inter antialiased bg-white text-gray-900 tracking-tight`}>
        <div className='flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip'>
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
