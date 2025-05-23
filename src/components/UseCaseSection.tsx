import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaLaptopCode,
    FaGraduationCap,
    FaBriefcase,
    FaFlask,
    FaPencilAlt,
    FaLanguage,
    FaChevronCircleDown,
    FaChevronCircleUp,
} from "react-icons/fa";
import AnimatedText from "./AnimatedText";
import { useCaseContent } from "@/content";
import { useIsMobile } from "@/hooks/use-mobile";

// Props interface for individual use case cards
interface UseCaseProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    examples: string[];
    delay: number;
    isMobile: boolean;
}

// Individual use case card component with animations
const UseCase: React.FC<UseCaseProps> = ({
    icon,
    title,
    description,
    examples,
    delay,
    isMobile,
}) => {
    const [showExamples, setShowExamples] = useState(false);
    
    return (
        // Animated card container with hover effects
        <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all flex flex-col items-center text-center overflow-hidden"
            initial={isMobile 
                ? { opacity: 0, scale: 0.92, x: 0 } 
                : { opacity: 0, y: 20 }
            }
            whileInView={isMobile 
                ? { opacity: 1, scale: 1, x: 0 } 
                : { opacity: 1, y: 0 }
            }
            transition={{ 
                duration: isMobile ? 0.4 : 0.5, 
                ease: "easeOut", 
                delay: isMobile ? delay * 0.8 : delay 
            }}
            viewport={{ once: true, margin: "-50px" }}
        >
            {/* Icon container with gradient background */}
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-4 relative">
                <span className="text-2xl text-white">{icon}</span>
            </div>
            
            {/* Use case title and description */}
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
                {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
                {description}
            </p>
            
            {/* Example prompts with staggered animations */}
            <div className="w-full space-y-3 mt-2">
                <div className="relative flex items-center justify-center mb-4">
                    <div className="h-px w-1/3 mx-auto bg-gradient-to-r from-transparent via-indigo-300 dark:via-indigo-700 to-transparent"></div>
                    {isMobile && (
                        <button 
                            onClick={() => setShowExamples(!showExamples)}
                            className="absolute bg-white dark:bg-gray-800 p-1 rounded-full text-indigo-500 dark:text-indigo-300 text-lg cursor-pointer hover:scale-110 transition-transform"
                            aria-label={showExamples ? "Hide Examples" : "Show Examples"}
                        >
                            {showExamples ? <FaChevronCircleUp /> : <FaChevronCircleDown />}
                        </button>
                    )}
                </div>
                
                {isMobile ? (
                    <> 
                        <div className="overflow-hidden">
                            <AnimatePresence>
                                {showExamples && (
                                    <motion.div 
                                        className="space-y-3 mt-3"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        {examples.map((example, index) => (
                                            <motion.div
                                                key={index}
                                                className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-sm text-gray-700 dark:text-gray-300 text-left border-l-2 border-indigo-300 dark:border-indigo-700"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{
                                                    duration: 0.3,
                                                    delay: 0.05 * (index + 1),
                                                }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                            >
                                                {example}
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </>
                ) : (
                    <>
                        {examples.map((example, index) => (
                            <motion.div
                                key={index}
                                className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-sm text-gray-700 dark:text-gray-300 text-left border-l-2 border-indigo-300 dark:border-indigo-700"
                                initial={{ opacity: 0, x: index % 2 === 0 ? -10 : 10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.15,
                                    ease: "easeOut",
                                    delay: 0.1 + index * 0.05,
                                }}
                                viewport={{ once: true }}
                                whileHover={{
                                    borderLeftWidth: "5px",
                                    transition: { duration: 0.2 },
                                }}
                            >
                                {example}
                            </motion.div>
                        ))}
                    </>
                )}
            </div>
        </motion.div>
    );
};

const UseCaseSection: React.FC = () => {
    // Map icons to use case titles for consistent representation
    const getIconForUseCase = (title: string) => {
        switch (title) {
            case "Software Development":
                return <FaLaptopCode />;
            case "Academic Research":
                return <FaGraduationCap />;
            case "Business Communication":
                return <FaBriefcase />;
            case "Creative Experimentation":
                return <FaFlask />;
            case "Content Creation":
                return <FaPencilAlt />;
            case "Language Learning":
                return <FaLanguage />;
            default:
                return <FaLaptopCode />;
        }
    };
    
    // Use the existing mobile hook
    const isMobile = useIsMobile();

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900 mt-8">
            <div className="container mx-auto px-4">
                {/* Section header with animated title */}
                <div className="text-center mb-12">
                    <AnimatedText
                        text={useCaseContent.title}
                        className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 inline-block mx-auto"
                    />
                    <motion.p
                        className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {useCaseContent.description}
                    </motion.p>
                </div>

                {/* Grid of use case cards with staggered animations */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
                    initial={isMobile 
                        ? { opacity: 0, scale: 0.9 } 
                        : { opacity: 0 }
                    }
                    whileInView={isMobile 
                        ? { opacity: 1, scale: 1 } 
                        : { opacity: 1 }
                    }
                    transition={{ 
                        staggerChildren: 0.1,
                        duration: isMobile ? 0.4 : 0.3,
                        ease: isMobile ? "easeOut" : "easeInOut"
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {useCaseContent.useCases.map((useCase, index) => (
                        <UseCase
                            key={index}
                            icon={getIconForUseCase(useCase.title)}
                            title={useCase.title}
                            description={useCase.description}
                            examples={useCase.examples}
                            delay={0.05 + index * 0.07}
                            isMobile={isMobile}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default UseCaseSection;
