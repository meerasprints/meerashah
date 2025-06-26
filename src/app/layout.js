import './globals.css'; // make sure this exists
import Navbar from './Navbar';

export const metadata = {
  title: "Meera's Prints",
  description: 'Student-led ethical fashion brand',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans bg-white text-black">
        <Navbar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
