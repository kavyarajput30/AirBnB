# Project Title: Express.js Listing and Review Management Application

## Overview:

This web application project is built using Express.js, MongoDB, and related technologies to manage listings and reviews. It provides users with a platform to browse, add, edit, and delete listings, as well as leave reviews for specific listings. Additionally, it includes user authentication features for user registration, login, and logout. The project follows the Model-View-Controller (MVC) architecture for organizing code and handling different aspects of functionality.

## Key Features:

### Listing Management:

- ◉ **View Listings**: Users can view all available listings and see detailed information about each listing.
- ◉ **Create Listings**: Users can create new listings by filling out a form, including uploading images.
- ◉ **Edit Listings**: Editing and updating existing listings is supported, including modifying details and images.
- ◉ **Delete Listings**: Listings can be deleted from the system when no longer needed.
- ◉ **Search functionality**: Users can serch by country name, keyword, type etc.
- ◉ **Filter Listings**: Filter listings based on filters giving.

### Review System:

- ◉ **Leave Reviews**: Users can leave reviews for specific listings, contributing their feedback and experiences.
- ◉ **Review Association**: Reviews are associated with their respective listings, providing valuable insights for other users.

### User Authentication:

- ◉ **User Registration**: User registration is available, allowing new users to sign up with unique email addresses and usernames.
- ◉ **User Login**: Registered users can securely log in to access the full functionality of the application.
- ◉ **User Logout**: A logout feature is provided to securely end the user session.

## Technology Stack:

- **Express.js**: Used as the web application framework for handling HTTP requests, routing, and middleware.
- **MongoDB**: Serves as the database management system, storing data related to listings, reviews, and user accounts.
- **Mongoose**: Acts as an Object Data Modeling (ODM) library for MongoDB, providing a schema-based solution for modeling application data.
- **Cloudinary and Multer**: Integrated for handling image uploads, allowing users to include images when creating or updating listings.
- **EJS (Embedded JavaScript)**: Utilized as the templating engine for generating dynamic HTML content to be rendered to users.
- **Passport and Passport-Local**: Employed for user authentication and session management, enabling secure login and logout functionality.

## Usage:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables for MongoDB connection, Cloudinary configuration, and session secret.
4. Run the application using `npm start`.
5. Access the application through a web browser.

## Contributions:

Contributions to the project are welcome. If you have any suggestions, enhancements, or bug fixes, please feel free to open an issue or submit a pull request.

## License:

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements:

Special thanks to the creators and maintainers of Express.js, MongoDB, and all related technologies used in this project. Their efforts make projects like this possible.
