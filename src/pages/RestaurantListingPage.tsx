import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RestaurantCard from '@/components/RestaurantCard'; // Custom component

// Shadcn/ui components
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button'; // For potential use, e.g. "Apply Filters"

// Lucide-react icons
import { Search, ShoppingCart, Home as HomeIcon, UserCircle, MapPin, Filter, ArrowUpDown } from 'lucide-react';

// Local interface matching RestaurantCardProps since it's not exported from the component
interface RestaurantCardProps {
  id: string;
  name: string;
  imageUrl: string;
  cuisineTypes: string[];
  rating: number;
  deliveryTime: string;
  deliveryFee?: number;
  promotion?: string;
}

// Placeholder data for restaurants
const mockRestaurants: RestaurantCardProps[] = [
  {
    id: '1',
    name: 'The Italian Place',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    cuisineTypes: ['Italian', 'Pizza', 'Pasta'],
    rating: 4.5,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
    promotion: '15% OFF',
  },
  {
    id: '2',
    name: 'Burger Haven',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    cuisineTypes: ['Burgers', 'Fries', 'American'],
    rating: 4.2,
    deliveryTime: '20-30 min',
    deliveryFee: 0, // Free delivery
  },
  {
    id: '3',
    name: 'Spice Route',
    imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    cuisineTypes: ['Indian', 'Curry', 'Vegetarian'],
    rating: 4.8,
    deliveryTime: '30-40 min',
    // deliveryFee is undefined, will show "Delivery fee varies"
    promotion: 'Free Naan',
  },
   {
    id: '4',
    name: 'Ocean Sushi',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN1c2hpJTIwcmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    cuisineTypes: ['Japanese', 'Sushi', 'Seafood'],
    rating: 4.6,
    deliveryTime: '35-45 min',
    deliveryFee: 3.50,
  },
  {
    id: '5',
    name: 'Healthy Greens',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhbHRoeSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    cuisineTypes: ['Salads', 'Smoothies', 'Healthy'],
    rating: 4.7,
    deliveryTime: '15-25 min',
    deliveryFee: 1.99,
    promotion: 'Buy 1 Get 1 Smoothie',
  },
];

// Mock AppHeader component
const AppHeader = () => (
  <header className="bg-white shadow-sm sticky top-0 z-50">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-orange-600 hover:text-orange-500 transition-colors">
        FoodDash
      </Link>
      <nav className="flex items-center space-x-3 sm:space-x-5">
        <Link to="/" className="text-sm sm:text-base text-gray-600 hover:text-orange-600 transition-colors flex items-center">
          <HomeIcon className="h-4 w-4 mr-1 sm:mr-2" /> Home
        </Link>
        <Link to="/order-tracking" className="text-sm sm:text-base text-gray-600 hover:text-orange-600 transition-colors flex items-center">
          <MapPin className="h-4 w-4 mr-1 sm:mr-2" /> Track Order
        </Link>
        <Link to="/checkout" className="text-sm sm:text-base text-gray-600 hover:text-orange-600 transition-colors">
          <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
        </Link>
        <Link to="#" aria-label="User Profile" className="text-gray-600 hover:text-orange-600 transition-colors">
          <UserCircle className="h-5 w-5 sm:h-6 sm:w-6" />
        </Link>
      </nav>
    </div>
  </header>
);

// Mock AppFooter component
const AppFooter = () => (
  <footer className="bg-gray-100 border-t mt-16 py-8 text-center">
    <div className="container mx-auto px-4">
      <p className="text-gray-700 mb-3">&copy; {new Date().getFullYear()} FoodDash. All rights reserved.</p>
      <div className="flex justify-center space-x-4 sm:space-x-6">
        <Link to="#" className="text-xs sm:text-sm text-gray-500 hover:text-orange-600 transition-colors">About Us</Link>
        <Link to="#" className="text-xs sm:text-sm text-gray-500 hover:text-orange-600 transition-colors">Contact</Link>
        <Link to="#" className="text-xs sm:text-sm text-gray-500 hover:text-orange-600 transition-colors">Privacy Policy</Link>
        <Link to="#" className="text-xs sm:text-sm text-gray-500 hover:text-orange-600 transition-colors">Terms of Service</Link>
      </div>
    </div>
  </footer>
);

