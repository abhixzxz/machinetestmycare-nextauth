export const loginValidation = {
  username: {
    required: "Username is required",
    minLength: {
      value: 3,
      message: "Username must be at least 3 characters longg",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 5,
      message: "Password must be at least 5 characters long",
    },
  },
};
