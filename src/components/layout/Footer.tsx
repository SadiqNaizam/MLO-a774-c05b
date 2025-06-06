import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  console.log("Rendering Footer");
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
  ];

  const socialLinks = [
    { href: "#", icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
    { href: "#", icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
    { href: "#", icon: <Github className="h-5 w-5" />, label: "GitHub" },
  ];

  return (
    <footer className="bg-muted text-muted-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">MyApp</h3>
            <p className="text-sm">
              Your one-stop shop for amazing products. We are committed to quality and customer satisfaction.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold text-foreground mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold text-foreground mb-3">Legal</h4>
             <ul className="space-y-2">
                <li><Link to="/terms" className="text-sm hover:text-primary transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/privacy" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/shipping" className="text-sm hover:text-primary transition-colors">Shipping & Returns</Link></li>
             </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold text-foreground mb-3">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="hover:text-primary transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <h4 className="text-md font-semibold text-foreground mt-6 mb-3">Newsletter</h4>
            <p className="text-sm mb-2">Stay updated with our latest offers.</p>
            {/* Placeholder for a newsletter signup form */}
            {/* <Input type="email" placeholder="Enter your email" /> <Button>Subscribe</Button> */}
          </div>
        </div>
        <div className="border-t pt-8 text-center text-sm">
          <p>&copy; {currentYear} MyApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;