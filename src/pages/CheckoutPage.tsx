import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Using shadcn form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

const checkoutSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  address: z.string().min(1, { message: "Address is required." }),
  apartment: z.string().optional(),
  city: z.string().min(1, { message: "City is required." }),
  country: z.string().min(1, { message: "Country is required." }),
  postalCode: z.string().min(1, { message: "Postal code is required." }),
  phone: z.string().optional(),
  shippingMethod: z.string().min(1, {message: "Please select a shipping method."}),
  paymentMethod: z.enum(["creditCard", "paypal", "bankTransfer"], { required_error: "Please select a payment method."}),
  cardNumber: z.string().optional(), // Add more specific validation if paymentMethod is creditCard
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
  saveInfo: z.boolean().optional(),
  agreeTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms and conditions." }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      country: "US", // Default country
      postalCode: "",
      shippingMethod: "standard",
      paymentMethod: "creditCard",
      saveInfo: false,
      agreeTerms: false,
    },
  });

  function onSubmit(data: CheckoutFormValues) {
    console.log('Checkout form submitted:', data);
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. Your order is being processed.",
    });
    // Simulate API call then navigate
    setTimeout(() => {
      navigate("/"); // Navigate to homepage or an order confirmation page
    }, 2000);
  }

  // Example order summary data (in a real app, this would come from cart state)
  const orderSummary = {
    subtotal: 299.99,
    shipping: 0.00,
    tax: 24.00,
    total: 323.99,
    items: [
      { id: '1', name: 'Premium Smartwatch Series X', quantity: 1, price: 299.99, imageUrl: 'https://source.unsplash.com/random/60x60?smartwatch' },
    ]
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid lg:grid-cols-3 gap-8">
            {/* Left Side: Form Fields */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader><CardTitle>Shipping Address</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField name="firstName" control={form.control} render={({ field }) => ( <FormItem><FormLabel>First Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField name="lastName" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Last Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                  <FormField name="address" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Address</FormLabel><FormControl><Input placeholder="123 Main St" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField name="apartment" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Apartment, suite, etc. (optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <div className="grid sm:grid-cols-3 gap-4">
                    <FormField name="city" control={form.control} render={({ field }) => ( <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField name="country" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Country</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="US">United States</SelectItem>
                                    <SelectItem value="CA">Canada</SelectItem>
                                    <SelectItem value="GB">United Kingdom</SelectItem>
                                    {/* Add more countries */}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField name="postalCode" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Postal Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                  <FormField name="phone" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Phone (optional)</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormDescription>For shipping updates.</FormDescription><FormMessage /></FormItem>)} />
                </CardContent>
              </Card>

              {/* Shipping Method */}
              <Card>
                <CardHeader><CardTitle>Shipping Method</CardTitle></CardHeader>
                <CardContent>
                   <FormField
                    control={form.control}
                    name="shippingMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0 border p-3 rounded-md">
                              <FormControl><RadioGroupItem value="standard" /></FormControl>
                              <FormLabel className="font-normal flex justify-between w-full">Standard Shipping (5-7 days) <span>$0.00</span></FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 border p-3 rounded-md">
                              <FormControl><RadioGroupItem value="express" /></FormControl>
                              <FormLabel className="font-normal flex justify-between w-full">Express Shipping (1-2 days) <span>$15.00</span></FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader><CardTitle>Payment Method</CardTitle></CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-2">
                            <FormItem className="flex items-center space-x-3 border p-3 rounded-md"><FormControl><RadioGroupItem value="creditCard" /></FormControl><FormLabel className="font-normal">Credit Card</FormLabel></FormItem>
                            <FormItem className="flex items-center space-x-3 border p-3 rounded-md"><FormControl><RadioGroupItem value="paypal" /></FormControl><FormLabel className="font-normal">PayPal</FormLabel></FormItem>
                            <FormItem className="flex items-center space-x-3 border p-3 rounded-md"><FormControl><RadioGroupItem value="bankTransfer" /></FormControl><FormLabel className="font-normal">Bank Transfer</FormLabel></FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.watch("paymentMethod") === "creditCard" && (
                    <div className="space-y-4 mt-4 pt-4 border-t">
                      <FormField name="cardNumber" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField name="cardExpiry" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Expiry Date (MM/YY)</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField name="cardCvc" control={form.control} render={({ field }) => ( <FormItem><FormLabel>CVC</FormLabel><FormControl><Input placeholder="•••" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <FormField
                control={form.control}
                name="saveInfo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Save this information for next time</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agreeTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>I agree to the <Link to="/terms" className="underline hover:text-primary">Terms and Conditions</Link></FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Right Side: Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>Review your items before placing order.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orderSummary.items.map(item => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded object-cover"/>
                        <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <hr/>
                  <div className="flex justify-between text-sm"><p>Subtotal</p><p>${orderSummary.subtotal.toFixed(2)}</p></div>
                  <div className="flex justify-between text-sm"><p>Shipping</p><p>${orderSummary.shipping.toFixed(2)}</p></div>
                  <div className="flex justify-between text-sm"><p>Taxes</p><p>${orderSummary.tax.toFixed(2)}</p></div>
                  <hr/>
                  <div className="flex justify-between font-bold text-lg"><p>Total</p><p>${orderSummary.total.toFixed(2)}</p></div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Placing Order..." : "Place Order"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </form>
        </Form>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;