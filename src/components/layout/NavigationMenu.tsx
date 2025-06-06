import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // For mobile menu
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react';

const NavigationMenu: React.FC = () => {
  console.log("Rendering NavigationMenu");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0); // Example cart count

  // Placeholder for navigation links
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand Name */}
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
            {/* <Package2 className="h-6 w-6" /> Replace with your logo component or SVG */}
            <span className="font-bold text-xl">MyApp</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search, Cart, Account - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search products..." className="pl-8 sm:w-[200px] md:w-[200px] lg:w-[300px]" />
            </div>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {cartItemCount}
                  </span>
                )}
                <span className="sr-only">Open cart</span>
              </Button>
            </Link>
            <Link to="/account">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </Link>
            {/* <Button>Login</Button> */}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs sm:max-w-sm">
                <div className="flex justify-between items-center mb-6">
                  <Link to="/" className="flex items-center gap-2 text-lg font-semibold" onClick={() => setIsMobileMenuOpen(false)}>
                     <span className="font-bold text-xl">MyApp</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="grid gap-4 text-lg font-medium">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-6 border-t pt-6">
                  <div className="relative mb-4">
                     <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                     <Input type="search" placeholder="Search products..." className="pl-8 w-full" />
                  </div>
                  <Link to="/cart" className="flex items-center gap-2 mb-2 text-muted-foreground hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                    <ShoppingCart className="h-5 w-5" /> Cart {cartItemCount > 0 && `(${cartItemCount})`}
                  </Link>
                  <Link to="/account" className="flex items-center gap-2 text-muted-foreground hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                    <User className="h-5 w-5" /> Account
                  </Link>
                  {/* <Button className="w-full mt-4">Login</Button> */}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
export default NavigationMenu;