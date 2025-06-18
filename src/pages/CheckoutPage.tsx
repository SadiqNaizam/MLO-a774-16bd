import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import CartItemRow from '@/components/CartItemRow'; // Custom component

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';

import { CreditCard, HomeIcon, Package, ShieldCheck, Percent, ShoppingCart } from 'lucide-react';

// Define Zod schema for form validation
const checkoutFormSchema = z.object({
  // Delivery Address
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  streetAddress: z.string().min(5, { message: "Street address is required." }),
  apartment: z.string().optional(),
  city: z.string().min(2, { message: "City is required." }),
  state: z.string().min(2, { message: "Please select a state/province." }),
  postalCode: z.string().min(3, { message: "Valid postal code is required." }),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format (e.g., +1234567890)." }),

  // Payment Method
  paymentMethod: z.enum(["creditCard", "paypal"], { required_error: "Please select a payment method." }),
  cardHolderName: z.string().optional(),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(), // MM/YY
  cvv: z.string().optional(),
  
  // Promo Code
  promoCode: z.string().optional(),

  // Agreement
  agreeToTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms and conditions to proceed." })
}).superRefine((data, ctx) => {
  if (data.paymentMethod === "creditCard") {
    if (!data.cardHolderName || data.cardHolderName.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Cardholder name is required for credit card payment.", path: ["cardHolderName"] });
    }
    const cardNumberDigits = data.cardNumber?.replace(/\s/g, '');
    if (!cardNumberDigits || !/^\d{13,19}$/.test(cardNumberDigits)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid card number (must be 13-19 digits).", path: ["cardNumber"] });
    }
    if (!data.expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiryDate)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid expiry date (MM/YY format).", path: ["expiryDate"] });
    }
    if (!data.cvv || !/^\d{3,4}$/.test(data.cvv)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid CVV (3 or 4 digits).", path: ["cvv"] });
    }
  }
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

// Mock cart items data
const initialCartItems = [
  { id: '1', name: 'Margherita Pizza', pricePerUnit: 12.99, quantity: 1 },
  { id: '2', name: 'Coca-Cola (2L)', pricePerUnit: 2.50, quantity: 2 },
  { id: '3', name: 'Garlic Knots (6 pcs)', pricePerUnit: 5.00, quantity: 1 },
];

const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", 
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", 
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", 
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", 
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", 
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", 
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];


