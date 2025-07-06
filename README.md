Sustainly Task

This repository contains a simple SaaS application built on the Next.js SaaS Starter template, meticulously styled to adhere to the Sustainly Visual Guidelines. The application provides core functionalities for user authentication, personalized user settings (including theme switching), and a branded landing page showcasing Sustainly's solutions.

Features

User Authentication: Secure sign-in and sign-up flows.

Dynamic Theme Switching: Users can switch between light, dark, and system-preferred themes, with all UI elements adapting to Sustainly's defined color palettes for each mode.

Branded Landing Page: A custom landing page designed according to Sustainly's visual identity, featuring:

A prominent hero section with brand-consistent headlines and calls to action.

A detailed "Our Solutions" section, presenting "ESG report," "Sustainability strategy," and "Carbon footprint" services with rich descriptions, pricing, and alternating image layouts.

"Learn More" buttons for each solution.

Responsive Design: The application's layout and components are designed to be fully responsive, ensuring optimal viewing and usability across various devices (mobile, tablet, desktop).

Sustainly Branding Integration:

Colors: Full implementation of Sustainly's primary and secondary color palettes (Dark Blue, Dark Green, White, Purple, Light Green, Black) across all UI elements.

Typography: Consistent use of Gilroy for headlines and Inter for body text as specified in the design manual.

Logo & Symbol: Integration of the Sustainly logo in the global header and the Sustainly symbol on the authentication pages.

Photography Styling: Application of specific filters (temperature, saturation) to images to match the brand's photography guidelines.

Button Styling: Custom button styles (primary, outline, secondary) adhering to Sustainly's aesthetic.

Global Top Bar: A consistent top navigation bar with the Sustainly logo (linking to the homepage) and conditional "Sign In" / "Sign Out" functionality.

Cleaned Dashboard Layout: The default sidebar menu from the SaaS starter has been removed for a cleaner, full-width content experience on the main dashboard/landing page.

Screenshots

Homepage/Landing Page

![Sustainly Homepage](docs/screenshots/homepage-1.png)

![Sustainly Homepage](docs/screenshots/homepage-2.png)

![Sustainly Homepage](docs/screenshots/homepage-3.png)

Authentication Page

![Sustainly Login/Signin Page](docs/screenshots/sign-in.png)

![Sustainly Login/Signup Page](docs/screenshots/sign-up.png)


User Dashboard

![Sustainly Dark Theme](docs/screenshots/user-dashboard.png)


Setup & Installation

Follow these steps to get the Sustainly application running on your local machine.

Prerequisites

Node.js (LTS version recommended)

pnpm (or npm/yarn)

Installation Steps

Clone the repository:

git clone [YOUR_REPOSITORY_URL]
cd sustainly-task


Install dependencies:

pnpm install


Configure Environment Variables:
Create a .env.local file in the root of your project and add necessary environment variables, especially for database connection and authentication if required by the saas-starter template.
(Example - adapt as per your saas-starter needs):

DATABASE_URL="postgresql://user:password@host:port/database"
AUTH_SECRET="YOUR_AUTH_SECRET"
NEXTAUTH_URL="http://localhost:3000"


Database Setup (if applicable to the starter):
If the saas-starter uses Drizzle ORM and a database, you might need to run migrations:

pnpm drizzle-kit push:pg


Run the development server:

pnpm dev


Access the application:
Open your browser and navigate to http://localhost:3000/ 

Technologies Used

Next.js: React framework for production.

React: Frontend library for building user interfaces.

Tailwind CSS: Utility-first CSS framework for rapid styling.

Lucide React: Icon library.

Next/Image: Next.js Image Optimization.

SWR: React Hooks for data fetching.

NextAuth.js : For authentication.

Drizzle ORM : For database interaction.

PostgreSQL : Database.
