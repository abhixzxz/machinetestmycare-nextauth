export const prepareChartData = {
  getRoleData: (users) => {
    const roleData = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(roleData).map(([name, value]) => ({
      name,
      value,
    }));
  },

  getTimelineData: (users) => {
    const timelineData = users.reduce((acc, user) => {
      const date = user.registeredAt?.split("T")[0] || "N/A";
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(timelineData)
      .map(([date, count]) => ({
        date,
        users: count,
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  },

  getNewUsersCount: (users, days = 7) => {
    return users.filter(
      (u) =>
        new Date(u.registeredAt) >
        new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    ).length;
  },
};
