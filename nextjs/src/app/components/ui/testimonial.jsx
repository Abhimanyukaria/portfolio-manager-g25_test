export default function Testimonials() {
    const testimonials = [
      {
        content: "Investalyze transformed how I manage my portfolio. The real-time insights are invaluable.",
        author: "Sarah Chen",
        role: "Individual Investor",
        photo: "/p1.png"
      },
      {
        content: "The best investment tool I've used. Clean interface and powerful analytics.",
        author: "Michael Rodriguez",
        role: "Financial Advisor",
        photo: "/p2.png"
      },
      {
        content: "Outstanding portfolio management platform. Worth every penny.",
        author: "David Kim",
        role: "Day Trader",
        photo: "/p3.png"
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
                  <figure>
                    <blockquote className="text-lg font-semibold leading-8 text-gray-900">
                      <svg
                        className="w-8 h-8 text-indigo-600 mb-4"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 12h2v7H7v-5H4V9h5zM20 9h-5v2h3v5h-2v2h4z" />
                      </svg>
                      {testimonial.content}
                    </blockquote>
                    <figcaption className="mt-6 border-t border-gray-100 pt-6">
                      <div className="flex items-center">
                        <img
                          src={testimonial.photo}
                          alt={testimonial.author}
                          className="h-12 w-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <div className="text-base font-semibold text-gray-900">{testimonial.author}</div>
                          <div className="mt-1 text-sm text-gray-600">{testimonial.role}</div>
                        </div>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
