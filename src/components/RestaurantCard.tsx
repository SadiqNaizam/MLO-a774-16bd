import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Star, Clock, Truck } from 'lucide-react';

interface RestaurantCardProps {
  id: string;
  name: string;
  imageUrl: string;
  cuisineTypes: string[];
  rating: number; // e.g., 4.5 out of 5
  deliveryTime: string; // e.g., "20-30 min"
  deliveryFee?: number; // e.g., 2.99. If 0, treat as free. If undefined, indicates fee might vary or not be specified.
  promotion?: string; // e.g., "20% OFF"
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  cuisineTypes,
  rating,
  deliveryTime,
  deliveryFee,
  promotion,
}) => {
  console.log('RestaurantCard loaded for:', name, id);

  const renderDeliveryFee = () => {
    if (deliveryFee === 0) {
      return "Free delivery";
    }
    if (typeof deliveryFee === 'number') {
      return `$${deliveryFee.toFixed(2)}`;
    }
    return "Delivery fee varies"; // Default text if undefined
  };

  return (
    <Link 
      to={`/restaurant-menu?restaurantId=${id}`} 
      className="block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg group h-full"
      aria-label={`View menu for ${name}`}
    >
      <Card className="w-full h-full overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col">
        <CardHeader className="p-0 relative">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl || 'https://via.placeholder.com/400x225?text=Restaurant'}
              alt={`Image of ${name}`}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
          {promotion && (
            <Badge variant="secondary" className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground">
              {promotion}
            </Badge>
          )}
        </CardHeader>

        <CardContent className="p-4 space-y-2 flex-grow flex flex-col">
          <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-primary">
            {name}
          </CardTitle>
          
          <p className="text-xs text-muted-foreground line-clamp-1">
            {cuisineTypes.join(', ') || 'Cuisine not specified'}
          </p>

          <div className="mt-auto space-y-2 pt-2"> {/* Pushes this block to the bottom of CardContent if it's flex-col */}
            <div className="flex items-center text-sm">
              <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{rating.toFixed(1)}</span>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" />
                <span>{deliveryTime}</span>
              </div>
              <div className="flex items-center">
                <Truck className="w-3.5 h-3.5 mr-1" />
                <span>{renderDeliveryFee()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;