const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: '',
      streetAddress: '',
      apartment: '',
      city: '',
      state: '',
      postalCode: '',
      phoneNumber: '',
      paymentMethod: 'creditCard',
      cardHolderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      promoCode: '',
      agreeToTerms: false,
    },
  });

  const paymentMethod = form.watch("paymentMethod");

  const handleQuantityChange = (itemId: string | number, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (itemId: string | number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.pricePerUnit * item.quantity, 0);
  const deliveryFee = cartItems.length > 0 ? 5.00 : 0; // Mock delivery fee
  const taxRate = 0.08; // Mock tax rate 8%
  const taxes = subtotal * taxRate;
  const discount = appliedPromo === "SAVE10" ? subtotal * 0.10 : 0;
  const total = subtotal + deliveryFee + taxes - discount;

  const handleApplyPromoCode = () => {
    const promoCodeValue = form.getValues("promoCode");
    if (promoCodeValue?.toUpperCase() === "SAVE10") {
      setAppliedPromo("SAVE10");
      toast.success("Promo code 'SAVE10' applied! 10% off subtotal.");
    } else if (promoCodeValue) {
      toast.error("Invalid promo code.");
      setAppliedPromo(null);
    } else {
      toast.info("Please enter a promo code.");
    }
  };

  const onSubmit = (data: CheckoutFormValues) => {
    console.log('Order submitted:', data);
    // Simulate API call
    toast.success('Order Placed Successfully!', {
      description: 'Your food is on its way. Redirecting to order tracking...',
      duration: 3000,
    });
    // Clear cart or perform other actions
    setCartItems([]); 
    setTimeout(() => {
      navigate('/order-tracking'); // Navigate after a short delay for toast
    }, 3000);
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      toast.info("Your cart is empty. Add some items to proceed.", {
        action: {
          label: "Go to Menu",
          onClick: () => navigate('/restaurant-listing'), // or specific menu page
        },
      });
    }
  }, [cartItems, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* AppHeader Placeholder */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            FoodFleet
          </Link>
          <Button variant="ghost" size="icon" onClick={() => navigate('/restaurant-listing')}>
             <ShoppingCart className="h-5 w-5" />
             <span className="sr-only">Back to Shopping</span>
          </Button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800 dark:text-gray-100 tracking-tight">
          Secure Checkout
        </h1>

        {cartItems.length === 0 ? (
          <Card className="text-center py-12">
            <CardHeader>
              <CardTitle className="text-2xl">Your Cart is Empty</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Looks like you haven't added anything to your cart yet.</p>
              <Button onClick={() => navigate('/restaurant-listing')} size="lg">
                <ShoppingCart className="mr-2 h-5 w-5" /> Start Shopping
              </Button>
            </CardContent>
          </Card>
        ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Main Content: Address and Payment Forms */}
            <div className="lg:col-span-2 space-y-8">
              {/* Delivery Address Section */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <HomeIcon className="mr-2 h-6 w-6 text-primary" /> Delivery Address
                  </CardTitle>
                  <CardDescription>Where should we send your delicious food?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="streetAddress" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl><Input placeholder="123 Main St" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="apartment" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apartment, suite, etc. (Optional)</FormLabel>
                      <FormControl><Input placeholder="Apt #101" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl><Input placeholder="Anytown" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                     <FormField control={form.control} name="state" render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Province</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger></FormControl>
                          <SelectContent>
                            {usStates.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="postalCode" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl><Input placeholder="12345" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="phoneNumber" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl><Input type="tel" placeholder="+1 555-123-4567" {...field} /></FormControl>
                      <FormDescription>For delivery updates.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />
                </CardContent>
              </Card>

              {/* Payment Method Section */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <CreditCard className="mr-2 h-6 w-6 text-primary" /> Payment Method
                  </CardTitle>
                  <CardDescription>Choose how you'd like to pay.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col sm:flex-row gap-4">
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="creditCard" /></FormControl>
                            <FormLabel className="font-normal">Credit Card</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="paypal" /></FormControl>
                            <FormLabel className="font-normal">PayPal (Mock)</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  {paymentMethod === 'creditCard' && (
                    <div className="space-y-4 pt-4 border-t dark:border-gray-700">
                      <FormField control={form.control} name="cardHolderName" render={({ field }) => (
                        <FormItem><FormLabel>Cardholder Name</FormLabel><FormControl><Input placeholder="Name on Card" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="cardNumber" render={({ field }) => (
                        <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="0000 0000 0000 0000" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="expiryDate" render={({ field }) => (
                          <FormItem><FormLabel>Expiry Date</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="cvv" render={({ field }) => (
                          <FormItem><FormLabel>CVV</FormLabel><FormControl><Input placeholder="123" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                    </div>
                  )}
                  {paymentMethod === 'paypal' && (
                    <div className="pt-4 border-t dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400">You will be redirected to PayPal to complete your payment.</p>
                      {/* Placeholder for PayPal button or redirect logic */}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar: Order Summary */}
            <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24"> {/* Sticky summary on larger screens */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Package className="mr-2 h-6 w-6 text-primary" /> Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {cartItems.map(item => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      onQuantityChange={handleQuantityChange}
                      onRemoveItem={handleRemoveItem}
                    />
                  ))}
                  {cartItems.length === 0 && <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">Your cart is empty.</p>}
                </CardContent>
                <Separator />
                <CardContent className="space-y-2 pt-4">
                   <div className="flex items-center gap-2">
                     <FormField control={form.control} name="promoCode" render={({ field }) => (
                        <FormItem className="flex-grow">
                           <FormLabel className="sr-only">Promo Code</FormLabel>
                           <FormControl><Input placeholder="Enter promo code" {...field} className="h-9"/></FormControl>
                        </FormItem>
                     )} />
                     <Button type="button" variant="outline" onClick={handleApplyPromoCode} className="h-9 shrink-0">
                        <Percent className="mr-1 h-4 w-4" /> Apply
                     </Button>
                   </div>
                   <FormMessage>{form.formState.errors.promoCode?.message}</FormMessage>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                      <span>Discount (10%):</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Delivery Fee:</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Taxes (8%):</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <FormField control={form.control} name="agreeToTerms" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 dark:border-gray-700 shadow-sm">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Agree to Terms and Conditions</FormLabel>
                        <FormDescription>
                          By placing this order, you agree to our <Link to="/terms" className="text-primary hover:underline">Terms & Conditions</Link>.
                        </FormDescription>
                         <FormMessage />
                      </div>
                    </FormItem>
                  )} />
                  <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting || cartItems.length === 0}>
                    <ShieldCheck className="mr-2 h-5 w-5" />
                    {form.formState.isSubmitting ? 'Placing Order...' : `Place Order ($${total.toFixed(2)})`}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </form>
        </Form>
        )}
      </main>

      {/* AppFooter Placeholder */}
      <footer className="bg-gray-100 dark:bg-gray-800 border-t dark:border-gray-700">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} FoodFleet. All rights reserved. <br />
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link> | <Link to="/terms" className="hover:underline">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
};

export default CheckoutPage;