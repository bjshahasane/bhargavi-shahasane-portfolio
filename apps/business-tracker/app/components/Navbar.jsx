'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { name: 'Dashboard', href: '/pages/dashboard' },
  { name: 'Products', href: '/pages/productCatalogue' },
  { name: 'Orders', href: '/pages/orders' },
  { name: 'Products to Make', href: '/pages/productsToMake' },
  { name: 'Expenses', href: '/pages/expenses' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" href="/">
          My App
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Menu */}
        <div className={`collapse navbar-collapse ${open ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            {navLinks.map((link) => (
              <li key={link.href} className="nav-item">
                <Link
                  onClick={() => setOpen(false)} // close after click
                  className={`nav-link ${
                    pathname === link.href
                      ? 'active fw-semibold text-primary'
                      : ''
                  }`}
                  href={link.href}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;