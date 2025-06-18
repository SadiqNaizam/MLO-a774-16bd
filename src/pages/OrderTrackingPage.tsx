import React from 'react';
import { Link } from 'react-router-dom';

// Custom Component Import
import OrderTrackerMap from '@/components/OrderTrackerMap';

// Shadcn/ui Imports
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

// Lucide React Icons (for placeholder AppHeader)
import { UserCircle, ShoppingBag, HelpCircle } from 'lucide-react';

// Placeholder for AppHeader component
const AppHeader = () => {
  // This is a basic placeholder. In a real app, this would be a shared component.
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
              <ShoppingBag className="h-7 w-7 mr-2" />
              FoodDash
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/order-tracking"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              My Orders
            </Link>
            <Link
              to="/restaurant-listing" // Assuming a general restaurant listing page from App.tsx
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              Restaurants
            </Link>
            <Button variant="ghost" size="icon" aria-label="User Account">
              <UserCircle className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Placeholder for AppFooter component
const AppFooter = () => {
  // This is a basic placeholder. In a real app, this would be a shared component.
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2 text-primary" /> FoodDash
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your favorite food, delivered fast.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/restaurant-listing" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Browse Restaurants</Link></li>
              <li><Link to="/order-tracking" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Track My Order</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-3">Support</h4>
            <ul className="space-y-2">
               <li><Link to="/help" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center">
                <HelpCircle className="h-4 w-4 mr-1.5" /> FAQs & Support
              </Link></li>
              {/* Placeholder for other support links */}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} FoodDash Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};


// Mock data for the OrderTrackingPage
const mockOrder = {
  id: 'ORD12345FOOD',
  status: 'Out for Delivery',
  estimatedDeliveryTime: '1:45 PM (approx. 25 minutes remaining)',
  progressValue: 75, // Percentage: 0-100
  restaurant: {
    name: 'The Pizza Place',
    address: '123 Pepperoni Ave, Flavor Town, CA 90210',
    lat: 34.0522,
    lng: -118.2437,
  },
  customer: {
    name: 'Your Location',
    address: '456 Home St, Suburbia, CA 90211',
    lat: 34.0522,
    lng: -118.2537,
  },
  rider: {
    name: 'Alex P.',
    vehicle: 'Bike',
    lat: 34.0522,
    lng: -118.2487,
  },
};

const OrderTrackingPage = () => {
  console.log('OrderTrackingPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <AppHeader />

      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Card className="w-full max-w-3xl mx-auto shadow-lg dark:bg-gray-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              Track Your Order: <span className="text-primary">{mockOrder.id}</span>
            </CardTitle>
            <CardDescription className="text-sm sm:text-md text-gray-600 dark:text-gray-400">
              Estimated Delivery: {mockOrder.estimatedDeliveryTime}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <section aria-labelledby="order-status-heading">
              <div className="mb-3">
                <h2 id="order-status-heading" className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  Current Status: <span className="text-primary">{mockOrder.status}</span>
                </h2>
              </div>
              <Progress value={mockOrder.progressValue} aria-label={`Order progress: ${mockOrder.status}`} className="w-full h-3" />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                <span>Order Confirmed</span>
                <span>Preparing</span>
                <span className={mockOrder.status === 'Out for Delivery' ? 'font-bold text-primary' : ''}>Out for Delivery</span>
                <span>Delivered</span>
              </div>
            </section>

            <section aria-labelledby="delivery-map-heading">
              <h2 id="delivery-map-heading" className="sr-only">Delivery Map</h2>
              <OrderTrackerMap
                restaurantLocation={{
                  name: mockOrder.restaurant.name,
                  lat: mockOrder.restaurant.lat,
                  lng: mockOrder.restaurant.lng,
                  address: mockOrder.restaurant.address,
                }}
                customerLocation={{
                  name: mockOrder.customer.name,
                  lat: mockOrder.customer.lat,
                  lng: mockOrder.customer.lng,
                  address: mockOrder.customer.address,
                }}
                riderLocation={{
                  name: mockOrder.rider.name,
                  lat: mockOrder.rider.lat,
                  lng: mockOrder.rider.lng,
                }}
                mapHeight="350px"
              />
            </section>

            <div className="text-center pt-4 space-y-3">
              <p className="text-md text-gray-700 dark:text-gray-300">
                Your rider, <span className="font-semibold">{mockOrder.rider.name}</span>, is on their way via {mockOrder.rider.vehicle}!
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link to="/">Back to Home</Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Contact Support {/* This would typically open a chat or call */}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <AppFooter />
    </div>
  );
};

export default OrderTrackingPage;