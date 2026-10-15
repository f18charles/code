"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AlbumPhoto } from "@/lib/types";

interface LightboxProps {
  photos: AlbumPhoto[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  const currentPhoto = photos[currentIndex];
  const hasMultiple = photos.length > 1;

  // Save active element when opened, restore when closed
  useEffect(() => {
    if (isOpen) {
      triggerElementRef.current = document.activeElement as HTMLElement;
      closeButtonRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      triggerElementRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard navigation & trap focus
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
        onNavigate(prevIndex);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % photos.length;
        onNavigate(nextIndex);
      } else if (e.key === "Tab") {
        // Simple focus trap inside lightbox
        if (!overlayRef.current) return;
        const focusables = overlayRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, photos.length, onClose, onNavigate]);

  if (!isOpen || !currentPhoto) return null;

  const imageUrl =
    currentPhoto.url ||
    "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1600&q=85";

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo lightbox"
      className="fixed inset-0 z-50 flex flex-col justify-between p-4 md:p-8 bg-[#1E1510]/95 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Top Header: Count & Close */}
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto z-10 text-white">
        <span className="text-sm font-medium tracking-wide bg-black/40 px-3 py-1.5 rounded-full">
          Photo {currentIndex + 1} of {photos.length}
        </span>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close photo lightbox"
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white focus-visible:outline-3 focus-visible:outline-primary min-w-[48px] min-h-[48px] flex items-center justify-center cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Center: Image & Nav Buttons */}
      <div className="relative flex-1 w-full max-w-6xl mx-auto flex items-center justify-center my-4 overflow-hidden">
        {hasMultiple && (
          <button
            type="button"
            onClick={() =>
              onNavigate((currentIndex - 1 + photos.length) % photos.length)
            }
            aria-label="Previous photo"
            className="absolute left-2 md:left-4 z-20 p-3 rounded-full bg-black/50 hover:bg-black/75 text-white transition-colors focus-visible:outline-3 focus-visible:outline-primary min-w-[48px] min-h-[48px] flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
        )}

        <div className="relative w-full h-full max-h-[75vh]">
          <Image
            src={imageUrl}
            alt={currentPhoto.alt || "Gallery photo"}
            fill
            sizes="90vw"
            priority
            className="object-contain"
          />
        </div>

        {hasMultiple && (
          <button
            type="button"
            onClick={() => onNavigate((currentIndex + 1) % photos.length)}
            aria-label="Next photo"
            className="absolute right-2 md:right-4 z-20 p-3 rounded-full bg-black/50 hover:bg-black/75 text-white transition-colors focus-visible:outline-3 focus-visible:outline-primary min-w-[48px] min-h-[48px] flex items-center justify-center cursor-pointer"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        )}
      </div>

      {/* Bottom: Caption & Alt Text */}
      <div className="w-full max-w-2xl mx-auto text-center z-10">
        {currentPhoto.caption && (
          <p className="text-white text-base md:text-lg font-serif mb-1">
            {currentPhoto.caption}
          </p>
        )}
        <p className="text-white/70 text-xs md:text-sm">
          {currentPhoto.alt}
        </p>
      </div>
    </div>
  );
}
