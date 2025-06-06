import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';

const mockProducts = Array.from({ length: 12 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Product Name ${i + 1}`,
  category: i % 2 === 0 ? 'Electronics' : 'Apparel',
  price: parseFloat((Math.random() * 200 + 50).toFixed(2)),
  imageUrl: `https://source.unsplash.com/random/400x300?product&sig=${i}`,
  rating: (Math.random() * 2 + 3).toFixed(1), // Rating between 3.0 and 5.0
  reviews: Math.floor(Math.random() * 100) + 10,
}));

const ProductListingPage = () => {
  console.log('ProductListingPage loaded');
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 250]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories(prev =>
      checked ? [...prev, category] : prev.filter(c => c !== category)
    );
  };
  
  // Dummy pagination state
  const currentPage = 1;
  const totalPages = 5;


  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col md:flex-row gap-8">
          <Sidebar title="Filter Products" className="md:w-1/4">
            {/* Category Filter */}
            <div className="space-y-2">
              <h3 className="font-semibold">Category</h3>
              {['Electronics', 'Apparel', 'Books', 'Home Goods'].map(cat => (
                <div key={cat} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cat-${cat}`}
                    checked={selectedCategories.includes(cat)}
                    onCheckedChange={(checked) => handleCategoryChange(cat, !!checked)}
                  />
                  <Label htmlFor={`cat-${cat}`}>{cat}</Label>
                </div>
              ))}
            </div>

            {/* Price Range Filter */}
            <div className="space-y-2 pt-4">
              <h3 className="font-semibold">Price Range</h3>
              <Slider
                defaultValue={[priceRange[0], priceRange[1]]}
                max={500}
                min={0}
                step={10}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                className="py-2"
              />
              <div className="flex justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
            {/* Add more filters like ratings, brands etc. */}
          </Sidebar>

          <div className="md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">All Products</h1>
              <Select defaultValue="featured">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Avg. Customer Review</SelectItem>
                  <SelectItem value="newest">Newest Arrivals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProducts.map(product => (
                <Card key={product.id} className="flex flex-col">
                  <CardHeader className="p-0">
                    <img src={product.imageUrl} alt={product.name} className="rounded-t-lg h-52 w-full object-cover" />
                  </CardHeader>
                  <CardContent className="flex-grow pt-4">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="text-xs text-muted-foreground">{product.category}</CardDescription>
                    <p className="text-lg font-semibold mt-2">${product.price}</p>
                    <div className="flex items-center mt-1">
                        {/* Placeholder for stars */}
                        <span className="text-yellow-500">{'★'.repeat(Math.floor(parseFloat(product.rating)))}</span>
                        <span className="text-gray-400">{'★'.repeat(5 - Math.floor(parseFloat(product.rating)))}</span>
                        <span className="ml-2 text-xs text-muted-foreground">({product.reviews} reviews)</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link to={`/product-detail-page`}>View Product</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Pagination className="mt-12">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" isActive={currentPage > 1} />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i}>
                    <PaginationLink href="#" isActive={currentPage === i + 1}>
                        {i + 1}
                    </PaginationLink>
                    </PaginationItem>
                ))}
                {totalPages > 5 && <PaginationEllipsis />} 
                <PaginationItem>
                  <PaginationNext href="#" isActive={currentPage < totalPages} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductListingPage;