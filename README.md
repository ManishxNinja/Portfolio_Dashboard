# Portfolio Dashboard - Real-Time Stock Tracker

A modern, eye-friendly portfolio dashboard built with Next.js, React, TypeScript, and Tailwind CSS. Track your investment portfolio with real-time stock prices, sector analysis, and comprehensive gain/loss indicators.

## Features

### Core Functionality
- **Real-Time Portfolio Tracking**: Display holdings with live stock prices (CMP - Current Market Price)
- **Comprehensive Stock Information**: View purchase price, quantity, investment amount, and present value
- **Gain/Loss Calculation**: Automatic calculation of gains/losses with color-coded indicators
  - Green for gains, Red for losses
- **Sector Grouping**: Group stocks by sector with aggregated performance metrics
- **P/E Ratio & Earnings**: Display P/E ratios and latest earnings data
- **Portfolio Statistics**: Overall portfolio value, total investment, and total return percentage
- **Dynamic Updates**: Auto-refresh every 15 seconds for real-time data
- **Manual Refresh**: One-click refresh button for immediate data update

### User Interface
- Clean, professional design optimized for readability
- Eye-friendly color scheme with excellent contrast
- Responsive layout (mobile, tablet, desktop)
- Loading states with animated skeletons
- Error handling with user-friendly messages
- Last updated timestamp display

## Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Tables**: Built-in React table rendering

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Data**: Mock data (can be integrated with real APIs)

### Development
- **Package Manager**: npm
- **Build Tool**: Turbopack (Next.js 16 default)

## Project Structure

```
├── app/
│   ├── api/
│   │   └── portfolio/
│   │       └── route.ts          # Portfolio API endpoint
│   ├── layout.tsx                 # Root layout with metadata
│   ├── page.tsx                   # Main dashboard page
│   └── globals.css                # Global styles and design tokens
├── components/
│   ├── portfolio-stats.tsx         # Portfolio statistics cards
│   ├── portfolio-table.tsx         # Main holdings table
│   ├── sector-summary.tsx          # Sector grouping and summaries
│   ├── loading-skeleton.tsx        # Loading state components
│   └── ui/                         # shadcn/ui components
├── hooks/
│   └── use-portfolio-data.ts       # Custom hook for data fetching
├── lib/
│   ├── mock-data.ts               # Mock portfolio data
│   └── data-fetcher.ts            # Data fetching utilities
└── package.json
```

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Steps

1. **Clone or Download the Project**
   ```bash
   cd portfolio-dashboard
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   - Navigate to `http://localhost:3000`
   - Dashboard will load with mock portfolio data

## Usage

### Viewing Portfolio Data
- Dashboard automatically loads with mock portfolio data
- Displays 8 sample stocks across different sectors (Technology, Financials, Automotive, Infrastructure)

### Real-Time Updates
- **Auto-Refresh**: Enabled by default, updates every 15 seconds
- **Toggle Auto-Refresh**: Use the checkbox in the header to enable/disable
- **Manual Refresh**: Click the "Refresh" button for immediate update

### Understanding the Dashboard

#### Portfolio Statistics
Four key metrics displayed at the top:
- **Total Investment**: Sum of all purchases (Purchase Price × Quantity)
- **Present Portfolio Value**: Current value of all holdings (CMP × Quantity)
- **Gain/Loss**: Absolute rupee amount gained or lost
- **Total Return %**: Percentage return on investment

#### Holdings Table
Detailed view of each stock with columns:
- **Stock**: Symbol and company name
- **Purchase Price**: Initial buying price
- **Qty**: Number of units held
- **Investment**: Total amount invested (Purchase Price × Qty)
- **Portfolio %**: Proportion of total portfolio value
- **Exchange**: NSE or BSE listing
- **CMP**: Current Market Price
- **Present Value**: Current total value (CMP × Qty)
- **Gain/Loss**: Profit/loss amount and percentage
- **P/E Ratio**: Price-to-earnings ratio
- **Latest Earnings**: Latest earnings data

#### Sector Allocation
Summary cards for each sector showing:
- Sector name and overall gain/loss percentage
- Total investment amount
- Present portfolio value
- Total gain/loss amount

## API Integration

### Current Implementation
The dashboard uses **mock data** for demonstration purposes. The mock data includes:
- 8 sample stocks from various sectors
- Randomized current prices (±10% variation)
- Calculated P/E ratios and earnings

### Production Integration

