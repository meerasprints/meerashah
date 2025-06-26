export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', backgroundColor: '#f5f5f5' }}>
          <a href="/">Home</a>
          <a href="/fast-fashion">Fast Fashion</a>
          <a href="/shop">Shop</a>
          <a href="/about">About</a>
          <a href="/search">Search</a>
        </nav>
        <main style={{ padding: '2rem' }}>{children}</main>
      </body>
    </html>
  );
}
