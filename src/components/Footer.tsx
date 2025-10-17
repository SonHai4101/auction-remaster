import { IoLogoFacebook, IoLogoInstagram, IoMail } from "react-icons/io5";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { Button } from "./retroui/Button";
import { Card } from "./retroui/Card";

export const Footer = () => {
  return (
    <footer className="bg-[#633c1d] border-t-4 border-[#c9a16c] mt-16">
      <div className="max-w-[1202px] mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {/* <Gavel className="h-6 w-6 text-[#fef5e7]" /> */}
              <img
                className="h-10 w-10"
                src="/icon/retro-logo-transparent-bg.png"
              />
              {/* <div className="bg-[#ffdb33] p-2 border-2 border-[#c9a16c]">
              </div> */}
              <div>
                <h3 className="text-[#fef5e7]">AUCTION HOUSE</h3>
                <p className="text-[#c9a16c] text-xs">EST. 1995</p>
              </div>
            </div>
            <p className="text-[#f4e4cd] text-sm leading-relaxed">
              Your trusted marketplace for authentic vintage treasures and
              antiques since 1995.
            </p>

            <div className="flex gap-3 mt-4">
              <Button className="p-2 border-2 ">
                <IoLogoFacebook className="h-4 w-4" />
              </Button>
              <Button className="p-2 border-2 ">
                <RiTwitterXFill className="h-4 w-4" />
              </Button>
              <Button className="p-2 border-2 ">
                <IoLogoInstagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#fef5e7] mb-4 pb-2 border-b-2 border-dashed border-[#c9a16c]">
              QUICK LINKS
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-[#f4e4cd] hover:text-[#ffdb33] transition-colors text-sm"
                >
                  → About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#f4e4cd] hover:text-[#ffdb33] transition-colors text-sm"
                >
                  → How It Works
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#f4e4cd] hover:text-[#ffdb33] transition-colors text-sm"
                >
                  → Sell Items
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#f4e4cd] hover:text-[#ffdb33] transition-colors text-sm"
                >
                  → FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#f4e4cd] hover:text-[#ffdb33] transition-colors text-sm"
                >
                  → Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[#fef5e7] mb-4 pb-2 border-b-2 border-dashed border-[#c9a16c]">
              CATEGORIES
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-[#f4e4cd] hover:text-[#ffdb33] transition-colors text-sm"
                >
                  → Furniture
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#f4e4cd] hover:text-[#ffdb33] transition-colors text-sm"
                >
                  → Electronics
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#f4e4cd] hover:text-[#ffdb33] transition-colors text-sm"
                >
                  → Photography
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#f4e4cd] hover:text-[#ffdb33] transition-colors text-sm"
                >
                  → Watches & Jewelry
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#f4e4cd] hover:text-[#ffdb33] transition-colors text-sm"
                >
                  → Art & Decor
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[#fef5e7] mb-4 pb-2 border-b-2 border-dashed border-[#c9a16c]">
              CONTACT US
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-[#f4e4cd] text-sm">
                <FaMapMarkerAlt className="h-4 w-4 mt-1 flex-shrink-0 text-[#ffdb33]" />
                <span>123 Vintage Lane, Antique District, NY 10001</span>
              </li>
              <li className="flex items-center gap-2 text-[#f4e4cd] text-sm">
                <FaPhoneAlt className="h-4 w-4 flex-shrink-0 text-[#ffdb33]" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-[#f4e4cd] text-sm">
                <IoMail className="h-4 w-4 flex-shrink-0 text-[#ffdb33]" />
                <span>hello@retroauctions.com</span>
              </li>
            </ul>

            <Card className="mt-4 retro-card bg-[#ffdb33] p-3 border-2 ">
              <p className="text-sm">
                <span className="block mb-1">OPEN HOURS</span>
                Mon-Fri: 9AM - 6PM EST
              </p>
            </Card>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-2 border-dashed border-[#c9a16c]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#f4e4cd] text-sm text-center md:text-left">
              © 1995-2025 Retro Auctions. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a
                href="#"
                className="text-[#f4e4cd] hover:text-[#ffdb33] transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-[#f4e4cd] hover:text-[#ffdb33] transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-[#f4e4cd] hover:text-[#ffdb33] transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
          <p className="text-[#c9a16c] text-xs mt-4 text-center">
            Bringing vintage treasures to collectors worldwide since 1995 🏺
          </p>
        </div>
      </div>
    </footer>
  );
};
