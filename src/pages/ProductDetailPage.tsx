import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import ProductImageGalleryWithZoom from '@/components/ProductImageGalleryWithZoom';
import VisualVariantSelector, { ColorVariant, SizeVariant } from '@/components/VisualVariantSelector';
import Carousel from '@/components/Carousel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast"; // Using shadcn toast

const productImages = [
  { id: 1, src: 'https://source.unsplash.com/random/800x600?product,tech', alt: 'Main product view' },
  { id: 2, src: 'https://source.unsplash.com/random/800x600?product,detail', alt: 'Product detail view' },
  { id: 3, src: 'https://source.unsplash.com/random/800x600?product,angle', alt: 'Product angle view' },
  { id: 4, src: 'https://source.unsplash.com/random/800x600?product,lifestyle', alt: 'Product in use' },
];

const colorVariants: ColorVariant[] = [
  { type: 'color', name: 'Midnight Black', value: '#000000' },
  { type: 'color', name: 'Ocean Blue', value: 'bg-blue-600' }, // Tailwind class
  { type: 'color', name: 'Forest Green', value: '#228B22', disabled: true },
];

const sizeVariants: SizeVariant[] = [
  { type: 'size', name: 'S' },
  { type: 'size', name: 'M', stockInfo: 'Low stock' },
  { type: 'size', name: 'L' },
  { type: 'size', name: 'XL', disabled: true, stockInfo: 'Out of stock' },
];

const relatedProducts = Array.from({ length: 4 }, (_, i) => ({
  id: `related-${i + 1}`,
  name: `Related Item ${i + 1}`,
  price: `${(Math.random() * 100 + 20).toFixed(2)}`,
  imageUrl: `https://source.unsplash.com/random/300x200?related,product&sig=${i+10}`,
  description: 'A similar great product you might like.'
}));

