import React from "react";

export default function ContactPage() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();
      alert(data.message || "Message sent successfully!");
      e.target.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Get in Touch</h1>
        <p className="text-gray-600 mt-2">
          We're here to help you with any queries or support needs.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Message Form */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                name="name"
                type="text"
                required
                placeholder="Enter your name"
                className="w-full mt-1 px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea
                name="message"
                rows="4"
                required
                placeholder="Tell us how we can help you..."
                className="w-full mt-1 px-4 py-2 border rounded-lg"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <span>✈️</span> Send Message
            </button>
          </form>
        </div>

        {/* Right: Contact Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>

            <div className="flex items-start gap-4 mb-4">
              <span className="text-green-600 text-xl">📍</span>
              <div>
                <p className="font-semibold">Address</p>
                <p>Balaji Tower 5, Near Viva City Mall, Mahal Road, Jagatpura, Jaipur</p>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-4">
              <span className="text-blue-600 text-xl">📞</span>
              <div>
                <p className="font-semibold">Contact Number</p>
                <p>9983070809</p>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-4">
              <span className="text-purple-600 text-xl">📧</span>
              <div>
                <p className="font-semibold">Email Address</p>
                <p>info@wilderbeast.in</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-green-600 text-xl">💬</span>
              <div>
                <p className="font-semibold">Social Media</p>
                <p>@wilderbeastliveayourdreams</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 text-center text-gray-500 p-6 rounded-xl">
            <span className="text-2xl block mb-2">🗺️</span>
            <p className="font-semibold">Office Location Map</p>
            <p>Mabell Rd, SECTOR S, Near OYO Townhouse 2G9</p>
            <p>Singhi Girls Hostel, Akkay Paira, Dobaliah</p>
          </div>
        </div>
      </div>
    </div>
  );
}
