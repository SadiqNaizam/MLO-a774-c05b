import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import Carousel from '@/components/Carousel';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Placeholder data for featured products
const featuredProducts = [
  { id: '1', name: 'Awesome Gadget X', price: '199.99', imageUrl: 'https://source.unsplash.com/random/400x300?gadget', description: 'The latest and greatest gadget for your everyday needs.' },
  { id: '2', name: 'Comfy Hoodie Pro', price: '59.99', imageUrl: 'https://source.unsplash.com/random/400x300?hoodie', description: 'Stay warm and stylish with our premium hoodie.' },
  { id: '3', name: 'Eco-Friendly Water Bottle', price: '24.99', imageUrl: 'https://source.unsplash.com/random/400x300?waterbottle', description: 'Hydrate responsibly with this sleek bottle.' },
  { id: '4', name: 'Smart Home Hub', price: '129.00', imageUrl: 'https://source.unsplash.com/random/400x300?smarthome', description: 'Control your home with the touch of a button.' },
];

// Placeholder slides for hero carousel
const heroSlides = [
  <div key="slide1" className="h-[500px] bg-gradient-to-r from-slate-900 to-slate-700 text-white flex flex-col items-center justify-center p-8 text-center">
    <h1 className="text-5xl font-bold mb-4">Mega Sale Event!</h1>
    <p className="text-xl mb-6">Up to 70% off on selected items. Don't miss out!</p>
    <Button size="lg" asChild><Link to="/products">Shop Now</Link></Button>
  </div>,
  <div key="slide2" className="h-[500px] bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/random/1200x500?technology')" }}>
    <div className="bg-black/50 h-full flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-5xl font-bold mb-4 text-white">New Arrivals</h1>
      <p className="text-xl mb-6 text-gray-200">Check out the latest tech and gadgets.</p>
      <Button size="lg" variant="outline" asChild><Link to="/products?category=new">Explore New</Link></Button>
    </div>
  </div>,
];

const Homepage = () => {
  console.log('Homepage loaded');
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <main className="flex-grow">
        {/* Hero Section Carousel */}
        <section className="mb-12">
          <Carousel slides={heroSlides} options={{ loop: true }} autoplayDelay={5000} />
        </section>

        {/* Featured Products Section */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <Card key={product.id} className="flex flex-col">
                <CardHeader>
                  <img src={product.imageUrl} alt={product.name} className="rounded-t-lg h-48 w-full object-cover" />
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription className="mt-2 text-lg font-semibold">${product.price}</CardDescription>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link to={`/product-detail-page`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action / Other sections */}
        <section className="bg-muted py-16 text-center">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
                <p className="text-lg text-muted-foreground mb-8">Sign up for our newsletter to get the latest updates and offers.</p>
                <div className="flex justify-center max-w-md mx-auto">
                    {/* Placeholder for newsletter signup - uses shadcn Input and Button */}
                    {/* <Input type="email" placeholder="Enter your email" className="mr-2" /> */}
                    {/* <Button>Subscribe</Button> */}
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;