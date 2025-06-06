import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, PlusCircle, MinusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  variantInfo?: string; // e.g., "Color: Black, Size: M"
}

const initialCartItems: CartItem[] = [
  { id: '1', name: 'Premium Smartwatch Series X', price: 299.99, quantity: 1, imageUrl: 'https://source.unsplash.com/random/100x100?smartwatch', variantInfo: 'Color: Midnight Black, Size: L' },
  { id: '2', name: 'Wireless Noise-Cancelling Headphones', price: 149.50, quantity: 1, imageUrl: 'https://source.unsplash.com/random/100x100?headphones', variantInfo: 'Color: Silver' },
  { id: '3', name: 'Ergonomic Office Chair', price: 220.00, quantity: 1, imageUrl: 'https://source.unsplash.com/random/100x100?chair' },
];

const CartPage = () => {
  console.log('CartPage loaded');
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(items =>
      items.map(item => (item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item))
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({
        title: "Item Removed",
        description: "The item has been removed from your cart.",
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = subtotal > 50 ? 0 : 10; // Example: Free shipping over $50
  const tax = subtotal * 0.08; // Example: 8% tax
  const total = subtotal + shippingCost + tax;

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild><Link to="/products">Continue Shopping</Link></Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items Table */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Cart Items ({cartItems.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px] hidden md:table-cell">Image</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-center">Remove</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map(item => (
                        <TableRow key={item.id}>
                          <TableCell className="hidden md:table-cell">
                            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
                          </TableCell>
                          <TableCell>
                            <p className="font-medium">{item.name}</p>
                            {item.variantInfo && <p className="text-xs text-muted-foreground">{item.variantInfo}</p>}
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                                <MinusCircle className="h-4 w-4" />
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                className="w-16 text-center h-8"
                                min="1"
                              />
                              <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                <PlusCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right font-medium">${(item.price * item.quantity).toFixed(2)}</TableCell>
                          <TableCell className="text-center">
                            <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                              <Trash2 className="h-5 w-5 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20"> {/* Sticky for larger screens */}
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <hr/>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button asChild size="lg" className="w-full">
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/products">Continue Shopping</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;