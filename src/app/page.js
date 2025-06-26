export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-pink-50 to-rose-100 text-center flex flex-col justify-center items-center px-4 relative overflow-hidden">
      <div className="absolute top-10 right-10 text-3xl animate-bounce">✨</div>
      <h1 className="text-5xl font-extrabold text-gray-900 drop-shadow-md mb-4">
        Welcome to <span className="text-rose-500">Meera's Prints</span>
      </h1>
      <p className="text-xl text-gray-600 max-w-xl mb-8">
        Sustainable tees. Student-led mission. Fashion with a purpose.
      </p>
      <button className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition duration-300 shadow-md">
        Shop Now
      </button>
      <div className="mt-10">
        <img src="/tshirt-mockup.png" alt="T-shirt Preview" className="w-64 rounded-lg shadow-xl" />
      </div>
    </div>
  );
}
