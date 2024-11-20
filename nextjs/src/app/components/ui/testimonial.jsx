export default function Testimonials() {
    const testimonials = [
      {
        content: "Investalyze transformed how I manage my portfolio. The real-time insights are invaluable.",
        author: "Sarah Chen",
        role: "Individual Investor",
        photo: "https://via.placeholder.com/50"
      },
      {
        content: "The best investment tool I've used. Clean interface and powerful analytics.",
        author: "Michael Rodriguez",
        role: "Financial Advisor",
        photo: "https://via.placeholder.com/50"
      },
      {
        content: "Outstanding portfolio management platform. Worth every penny.",
        author: "David Kim",
        role: "Day Trader",
        photo: "https://via.placeholder.com/50"
      }
    ];
  
    return (
        <div id="testimonials" className="bg-gray-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">Testimonials</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Trusted by investors worldwide
              </p>
            </div>
            <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-between bg-white p-8 shadow-lg rounded-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
                  >
      