const RestaurantListingPage = () => {
  console.log('RestaurantListingPage loaded');

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [filters, setFilters] = useState({
    openNow: false,
    freeDelivery: false,
    topRated: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(mockRestaurants.length / 10); // Assuming 10 items per page for example

  const handleFilterChange = (filterName: keyof typeof filters, checked: boolean | 'indeterminate') => {
    if (typeof checked === 'boolean') {
      setFilters(prev => ({ ...prev, [filterName]: checked }));
    }
  };

  // In a real app, searchQuery, sortBy, filters, and currentPage would be used to fetch/filter data
  // For this static page, mockRestaurants is displayed as is.

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AppHeader />

      <main className="container mx-auto px-4 py-6 sm:py-8 flex-grow">
        <section aria-labelledby="page-title" className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 id="page-title" className="text-2xl sm:text-3xl font-bold text-gray-800">
            Find Your Next Meal
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Explore restaurants, filter by your preferences, and get food delivered.
          </p>
        </section>

        {/* Filters and Search Section */}
        <section aria-labelledby="filters-search-heading" className="mb-8 p-4 sm:p-6 bg-white rounded-lg shadow-md">
          <h2 id="filters-search-heading" className="sr-only">Filters and Search Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            {/* Search Input */}
            <div className="md:col-span-7 lg:col-span-8">
              <Label htmlFor="search-restaurants" className="block text-xs font-medium text-gray-700 mb-1">
                Search Restaurants or Cuisines
              </Label>
              <div className="relative">
                <Input
                  id="search-restaurants"
                  type="text"
                  placeholder="e.g., Pizza, Tacos, 'King Restaurant'"
                  className="pl-10 text-sm sm:text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
            </div>

            {/* Sort Select */}
            <div className="md:col-span-5 lg:col-span-4">
              <Label htmlFor="sort-by" className="block text-xs font-medium text-gray-700 mb-1">Sort by</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort-by" className="text-sm sm:text-base">
                  <ArrowUpDown className="h-4 w-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Recommended" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="rating">Rating (High to Low)</SelectItem>
                  <SelectItem value="delivery_time">Delivery Time (Fastest)</SelectItem>
                  <SelectItem value="price_asc">Price (Low to High)</SelectItem>
                  <SelectItem value="price_desc">Price (High to Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filter Checkboxes */}
          <div className="mt-4 sm:mt-6 border-t pt-4 sm:pt-6">
            <h3 className="text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3 flex items-center">
              <Filter className="h-4 w-4 mr-2 text-gray-500" /> Filter by
            </h3>
            <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="filter-open-now" 
                  checked={filters.openNow} 
                  onCheckedChange={(checked) => handleFilterChange('openNow', checked)}
                />
                <Label htmlFor="filter-open-now" className="text-xs sm:text-sm font-normal text-gray-600 cursor-pointer">Open Now</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="filter-free-delivery" 
                  checked={filters.freeDelivery} 
                  onCheckedChange={(checked) => handleFilterChange('freeDelivery', checked)}
                />
                <Label htmlFor="filter-free-delivery" className="text-xs sm:text-sm font-normal text-gray-600 cursor-pointer">Free Delivery</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="filter-top-rated" 
                  checked={filters.topRated} 
                  onCheckedChange={(checked) => handleFilterChange('topRated', checked)}
                />
                <Label htmlFor="filter-top-rated" className="text-xs sm:text-sm font-normal text-gray-600 cursor-pointer">Top Rated (4+)</Label>
              </div>
            </div>
          </div>
        </section>

        {/* Restaurant List Section */}
        <section aria-labelledby="restaurant-list-heading">
          <h2 id="restaurant-list-heading" className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">
            Available Restaurants
          </h2>
          {mockRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {mockRestaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 px-4">
              <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-1">No Restaurants Found</p>
              <p className="text-sm text-gray-500">Try adjusting your search or filters.</p>
            </div>
          )}
        </section>

        {/* Pagination Section */}
        {mockRestaurants.length > 0 && totalPages > 1 && (
          <section aria-label="Pagination" className="mt-8 sm:mt-12 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); setCurrentPage(prev => Math.max(1, prev - 1)); }} 
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : undefined}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink 
                      href="#" 
                      isActive={currentPage === i + 1}
                      onClick={(e) => { e.preventDefault(); setCurrentPage(i + 1); }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {/* Simple Ellipsis logic example, can be more complex */}
                {/* {totalPages > 5 && currentPage < totalPages - 2 && <PaginationEllipsis />} */}
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); setCurrentPage(prev => Math.min(totalPages, prev + 1)); }}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : undefined}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </section>
        )}
      </main>

      <AppFooter />
    </div>
  );
};

export default RestaurantListingPage;