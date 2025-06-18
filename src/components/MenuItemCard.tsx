import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Minus, Plus, ShoppingCart, Settings2 } from 'lucide-react';

export interface MenuItemData {
  id: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  hasCustomizations?: boolean;
}

interface MenuItemCardProps {
  item: MenuItemData;
  onAddToCart: (details: {
    itemId: string | number;
    name: string;
    price: number;
    quantity: number;
    customizations?: Record<string, any>;
  }) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart }) => {
  console.log('MenuItemCard loaded for:', item.name);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCartClick = (customizations?: Record<string, any>) => {
    onAddToCart({
      itemId: item.id,
      name: item.name,
      price: item.price, // Base price; customizations might alter this in a full impl.
      quantity,
      customizations,
    });
    toast({
      title: "Item Added to Cart",
      description: `${quantity} x ${item.name} ${customizations ? '(customized) ' : ''}added to your cart.`,
    });
    // Optionally reset quantity, or manage this behavior via props/parent state
    // setQuantity(1); 
  };

  return (
    <Card className="w-full overflow-hidden flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300">
      {item.imageUrl ? (
        <CardHeader className="p-0">
          <AspectRatio ratio={16 / 9}>
            <img
              src={item.imageUrl}
              alt={item.name}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
        </CardHeader>
      ) : (
         <CardHeader className="p-0">
          <AspectRatio ratio={16 / 9} className="bg-slate-100 flex items-center justify-center">
            {/* You could use an icon here for placeholder_image */}
            <span className="text-slate-400 text-sm">No image available</span>
          </AspectRatio>
        </CardHeader>
      )}

      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-semibold mb-1 line-clamp-2 leading-tight">{item.name}</CardTitle>
        <CardDescription className="text-sm text-slate-600 mb-3 line-clamp-3">{item.description}</CardDescription>
        <p className="text-lg font-bold text-slate-800">${item.price.toFixed(2)}</p>
      </CardContent>

      <CardFooter className="p-4 border-t bg-slate-50">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between w-full gap-3">
          {/* Quantity Stepper */}
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Button variant="outline" size="icon" onClick={decrementQuantity} aria-label="Decrease quantity" className="rounded-full h-9 w-9 sm:h-10 sm:w-10">
              <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <span className="w-10 text-center text-lg font-medium tabular-nums">{quantity}</span>
            <Button variant="outline" size="icon" onClick={incrementQuantity} aria-label="Increase quantity" className="rounded-full h-9 w-9 sm:h-10 sm:w-10">
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
            {item.hasCustomizations && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full xs:w-auto justify-center">
                    <Settings2 className="mr-2 h-4 w-4" /> Customize
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Customize {item.name}</DialogTitle>
                    <DialogDescription>
                      Make your selections for {item.name}. Any changes may affect the final price.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4 space-y-3">
                    <p className="text-sm text-slate-500">
                      This is a placeholder for customization options.
                      For example, you might select size, toppings, or add special instructions here.
                    </p>
                    {/* Example of a placeholder option */}
                    <div>
                      <label htmlFor="special-instructions" className="text-sm font-medium">Special Instructions (Example)</label>
                      <textarea id="special-instructions" placeholder="e.g., no onions" className="mt-1 w-full p-2 border rounded-md h-20 resize-none" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" onClick={() => {
                      const mockCustomizations = { instructions: (document.getElementById('special-instructions') as HTMLTextAreaElement)?.value || "User viewed options" };
                      handleAddToCartClick(mockCustomizations);
                      // Dialog should close automatically if DialogTrigger wraps this, or manually handle close.
                      // For shadcn, if this button is inside DialogFooter, DialogTrigger might not auto-close.
                      // It's often better to use <DialogClose asChild><Button>...</Button></DialogClose> for explicit close.
                      // Or, the Dialog's open state needs to be managed to close it programmatically.
                      // For now, user closes manually or we rely on default behavior.
                    }}>
                      Add Customized Item
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            <Button onClick={() => handleAddToCartClick()} className="w-full xs:w-auto flex-grow justify-center">
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MenuItemCard;