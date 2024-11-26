// import { Sidebar } from "lucide-react";
import React from "react";
import Sidebar from "./Sidebar"
const Profile = () => {
  return (
    // <div className="flex bg-blue-100 min-h-screen">
    //   {/* Sidebar */}
    //   <div className="w-64 bg-gray-800 text-white flex flex-col">
    //     <div className="p-4">
    //       <h2 className="text-xl font-bold mb-6">App Name</h2>
    //       <nav className="space-y-2">
    //         <a
    //           href="/profile"
    //           className="block p-2 rounded bg-gray-700 transition"
    //         >
    //           Profile
    //         </a>
    //         <a
    //           href="/dashboard"
    //           className="block p-2 rounded hover:bg-gray-700 transition"
    //         >
    //           Dashboard
    //         </a>
    //         <a
    //           href="/"
    //           className="block p-2 rounded hover:bg-gray-700 transition"
    //         >
    //           Logout
    //         </a>
    //       </nav>
    //     </div>
    //   </div>

    // {/* Profile Content */}
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="container mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-wrap lg:flex-nowrap">
            {/* Left Section - User Information */}
            <div className="w-full lg:w-2/3 p-4">
              <h1 className="text-2xl font-semibold text-gray-700 mb-4">
                My Account
              </h1>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-gray-600 mb-3">
                  User Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-600 text-sm font-medium">
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="lucky.jesse"
                      className="w-full p-2 border rounded-lg mt-1 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 text-sm font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="jesse@example.com"
                      className="w-full p-2 border rounded-lg mt-1 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 text-sm font-medium">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="LuckyExample"
                      className="w-full p-2 border rounded-lg mt-1 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 text-sm font-medium">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Jesse"
                      className="w-full p-2 border rounded-lg mt-1 text-gray-700"
                    />
                  </div>
                </div>
                <hr className="my-4" />
                <h2 className="text-lg font-semibold text-gray-600 mb-3">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-600 text-sm font-medium">
                      Address
                    </label>
                    <input
                      type="text"
                      placeholder="Address"
                      className="w-full p-2 border rounded-lg mt-1 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 text-sm font-medium">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="City"
                      className="w-full p-2 border rounded-lg mt-1 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 text-sm font-medium">
                      Country
                    </label>
                    <input
                      type="text"
                      placeholder="Country"
                      className="w-full p-2 border rounded-lg mt-1 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 text-sm font-medium">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      placeholder="Postal Code"
                      className="w-full p-2 border rounded-lg mt-1 text-gray-700"
                    />
                  </div>
                </div>
                <hr className="my-4" />
                <h2 className="text-lg font-semibold text-gray-600 mb-3">
                  About Me
                </h2>
                <textarea
                  rows="4"
                  placeholder="A beautiful UI Kit and Admin for React & Tailwind CSS..."
                  className="w-full p-2 border rounded-lg mt-1 text-gray-700"
                ></textarea>
              </div>
            </div>

            {/* Right Section - Profile Card */}
            <div className="w-full lg:w-1/3 p-4">
              <div className="bg-white rounded-lg shadow-lg text-center p-6">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-blue-500 mb-4">
                  <img
                    src="https://www.gravatar.com/avatar/?d=mp&s=150"
                    alt="Profile Placeholder"
                    className="w-full h-full object-cover"

                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-700">
                  Jenna Stones
                </h3>
                <p className="text-sm text-gray-500">
                  Los Angeles, California
                </p>
                <hr className="my-4" />
                <div className="flex justify-around">
                  <div>
                    <span className="block text-2xl font-bold text-gray-700">
                      22
                    </span>
                    <span className="text-sm text-gray-500">Friends</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-gray-700">
                      10
                    </span>
                    <span className="text-sm text-gray-500">Photos</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-gray-700">
                      89
                    </span>
                    <span className="text-sm text-gray-500">Comments</span>
                  </div>
                </div>
                <hr className="my-4" />
                <p className="text-gray-600 text-sm">
                  An artist of considerable range, Jenna the name taken by
                  Melbourne-raised Nick Murphy writes, performs and records
                  all of his own music.
                </p>
                <button className="mt-4 text-blue-500 font-medium">
                  Show more
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div >
  );
};

export default Profile;
