export default function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 Meera’s Prints. All rights reserved.</p>
      <p>Contact us at: <a href="mailto:meeraprints@email.com">meeraprints@email.com</a></p>

      <style jsx>{`
        .footer {
          text-align: center;
          padding: 2rem;
          background-color: #f0f0f0;
          font-size: 0.9rem;
        }
      `}</style>
    </footer>
  );
}
