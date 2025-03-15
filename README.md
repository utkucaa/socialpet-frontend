# SocialPet Frontend

SocialPet is a community platform for pet owners, allowing them to create lost pet listings, adopt new pets, track pet health, and more.

## Features

- Modern, responsive design
- Lost pet listings
- Pet adoption
- AI-powered breed detection
- Community Q&A
- Donation system
- Health tracking for pets
- Vet and pet shop locator

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/socialpet-frontend.git
cd socialpet-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up images for the homepage:
   - Create an `images` folder in the `public` directory if it doesn't exist
   - Add the following images to the `public/images` folder:
     - `hero-pets.jpg` - A high-quality image of pets for the hero section
     - `sample-lost-pet-1.jpg` and `sample-lost-pet-2.jpg` - Sample images for lost pets
     - `sample-adoption-1.jpg` and `sample-adoption-2.jpg` - Sample images for adoption
     - `breed-detector.jpg` - Image for the breed detector feature
     - `community.jpg` - Image for the community section
     - `donation.jpg` - Image for the donation section

4. Start the development server:
```bash
npm start
# or
yarn start
```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Project Structure

- `src/components/` - React components
  - `Intro/` - Homepage components
  - `Lost/` - Lost pet listing components
  - `Adoption/` - Pet adoption components
  - `CinsDedektifi/` - Breed detector components
  - `HelpAndInfo/` - Community Q&A components
  - `Donate/` - Donation components
  - `MedicalRecord/` - Health tracking components
  - `VetPetShop/` - Vet and pet shop locator components
  - `Navbar/` - Navigation components
  - `Profile/` - User profile components
  - `Register/` - Registration components
  - `Login/` - Login components
- `src/services/` - API services
- `src/lib/` - Utility functions
- `public/` - Static assets

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- React Router
- Axios
- Chart.js
- Leaflet (for maps)
- Ant Design

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Ant Design](https://ant.design/)
- [React Router](https://reactrouter.com/)
- [Chart.js](https://www.chartjs.org/)
- [Leaflet](https://leafletjs.com/)
