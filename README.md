# Celigo APIM Showcase App

A demonstration application showcasing the API Management (APIM) capabilities of Celigo's integration platform. This application serves as a practical example of how to leverage Celigo's APIM features in a real-world scenario.

## Features

### Customer Management
- View a list of all customers with their details
- Add new customers with comprehensive information
- Edit existing customer records
- Delete customers when needed
- AI-powered customer insights with markdown support
  - Click the AI icon next to any customer ID to view detailed analysis
  - Insights include customer metrics, recommendations, and next steps

### Product Management
- Browse the complete product catalog
- Add new products to the inventory
- Update product information
- Remove products from the catalog

### Order Processing
- View and manage customer orders
- Track order status and history
- Process new orders efficiently

## Technical Features

- Built with Next.js and TypeScript
- Modern UI with dark mode support
- Responsive design for all screen sizes
- Real-time data updates
- Markdown rendering for AI insights
- RESTful API integration with Celigo's APIM

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Add your Celigo APIM API key to the environment variables
5. Run the development server:
   ```bash
   npm run dev
   ```

## API Integration

This application demonstrates integration with Celigo's APIM through:
- Secure API key authentication
- RESTful endpoint consumption
- Real-time data synchronization
- Error handling and retry mechanisms

## Contributing

Feel free to submit issues and enhancement requests!
