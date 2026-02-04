# User Registration React Application

This is a React-based web application for user registration that collects user information and stores it in a JSON file.

## Features

- **Form Validation**: All fields are required with proper validation
- **Password Toggle**: Show/hide password functionality with eye icon
- **Password Confirmation**: Validates that passwords match before submission
- **File Upload**: Upload profile picture with base64 encoding
- **JSON Export**: Automatically downloads registration data as a JSON file
- **Responsive Design**: Works on desktop and mobile devices
- **Regional Selection**: Dropdown with major cities/regions

## Form Fields

The registration form collects the following information:

1. Username
2. Region (Ariyalur, Chennai, Coimbatore, Madurai, Salem, Trichy)
3. Email ID
4. Phone Number
5. Password (with toggle visibility)
6. Password Re-confirmation
7. Aadhar Number
8. Cost Preferences (in Rs.)
9. Profile Picture (image upload)

## How It Works

1. User fills out the registration form
2. On form submission:
   - Validates that passwords match
   - Creates a JSON object with all form data
   - Adds a timestamp to the data
   - Converts profile picture to base64 format
   - Downloads the data as a JSON file
   - Logs the data to the browser console

## Installation and Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Steps to Run

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm start
   ```

3. **Open in Browser**
   - The app will automatically open at `http://localhost:3000`
   - If not, manually navigate to this URL

## Project Structure

```
user-registration/
├── public/
│   └── index.html
├── src/
│   ├── UserRegistration.jsx    # Main component
│   ├── UserRegistration.css    # Styling
│   ├── App.js                  # Root component
│   ├── index.js                # Entry point
│   └── index.css               # Global styles
├── package.json
└── README.md
```

## JSON Output Format

When you submit the form, a JSON file is downloaded with the following structure:

```json
{
  "timestamp": "2026-02-03T10:30:00.000Z",
  "username": "John Doe",
  "region": "Chennai",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "********",
  "confirmPassword": "********",
  "aadhar": "1234-5678-9012",
  "costPreferences": "5000",
  "profilePicture": {
    "name": "profile.jpg",
    "type": "image/jpeg",
    "size": 12345,
    "data": "data:image/jpeg;base64,..."
  }
}
```

## Usage in Your App

### Option 1: Use as standalone component
```jsx
import UserRegistration from './UserRegistration';

function App() {
  return <UserRegistration />;
}
```

### Option 2: Integrate with routing
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserRegistration from './UserRegistration';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<UserRegistration />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## Customization

### Styling
- Modify `UserRegistration.css` to change colors, fonts, and layout
- The app uses Google Fonts (Cinzel and Noto Serif)
- Gradient backgrounds are easily customizable

### Form Fields
- Add or remove fields by modifying the `formData` state in `UserRegistration.jsx`
- Update the form JSX to include new input elements

### Regions List
- Modify the `regions` array to add/remove cities

### Cost Preferences
- Currently set as a number input
- Can be modified to include currency formatting or min/max values

## Security Notes

⚠️ **Important**: This is a frontend-only implementation. For production use:

1. **Never store passwords in plain text** - Use proper backend authentication with hashing
2. **Implement server-side validation** - Don't rely only on client-side validation
3. **Secure file uploads** - Validate file types and sizes on the server
4. **Use HTTPS** - Encrypt data in transit
5. **Store sensitive data securely** - Use a proper database with encryption
6. **Implement CSRF protection** - Prevent cross-site request forgery
7. **Add rate limiting** - Prevent abuse and spam registrations

## Technologies Used

- React 18.2.0
- Font Awesome 7.0.1
- Google Fonts (Cinzel, Noto Serif)
- HTML5 File API for image uploads
- Blob API for JSON file download

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Features Explained

### Password Toggle
Click the eye icon to show/hide password characters. The icon changes from eye to eye-slash when toggled.

### File Upload
- Accepts image files only (jpg, jpeg, png, gif, webp)
- Converts to base64 for easy storage
- Stores file metadata (name, type, size)

### Form Validation
- HTML5 validation for required fields
- Email format validation
- Phone number validation
- Password match validation
- Custom error messages

## Future Enhancements

- [ ] Backend API integration
- [ ] Database storage (MongoDB, PostgreSQL)
- [ ] Email verification
- [ ] OTP verification for phone numbers
- [ ] Password strength indicator
- [ ] Terms and conditions checkbox
- [ ] Multi-language support
- [ ] Social media login integration
- [ ] User dashboard after registration

## Troubleshooting

### Import Error
If you see "Failed to resolve import", make sure the file is in the correct location:
- Place `UserRegistration.jsx` in the `src` folder
- Update import path in `App.js` to `./UserRegistration`

### Styling Issues
- Ensure `UserRegistration.css` is in the same folder as `UserRegistration.jsx`
- Check that Font Awesome CDN is loaded in `public/index.html`

### File Upload Not Working
- Check browser console for errors
- Ensure file size is reasonable (<5MB recommended)
- Verify file type is an image

## License

This project is open source and available for educational purposes.

## Support

For issues or questions, please contact the development team or check the console for error messages.