To integrate with real data sources:

1. **Yahoo Finance API (for CMP)**
   - Fetch current market prices
   - Update `lib/mock-data.ts` with real API calls
   - Note: Yahoo Finance doesn't have an official public API; use unofficial libraries or scraping

2. **Google Finance API (for P/E Ratio & Earnings)**
   - Fetch financial metrics
   - Similar integration approach as Yahoo Finance

3. **Implementation Example**
   ```typescript
   // In app/api/portfolio/route.ts
   const cmpData = await fetchFromYahooFinance(symbol);
   const peRatioData = await fetchFromGoogleFinance(symbol);
   ```

### Rate Limiting & Caching
- Implement caching to reduce API calls
- Use throttling/batching for multiple requests
- Consider Redis or Next.js built-in caching

## Performance Optimization

### Current Optimizations
- Component memoization with React.memo
- Loading skeletons for smooth UX
- Efficient table rendering
- Minimal re-renders with proper state management

### Recommended Enhancements
- Implement SWR (stale-while-revalidate) for data fetching
- Add service workers for offline capability
- Optimize images and assets
- Implement code splitting for large components

## Error Handling

The dashboard includes comprehensive error handling:
- **API Failures**: User-friendly error messages
- **Network Issues**: Retry mechanism with error display
- **Invalid Data**: Data validation and sanitization
- **Loading States**: Clear feedback during data fetching

## Design System

### Color Scheme
- **Primary**: Blue (#4A90E2) - Main interactive elements
- **Success**: Green (#22C55E) - Gains and positive indicators
- **Danger**: Red (#EF4444) - Losses and negative indicators
- **Neutral**: Gray tones - Text and backgrounds
- **Background**: Off-white for eye comfort

### Typography
- **Headings**: Geist Sans (Bold)
- **Body**: Geist Sans (Regular)
- **Monospace**: Geist Mono (for numerical data)

## Security Considerations

### Current Implementation
- No sensitive data exposure
- Mock data only - no real credentials

### Production Recommendations
- Never expose API keys in client-side code
- Implement server-side data fetching
- Use environment variables for configuration
- Implement proper authentication/authorization
- Validate and sanitize all API responses

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Dashboard Not Loading
- Check if development server is running: `npm run dev`
- Clear browser cache and reload
- Check browser console for errors

### Data Not Updating
- Verify auto-refresh is enabled (checkbox in header)
- Click manual Refresh button
- Check browser network tab for API calls

### Styling Issues
- Clear Next.js cache: `rm -rf .next`
- Reinstall Tailwind CSS
- Restart development server

## Future Enhancements

- [ ] Export portfolio to PDF/Excel
- [ ] Portfolio comparison with indices (Nifty 50, Sensex)
- [ ] Advanced charting with Recharts
- [ ] Historical performance analytics
- [ ] Alerts for price thresholds
- [ ] Multi-currency support
- [ ] Dark mode toggle
- [ ] Portfolio allocation pie charts
- [ ] Watchlist feature
- [ ] Trade history and analytics

## Technical Challenges Addressed

### 1. API Limitations
- **Challenge**: Yahoo/Google Finance don't have official public APIs
- **Solution**: Implemented mock data with realistic variations for demo purposes

### 2. Rate Limiting
- **Challenge**: External APIs may have rate limits
- **Solution**: Built caching and throttling infrastructure; ready for production APIs

### 3. Real-Time Updates
- **Challenge**: Efficient client-side state updates
- **Solution**: Custom hook with configurable refresh intervals; built-in error handling

### 4. Data Accuracy
- **Challenge**: Ensuring data consistency across updates
- **Solution**: Proper error handling and retry mechanisms; timestamp tracking

### 5. Performance
- **Challenge**: Rendering large tables smoothly
- **Solution**: Efficient component design; loading skeletons for better UX

## Build & Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Deploy to Vercel
```bash
vercel deploy
```

### Environment Variables
Create `.env.local` for sensitive data:
```
NEXT_PUBLIC_API_URL=your_api_url
PORTFOLIO_API_KEY=your_api_key
```

## Support & Documentation

For questions or issues:
1. Check the troubleshooting section
2. Review component prop documentation
3. Consult Next.js and Tailwind CSS official docs
4. Check browser console for error details

## License

This project is provided as-is for demonstration and learning purposes.

## Credits

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)

---

**Created**: February 2026
**Last Updated**: February 2026
