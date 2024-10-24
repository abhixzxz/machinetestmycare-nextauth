// validations/registerSchema.js
export const registerValidation = {
  firstName: {
    required: "First name is required",
    minLength: {
      value: 2,
      message: "First name must be at least 2 characters",
    },
    pattern: {
      value: /^[A-Za-z]+$/,
      message: "First name must contain only letters",
    },
  },
  lastName: {
    required: "Last name is required",
    minLength: {
      value: 2,
      message: "Last name must be at least 2 characters",
    },
    pattern: {
      value: /^[A-Za-z]+$/,
      message: "Last name must contain only letters",
    },
  },
  username: {
    required: "Username is required",
    minLength: {
      value: 4,
      message: "Username must be at least 4 characters",
    },
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: "Username can only contain letters, numbers and underscores",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
  },
  confirmPassword: {
    required: "Please confirm your password",
    validate: (value, formValues) =>
      value === formValues.password || "Passwords do not match",
  },
};
