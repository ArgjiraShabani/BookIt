# BookIt

BookIt is a web-based library management application built with Next.js, TypeScript, MongoDB, NextAuth

The application allows users to browse books, view book details, rent books, manage their rentals, and update their profile. Administrators have access to an admin dashboard where they can manage books, users, and rentals.

## Features

### User Features

- User registration and login
- Authentication with NextAuth
- Browse available books
- View detailed information about books
- Rent books
- View personal rentals
- Return rented books
- Manage user profile
- Contact form

### Admin Features

- Admin dashboard
- Role-based access control
- Create books
- Edit books
- Delete books
- View registered users
- Manage rentals

## Technologies Used

- Next.js
- React
- TypeScript
- MongoDB
- Mongoose
- NextAuth
- Tailwind CSS
- React Hook Form

## Project Structure

The application follows a separated architecture using models, controllers, API routes, pages, and reusable components.

```text
book-it/
├── components/
├── controllers/
├── lib/
├── models/
├── pages/
│   ├── api/
│   ├── admin/
│   └── ...
├── public/
└── styles/
```

- **Models** define the MongoDB data structures.
- **Controllers** contain the application's business logic.
- **API routes** handle HTTP requests and authorization.
- **Pages** provide the user interface.
- **Components** contain reusable UI elements.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/ArgjiraShabani/BookIt
```

### 2. Navigate to the project

```bash
cd BookIt/book-it
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file inside the project directory.

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

Do not commit `.env.local` to GitHub.

### 5. Start the development server

```bash
npm run dev
```

Open the application at `http://localhost:3000`.

## Authentication and Authorization

BookIt uses NextAuth for authentication.

The application supports two roles:

- `user` – can browse and rent books and manage their own account.
- `admin` – can access the administration panel and manage application data.

Protected API routes verify the authenticated user's session and role before allowing administrative operations.

## Data Models

The application uses MongoDB with Mongoose.

Main models include:

- **User** – stores user account information and roles.
- **Book** – stores book information and copy availability.
- **Rental** – connects users with rented books and stores rental information.
- **Contact** – stores messages submitted through the contact form.





## Live Application

The deployed application will be available at:

**Vercel:** To be added after deployment.

## Team Members

Argjira Shabani



