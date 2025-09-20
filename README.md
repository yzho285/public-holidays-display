# Canadian Public Holidays Display

A React application for discovering public holidays across Canada by province and date range.

## Features

- **Province Selection**: Choose from all Canadian provinces and territories
- **Date Range Picker**: Select custom start and end dates to view holidays across multiple years
- **Search & Filter**: Search holidays by name and filter by type (federal, provincial, statutory)
- **Responsive Design**: Clean, modern interface with 3-column holiday grid layout
- **Export Options**: Export holiday data to various formats
- **Multi-year Support**: View holidays across multiple years in a single query

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd public-holidays-display
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will open in your browser at `http://localhost:5173`.

### Available Scripts

- `npm run dev` - Runs the app in development mode with Vite
- `npm run build` - Builds the app for production (TypeScript compilation + Vite build)
- `npm run preview` - Preview the production build locally
- `npm test` - Runs tests (currently not configured)

## Usage

1. **Select Province**: Choose your province or territory from the dropdown
2. **Set Date Range**: Pick start and end dates using the date selectors
3. **Filter Results**: Use the filter dropdown to show specific types of holidays
4. **Search**: Type in the search box to find specific holidays by name
5. **View Results**: Browse holidays displayed in a responsive 3-column grid

## API

The application uses the [Canada Holidays API](https://canada-holidays.ca/api) to fetch up-to-date holiday information. If the API is unavailable, it falls back to static holiday data.

## Technologies Used

- **React** - Frontend framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible UI components
- **Axios** - HTTP client
- **date-fns** - Date manipulation
- **Lucide React** - Icons

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── HolidayList.tsx # Main holiday display
│   ├── HolidayCard.tsx # Individual holiday cards
│   ├── ProvinceSelector.tsx
│   ├── DateRangePicker.tsx
│   └── SearchFilter.tsx
├── services/           # API and data services
├── types/              # TypeScript type definitions
├── data/               # Static fallback data
└── App.tsx            # Main application component
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Canada Holidays API](https://canada-holidays.ca/) for providing holiday data
- [Shadcn/ui](https://ui.shadcn.com/) for the component library inspiration
