import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white flex flex-col items-center py-16 px-4 md:px-8">

            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3 tracking-tight">
                    Get in <span className="text-blue-600">Touch</span>
                </h1>
                <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base">
                    Have questions or need assistance? We’re here to help.
                    Reach out to <span className="font-medium text-gray-800">Boss Motors</span> anytime.
                </p>
            </motion.div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
                {[
                    {
                        icon: <Mail size={42} className="text-blue-600" />,
                        title: "Email",
                        content: (
                            <a
                                href="mailto:Bossmotors1022@gmail.com"
                                className="text-blue-600 hover:underline text-sm md:text-base"
                            >
                                Bossmotors1022@gmail.com
                            </a>
                        ),
                    },
                    {
                        icon: <Phone size={42} className="text-blue-600" />,
                        title: "Phone",
                        content: (
                            <div className="flex flex-col space-y-1">
                                <a href="tel:+918610406798" className="hover:text-blue-600 transition text-sm md:text-base">
                                    +91 86104 06798
                                </a>
                                <a href="tel:+918508520806" className="hover:text-blue-600 transition text-sm md:text-base">
                                    +91 85085 20806
                                </a>
                            </div>
                        ),
                    },
                    {
                        icon: <MapPin size={42} className="text-blue-600" />,
                        title: "Address",
                        content: (
                            <>
                                <p className="text-gray-700 text-sm md:text-base">
                                    84/4, M.N Patty, Abibraminagar, <br /> Dindigul – 624001
                                </p>
                                <a
                                    href="https://maps.app.goo.gl/jSFLJcKajnejtgkDA?g_st=ipc"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 text-sm mt-1 hover:underline inline-block"
                                >
                                    View on Google Maps
                                </a>
                            </>
                        ),
                    },
                ].map((card, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 + i * 0.1 }}
                        className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center text-center"
                    >
                        <div className="bg-blue-100 p-4 rounded-full mb-4">{card.icon}</div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {card.title}
                        </h3>
                        <div className="text-gray-600">{card.content}</div>
                    </motion.div>
                ))}
            </div>


            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="mt-16 w-full max-w-5xl"
            >
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Visit Our <span className="text-blue-600">Store Location</span>
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                        Come by and meet us in person — we’d love to see you.
                    </p>
                </div>

                <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:scale-[1.01] transition-transform duration-300">
                    <iframe
                        src="https://www.google.com/maps?q=84/4,+M.N+PATTY,+ABIBRAMINAGAR,+Dindigul,+624001&output=embed"
                        width="100%"
                        height="400"
                        allowFullScreen
                        loading="lazy"
                        className="rounded-3xl border-0"
                        title="Boss Motors Location"
                    ></iframe>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
