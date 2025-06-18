import React from 'react';
import { MapPin, Bike, Home, Store } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LocationPoint {
  lat: number;
  lng: number;
  name: string;
  address?: string; // Optional, for more detail
}

interface OrderTrackerMapProps {
  restaurantLocation: LocationPoint;
  customerLocation: LocationPoint;
  riderLocation?: LocationPoint;
  // In a real map, you might have props for zoom, center, route polylines, etc.
  // For this mock, we'll keep it simple.
  mapHeight?: string; // e.g., "400px", "50vh"
}

const OrderTrackerMap: React.FC<OrderTrackerMapProps> = ({
  restaurantLocation,
  customerLocation,
  riderLocation,
  mapHeight = '400px',
}) => {
  console.log('OrderTrackerMap loaded');

  // Placeholder positions for markers within the mock map.
  // These are just illustrative and would be dynamic in a real map.
  const markerPositions = {
    restaurant: { top: '20%', left: '15%' },
    customer: { top: '70%', left: '80%' },
    rider: { top: '45%', left: '45%' },
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Delivery Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="relative w-full bg-gray-200 rounded-md overflow-hidden"
          style={{ height: mapHeight }}
          aria-label="Placeholder map showing delivery tracking"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500 text-center p-4">
              Map Area: Real map integration (e.g., Google Maps, Mapbox, Leaflet) would be here.
              <br />
              Showing simulated marker positions.
            </p>
          </div>

          {/* Restaurant Marker */}
          <div
            className="absolute p-2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ top: markerPositions.restaurant.top, left: markerPositions.restaurant.left }}
            title={`Restaurant: ${restaurantLocation.name}`}
          >
            <div className="flex flex-col items-center">
              <Store className="h-8 w-8 text-red-600" />
              <Badge variant="secondary" className="mt-1 text-xs">
                {restaurantLocation.name}
              </Badge>
            </div>
          </div>

          {/* Customer Marker */}
          <div
            className="absolute p-2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ top: markerPositions.customer.top, left: markerPositions.customer.left }}
            title={`Customer: ${customerLocation.name}`}
          >
            <div className="flex flex-col items-center">
              <Home className="h-8 w-8 text-blue-600" />
              <Badge variant="secondary" className="mt-1 text-xs">
                {customerLocation.name}
              </Badge>
            </div>
          </div>

          {/* Rider Marker (conditional) */}
          {riderLocation && (
            <div
              className="absolute p-2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out"
              style={{ top: markerPositions.rider.top, left: markerPositions.rider.left }}
              title={`Rider: ${riderLocation.name}`}
            >
              <div className="flex flex-col items-center">
                <Bike className="h-8 w-8 text-green-600 animate-pulse" />
                <Badge variant="outline" className="mt-1 text-xs bg-white">
                  {riderLocation.name}
                </Badge>
              </div>
            </div>
          )}

          {/* Placeholder for route line - in a real map, this would be a polyline */}
          {riderLocation && (
            <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
              {/* Dashed line from restaurant to rider */}
              <line
                x1={markerPositions.restaurant.left}
                y1={markerPositions.restaurant.top}
                x2={markerPositions.rider.left}
                y2={markerPositions.rider.top}
                stroke="rgba(0, 0, 0, 0.3)"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              {/* Dashed line from rider to customer */}
              <line
                x1={markerPositions.rider.left}
                y1={markerPositions.rider.top}
                x2={markerPositions.customer.left}
                y2={markerPositions.customer.top}
                stroke="rgba(0, 0, 0, 0.3)"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            </svg>
          )}
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
                <h4 className="font-semibold flex items-center"><Store className="h-4 w-4 mr-2 text-red-500" />Restaurant</h4>
                <p className="text-gray-600">{restaurantLocation.name}</p>
                {restaurantLocation.address && <p className="text-gray-500 text-xs">{restaurantLocation.address}</p>}
            </div>
            {riderLocation && (
                 <div>
                    <h4 className="font-semibold flex items-center"><Bike className="h-4 w-4 mr-2 text-green-500" />Rider</h4>
                    <p className="text-gray-600">{riderLocation.name}</p>
                    {riderLocation.address && <p className="text-gray-500 text-xs">{riderLocation.address}</p>}
                </div>
            )}
            <div>
                <h4 className="font-semibold flex items-center"><Home className="h-4 w-4 mr-2 text-blue-500" />Delivery To</h4>
                <p className="text-gray-600">{customerLocation.name}</p>
                {customerLocation.address && <p className="text-gray-500 text-xs">{customerLocation.address}</p>}
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTrackerMap;