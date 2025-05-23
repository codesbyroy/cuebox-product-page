import { useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Props interface for image viewer configuration
interface ImageViewerProps {
    isOpen: boolean;
    onClose: () => void;
    imageSrc: string;
    imageAlt: string;
}

// Animation variants for better reusability
const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.15, ease: "easeIn" } },
};

const imageVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
    exit: { scale: 0.95, opacity: 0, transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } },
};

// Modal component for displaying enlarged images with animations
const ImageViewer = memo(
    ({ isOpen, onClose, imageSrc, imageAlt }: ImageViewerProps) => {
        // Close on escape key press
        useEffect(() => {
            if (!isOpen) return;

            const handleEsc = (event: KeyboardEvent) => {
                if (event.key === "Escape") onClose();
            };

            window.addEventListener("keydown", handleEsc);
            return () => window.removeEventListener("keydown", handleEsc);
        }, [isOpen, onClose]);

        // Handle image click to prevent closing
        const handleImageClick = (e: React.MouseEvent) => {
            e.stopPropagation();
        };

        return (
            // Animated modal overlay
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        onClick={onClose}
                    >
                        {/* Animated image container */}
                        <motion.img
                            src={imageSrc}
                            alt={imageAlt}
                            variants={imageVariants}
                            className="max-h-[80vh] rounded-lg object-contain"
                            layoutId={`image-${imageSrc}`}
                            onClick={handleImageClick}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        );
    },
);

ImageViewer.displayName = "ImageViewer";

export default ImageViewer;
