"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Bell, Settings, BarChart2, MessageCircle } from "lucide-react";

// Custom Card Component
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>{children}</div>
);

export function UserDashboard() {
  const { user } = useAuth();
  const [hoveredCard, setHoveredCard] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const headerVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const welcomeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const dashboardItems = [
    {
      title: "Profile Settings",
      description: "Manage your personal information and preferences.",
      icon: Settings,
      color: "bg-blue-500",
    },
    {
      title: "Account Statistics",
      description: "View your activity and performance metrics.",
      icon: BarChart2,
      color: "bg-green-500",
    },
    {
      title: "Notifications",
      description: "Stay updated with the latest announcements.",
      icon: Bell,
      color: "bg-purple-500",
    },
    {
      title: "Support",
      description: "Need help? Reach out to our support team.",
      icon: MessageCircle,
      color: "bg-orange-500",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 p-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div variants={headerVariants} className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome to Your Dashboard
          </h1>
        </motion.div>

        <motion.div variants={welcomeVariants} className="mb-12">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">
                Hello, {user?.username}!
              </h2>
              <p className="text-lg opacity-90">
                Welcome to your personalized dashboard. Here you can manage your
                profile, explore features, and check updates.
              </p>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dashboardItems.map((item, index) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${item.color} text-white`}>
                      <item.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{
                      width: hoveredCard === index ? "100%" : "0%",
                    }}
                    className={`h-0.5 mt-4 ${item.color.replace(
                      "bg-",
                      "bg-opacity-50 bg-"
                    )}`}
                  />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
