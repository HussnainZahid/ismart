"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
// Temporarily comment out BackToTop until implemented
// import BackToTop from "../elements/BackToTop";
import Breadcrumb from "./Breadcrumb";
import Footer from "./footer/footer"; // Adjusted to lowercase
import Header from "./header/header"; // Adjusted to lowercase

interface LayoutProps {
  headerStyle?: number;
  footerStyle?: number;
  breadcrumbTitle?: string;
  children?: React.ReactNode;
}

export default function Layout({
  headerStyle = 1,
  footerStyle = 1,
  breadcrumbTitle,
  children,
}: LayoutProps) {
  const [scroll, setScroll] = useState<boolean>(false);
  const [isMobileMenu, setMobileMenu] = useState<boolean>(false);
  const [isSearch, setSearch] = useState<boolean>(false);
  const [isOffCanvas, setOffCanvas] = useState<boolean>(false);

  const handleMobileMenu = (): void => {
    setMobileMenu(!isMobileMenu);
    document.body.classList.toggle("mobile-menu-active", !isMobileMenu);
  };

  const handleSearch = (): void => setSearch(!isSearch);

  const handleOffCanvas = (): void => setOffCanvas(!isOffCanvas);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    const handleScroll = (): void => {
      setScroll(window.scrollY > 100);
    };

    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div id="top" />

      {/* Header */}
      {headerStyle && (
        <Header
          
          
          
          
          
        
        />
      )}

      {/* Main Content */}
      <main className="min-h-screen bg-gray-50">
        {breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}
        <div className="container mx-auto px-4 py-6">{children}</div>
      </main>

      {/* Footer */}
      {(!footerStyle || footerStyle === 1) && <Footer />}

      {/* Temporarily comment out BackToTop until implemented */}
      {/* <BackToTop target="#top" className="bg-primary-600 hover:bg-primary-700 text-white" /> */}
    </>
  );
}