'use client';

export default function Home() {
  return (
    <section className="hero">
      <h1>Welcome to Meera’s Prints</h1>
      <p>Sustainable tees. Student-led mission. Fashion with a purpose.</p>
      <a href="/shop" className="cta">Shop Now</a>

      <style jsx>{`
        .hero {
          text-align: center;
          padding: 4rem 2rem;
          background: linear-gradient(to right, #e8f5e9, #f1f8e9);
          min-height: 90vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        h1 {
          font-size: 3rem;
          color: #1b4332;
        }

        p {
          margin-top: 1rem;
          font-size: 1.25rem;
          color: #4c4c4c;
        }

        .cta {
          margin-top: 2rem;
          background: #1b4332;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          font-weight: bold;
        }

        .cta:hover {
          background: #2d6a4f;
        }
      `}</style>
    </section>
  );
}
