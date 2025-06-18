import React from 'react';
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItem {
  id: string | number; // Unique identifier for the cart item
  name: string;
  pricePerUnit: number;
  quantity: number;
  // Optional: Add other item-specific details like imageUrl or variantId if needed by the parent
}

interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (itemId: string | number, newQuantity: number) => void;
  onRemoveItem: (itemId: string | number) => void;
}

const CartItemRow: React.FC<CartItemRowProps> = ({ item, onQuantityChange, onRemoveItem }) => {
  console.log(`CartItemRow loaded for item: ${item.name} (ID: ${item.id})`);

  const handleIncrement = () => {
    onQuantityChange(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
    // If quantity is 1, decrementing is disabled by the button.
    // Removal is handled by the dedicated remove button.
  };

  const totalPrice = item.pricePerUnit * item.quantity;

  return (
    <div className="flex items-center justify-between gap-2 sm:gap-4 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      {/* Item Name & Price per unit */}
      <div className="flex-grow min-w-0 pr-2"> {/* min-w-0 and pr-2 help flexbox truncate text and prevent overlap */}
        <p 
          className="font-semibold text-sm sm:text-base truncate" 
          title={item.name} // Show full name on hover if truncated
        >
          {item.name}
        </p>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          ${item.pricePerUnit.toFixed(2)} each
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center shrink-0 space-x-1 sm:space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 sm:h-8 sm:w-8 rounded-full" // rounder buttons for quantity
          onClick={handleDecrement}
          disabled={item.quantity <= 1}
          aria-label={`Decrease quantity of ${item.name}`}
        >
          <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
        <span className="w-5 sm:w-7 text-center text-sm sm:text-base tabular-nums">
          {item.quantity}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
          onClick={handleIncrement}
          aria-label={`Increase quantity of ${item.name}`}
        >
          <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>

      {/* Total Price */}
      <div className="w-16 sm:w-20 text-right shrink-0">
        <p className="font-semibold text-sm sm:text-base tabular-nums">
          ${totalPrice.toFixed(2)}
        </p>
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 text-gray-500 hover:text-destructive dark:text-gray-400 dark:hover:text-destructive"
        onClick={() => onRemoveItem(item.id)}
        aria-label={`Remove ${item.name} from cart`}
      >
        <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </div>
  );
};

export default CartItemRow;