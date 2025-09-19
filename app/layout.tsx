import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "MyApp",
  description: "Demo Next.js App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}