const ProductDetailPage = () => {
  console.log('ProductDetailPage loaded');
  const { toast } = useToast();
  const [selectedColor, setSelectedColor] = useState<ColorVariant | undefined>(colorVariants[0]);
  const [selectedSize, setSelectedSize] = useState<SizeVariant | undefined>(sizeVariants.find(s => !s.disabled));
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log(`Added to cart: ${quantity} x ${selectedColor?.name} / ${selectedSize?.name} Product`);
    toast({
      title: "Added to Cart!",
      description: `Successfully added ${quantity} item(s) to your cart.`,
    });
  };
  
  const handleAddToWishlist = () => {
    console.log(`Added to wishlist: Product`);
    toast({
      title: "Added to Wishlist!",
      description: `Product has been added to your wishlist.`,
      variant: "default" // Or 'success' if you have custom variants
    });
  };

  const relatedProductSlides = relatedProducts.map(product => (
    <div key={product.id} className="p-2"> {/* Padding for spacing between cards in carousel */}
      <Card className="h-full flex flex-col">
        <CardHeader className="p-0">
          <img src={product.imageUrl} alt={product.name} className="rounded-t-lg h-40 w-full object-cover" />
        </CardHeader>
        <CardContent className="flex-grow pt-3">
          <CardTitle className="text-md">{product.name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</CardDescription>
          <p className="text-md font-semibold mt-2">${product.price}</p>
        </CardContent>
        <CardFooter className="p-3">
          <Button asChild size="sm" className="w-full">
            <Link to={`/product-detail-page`}>View</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  ));


  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/products">Products</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Premium Smartwatch Series X</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Image Gallery */}
          <div>
            <ProductImageGalleryWithZoom images={productImages} mainImageRatio={4/3} />
          </div>

          {/* Right Column: Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl lg:text-4xl font-bold">Premium Smartwatch Series X</h1>
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                <Star /><Star /><Star /><Star /><Star className="text-gray-300" />
              </div>
              <span className="text-sm text-muted-foreground">(125 Reviews)</span>
            </div>
            <p className="text-3xl font-semibold text-primary">$299.99 <span className="text-xl text-muted-foreground line-through ml-2">$349.99</span></p>
            <p className="text-muted-foreground">
              Experience the future of wearable technology. Sleek design, powerful features, and seamless connectivity. Perfect for fitness tracking, notifications, and more.
            </p>

            <VisualVariantSelector
              label="Color"
              variants={colorVariants}
              selectedVariantName={selectedColor?.name}
              onVariantSelect={(variant) => setSelectedColor(variant as ColorVariant)}
            />
            <VisualVariantSelector
              label="Size"
              variants={sizeVariants}
              selectedVariantName={selectedSize?.name}
              onVariantSelect={(variant) => setSelectedSize(variant as SizeVariant)}
            />

            <div className="flex items-center space-x-4">
              <Label htmlFor="quantity" className="text-sm font-medium">Quantity:</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" onClick={handleAddToCart} className="flex-1" disabled={!selectedColor || !selectedSize || selectedColor.disabled || selectedSize.disabled}>
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <Button size="lg" variant="outline" onClick={handleAddToWishlist} className="flex-1">
                <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
              </Button>
            </div>
          </div>
        </div>

        {/* Accordion for Description, Specs, Reviews */}
        <div className="mt-12">
          <Accordion type="single" collapsible defaultValue="description" className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger className="text-xl font-semibold">Product Description</AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p>Dive deep into the capabilities of the Premium Smartwatch Series X. Crafted with precision and packed with cutting-edge technology, this smartwatch is your ultimate companion for a connected and healthy lifestyle.</p>
                <p>Features include: Advanced health monitoring (heart rate, SpO2, sleep), GPS, NFC payments, durable sapphire glass, water resistance up to 50m, and a vibrant AMOLED display.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="specifications">
              <AccordionTrigger className="text-xl font-semibold">Specifications</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Display: 1.4-inch AMOLED, 454x454 resolution</li>
                  <li>Processor: Dual-core 1.2GHz</li>
                  <li>RAM: 1GB, Storage: 8GB</li>
                  <li>Battery: 420mAh, up to 7 days typical use</li>
                  <li>Connectivity: Bluetooth 5.0, Wi-Fi, GPS, NFC</li>
                  <li>Sensors: Accelerometer, Gyroscope, Heart Rate, SpO2, Barometer</li>
                  <li>Compatibility: Android 6.0+ / iOS 10.0+</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="reviews">
              <AccordionTrigger className="text-xl font-semibold">Customer Reviews (125)</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {/* Placeholder for reviews list */}
                <p>Coming soon: Detailed customer feedback and ratings.</p>
                <div className="mt-4 space-y-3">
                    <div className="border p-3 rounded-md">
                        <div className="flex items-center mb-1"><Star className="text-yellow-400 h-4 w-4 mr-1"/><Star className="text-yellow-400 h-4 w-4 mr-1"/><Star className="text-yellow-400 h-4 w-4 mr-1"/><Star className="text-yellow-400 h-4 w-4 mr-1"/><Star className="text-gray-300 h-4 w-4 mr-1"/> <span className="font-semibold ml-2">Great Watch!</span></div>
                        <p className="text-sm">"Love the design and features. Battery life is excellent." - User A</p>
                    </div>
                     <div className="border p-3 rounded-md">
                        <div className="flex items-center mb-1"><Star className="text-yellow-400 h-4 w-4 mr-1"/><Star className="text-yellow-400 h-4 w-4 mr-1"/><Star className="text-yellow-400 h-4 w-4 mr-1"/><Star className="text-yellow-400 h-4 w-4 mr-1"/><Star className="text-yellow-400 h-4 w-4 mr-1"/> <span className="font-semibold ml-2">Best smartwatch I've owned.</span></div>
                        <p className="text-sm">"Tracks everything accurately and looks fantastic." - User B</p>
                    </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Related Products Carousel */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">You Might Also Like</h2>
          <Carousel slides={relatedProductSlides} options={{ align: 'start', slidesToScroll: 'auto' }} showArrows={true} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;