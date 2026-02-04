# Advocate Registration React Application

This is a React-based web application for advocate registration that collects user information and stores it in a JSON file.

## Features

- **Form Validation**: All fields are required with proper validation
- **Password Toggle**: Show/hide password functionality
- **Password Confirmation**: Validates that passwords match
- **File Upload**: Upload profile picture with base64 encoding
- **JSON Export**: Automatically downloads registration data as a JSON file
- **Responsive Design**: Works on desktop and mobile devices
- **Tamil Nadu Districts**: Dropdown with all 37 districts of Tamil Nadu

## Form Fields

The registration form collects the following information:

1. Username
2. Region (Tamil Nadu districts)
3. Email ID
4. Phone Number
5. Password (with toggle visibility)
6. Password Re-confirmation
7. Aadhar Number
8. Bar Council Number
9. Case Preferences
10. Description
11. Profile Picture (image upload)

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
advocate-registration/
├── public/
│   └── index.html
├── src/
│   ├── AdvocateRegistration.jsx    # Main component
│   ├── AdvocateRegistration.css    # Styling
│   ├── App.js                      # Root component
│   ├── index.js                    # Entry point
│   └── index.css                   # Global styles
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
  "phone": "1234567890",
  "password": "********",
  "confirmPassword": "********",
  "aadhar": "1234-5678-9012",
  "barCouncilNumber": "BC12345",
  "casePreferences": "Civil, Criminal",
  "description": "Experienced advocate",
  "profilePicture": {
    "name": "profile.jpg",
    "type": "image/jpeg",
    "size": 12345,
    "data": "data:image/jpeg;base64,..."
  }
}
```

## Customization

### Styling
- Modify `AdvocateRegistration.css` to change colors, fonts, and layout
- The app uses Google Fonts (Cinzel and Noto Serif)

### Form Fields
- Add or remove fields by modifying the `formData` state in `AdvocateRegistration.jsx`
- Update the form JSX to include new input elements

### Districts List
- Modify the `districts` array to add/remove regions

## Security Notes

⚠️ **Important**: This is a frontend-only implementation. For production use:

1. **Never store passwords in plain text** - Use proper backend authentication
2. **Implement server-side validation** - Don't rely only on client-side validation
3. **Secure file uploads** - Validate file types and sizes on the server
4. **Use HTTPS** - Encrypt data in transit
5. **Store sensitive data securely** - Use a proper database with encryption

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

## Future Enhancements

- [ ] Backend API integration
- [ ] Database storage
- [ ] Email verification
- [ ] Document upload for verification
- [ ] Multi-step form wizard
- [ ] Dashboard for registered advocates

## License

This project is open source and available for educational purposes.

## Support

For issues or questions, please contact the development team.
