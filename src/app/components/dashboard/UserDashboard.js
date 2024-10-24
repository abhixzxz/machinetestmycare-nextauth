"use client";

import { useAuth } from "@/contexts/AuthContext";

export function UserDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen  py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl p-10">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-extrabold text-gray-800">
              Welcome to Your Dashboard
            </h1>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-xl shadow-lg">
            <p className="text-2xl font-medium text-blue-800">
              Hello, {user?.username}! Welcome to your personalized dashboard.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Here you can manage your profile, explore features, and check
              updates.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-indigo-900">
                Profile Settings
              </h3>
              <p className="text-gray-700 mt-2">
                Manage your personal information and preferences.
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-pink-900">
                Account Statistics
              </h3>
              <p className="text-gray-700 mt-2">
                View your activity and performance metrics.
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-yellow-900">
                Notifications
              </h3>
              <p className="text-gray-700 mt-2">
                Stay updated with the latest announcements.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-green-900">Support</h3>
              <p className="text-gray-700 mt-2">
                Need help? Reach out to our support team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
