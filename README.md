# Next.js Authentication App

A Next.js 14 application with authentication using local storage, protected routes, and role-based access control.

## Features

- User registration and login
- Admin dashboard
- Protected routes
- Role-based access control
- Responsive design with Tailwind CSS
- Local storage persistence

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd nextjs-auth-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Default Admin Credentials
- Username: admin
- Password: admin

## Project Structure

```
├── app/                  # Next.js app directory
├── components/           # Reusable React components
├── contexts/            # React context providers
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── middleware.js        # Next.js middleware for route protection
```

## Built With

- Next.js 14
- React
- Tailwind CSS
- Local Storage
```

Now you have a complete Next.js authentication application with:
- User registration and login
- Admin dashboard with user list
- Protected routes
- Role-based access control
- Local storage persistence
- Responsive design
- Loading states and error handling
- Clean project structure
- Code splitting and lazy loading
- Reusable components
- Clear documentation

To use this application:

1. Create a new Next.js project:
```bash
npx create-next-app@latest
```

2. Install required dependencies:
```bash
npm install @headlessui/react @heroicons/react
```

3. Copy all the files into their respective directories

4. Run the development server:
```bash
npm run dev
```

The application will be available at http://localhost:3000. You can login as admin using:
- Username: admin
- Password: admin

Or register a new user account to test the user dashboard.

Let me know if you need any clarification or have questions about specific parts of the implementation!