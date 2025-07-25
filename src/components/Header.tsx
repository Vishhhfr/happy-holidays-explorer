
import { useState, useEffect } from "react";
import { Menu, X, User, ShoppingCart, Settings as SettingsIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const totalItems = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
      setCartCount(totalItems);
    };

    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, []);

  const navItems = [
    { name: "Home", href: "/home" },
    { name: "Destinations", href: "/destinations" },
    { name: "Packages", href: "/packages" },
    { name: "About", href: "/about" },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user_authenticated');
    localStorage.removeItem('user_type');
    localStorage.removeItem('cart');
    window.location.href = '/auth';
  };

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg sticky top-0 z-40 border-b border-purple-100 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/home" className="flex items-center space-x-3">
              <Logo size="sm" />
              <span className="font-body text-2xl font-bold bg-gradient-to-r from-purple-600 to-lavender-600 bg-clip-text text-transparent">
                Happy Holidays
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="font-body text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* User, Cart, and Settings Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/settings"
              className="p-2 rounded-full hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <SettingsIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </Link>
            <Link 
              to="/profile"
              className="p-2 rounded-full hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <User className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </Link>
            <Link 
              to="/cart"
              className="p-2 rounded-full hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors duration-200 relative"
            >
              <ShoppingCart className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-lavender-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              onClick={handleLogout}
              className="bg-gradient-to-r from-purple-600 to-lavender-600 hover:from-purple-700 hover:to-lavender-700 text-white font-body px-4 py-2 rounded-lg transition-all duration-200"
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-purple-100 dark:border-gray-700">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="font-body text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 block px-3 py-2 text-base font-medium"
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center space-x-4 px-3 py-2">
                <Link 
                  to="/settings"
                  className="p-2 rounded-full hover:bg-purple-50 dark:hover:bg-gray-700"
                  onClick={toggleMenu}
                >
                  <SettingsIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </Link>
                <Link 
                  to="/profile"
                  className="p-2 rounded-full hover:bg-purple-50 dark:hover:bg-gray-700"
                  onClick={toggleMenu}
                >
                  <User className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </Link>
                <Link 
                  to="/cart"
                  className="p-2 rounded-full hover:bg-purple-50 dark:hover:bg-gray-700 relative"
                  onClick={toggleMenu}
                >
                  <ShoppingCart className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-lavender-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-purple-600 to-lavender-600 text-white font-body px-4 py-2 rounded-lg"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
