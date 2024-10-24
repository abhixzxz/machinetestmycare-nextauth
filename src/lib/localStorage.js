export const storage = {
  USERS_KEY: "registered_users",
  CURRENT_USER_KEY: "current_user",

  initializeStorage: () => {
    if (typeof window === "undefined") return;
    // Initialize admin user if not exists
    const users = storage.getUsers();
    if (!users.some((user) => user.username === "admin")) {
      const adminUser = {
        username: "admin",
        password: "admin",
        firstName: "Admin",
        lastName: "User",
        role: "admin",
        createdAt: new Date().toISOString(),
      };
      storage.saveInitialUser(adminUser);
    }
  },

  getUsers: () => {
    if (typeof window === "undefined") {
      console.log("[Storage] Running on server, returning empty array");
      return [];
    }
    const users = localStorage.getItem(storage.USERS_KEY);
    const parsedUsers = users ? JSON.parse(users) : [];
    console.log("[Storage] Current users:", parsedUsers);
    return parsedUsers;
  },

  getCurrentUser: () => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem(storage.CURRENT_USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  saveInitialUser: (user) => {
    const users = storage.getUsers();
    users.push(user);
    localStorage.setItem(storage.USERS_KEY, JSON.stringify(users));
  },

  saveUser: (user) => {
    console.log("[Storage] Attempting to save user:", user);
    const users = storage.getUsers();
    if (users.find((u) => u.username === user.username)) {
      console.error("[Storage] Username already exists");
      throw new Error("Username already exists");
    }

    const newUser = {
      ...user,
      role: "user",
      createdAt: new Date().toISOString(),
      active: true,
    };

    users.push(newUser);
    localStorage.setItem(storage.USERS_KEY, JSON.stringify(users));
    console.log("[Storage] User saved successfully");
    return newUser;
  },

  validateUser: (username, password) => {
    console.log("[Storage] Validating user:", username);
    // Special case for admin
    if (username === "admin" && password === "admin") {
      console.log("[Storage] Admin login successful");
      return {
        username,
        firstName: "Admin",
        lastName: "User",
        role: "admin",
      };
    }

    const users = storage.getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    console.log("[Storage] Validation result:", user);
    return user;
  },

  deactivateUser: (username) => {
    const users = storage.getUsers();
    const updatedUsers = users.map((user) =>
      user.username === username ? { ...user, active: false } : user
    );
    localStorage.setItem(storage.USERS_KEY, JSON.stringify(updatedUsers));
  },

  clearSession: () => {
    if (typeof window === "undefined") return;
    const currentUser = storage.getCurrentUser();
    if (currentUser && currentUser.role !== "admin") {
      storage.deactivateUser(currentUser.username);
    }
    localStorage.removeItem(storage.CURRENT_USER_KEY);
  },
};
