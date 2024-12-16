const products = [
    {
        title: "E-commerce Website",
        client: "Fashion Hub",
        status: "done",
        description: "A fully responsive e-commerce platform for selling fashion products.",
        link: "https://fashionhub.com",
        technologies: ["MongoDB", "Express", "React", "Node.js"]
    },
    {
        title: "Mobile Banking App",
        client: "BankCorp",
        status: "active",
        description: "A secure mobile application for online banking services.",
        link: "https://bankcorp.com/app",
        technologies: ["Flutter", "Firebase", "REST API"]
    },
    {
        title: "Portfolio Website",
        client: "John Doe",
        status: "done",
        description: "A personal portfolio website showcasing projects and skills.",
        link: "https://johndoe.com",
        technologies: ["HTML", "CSS", "JavaScript"]
    },
    {
        title: "Restaurant Management System",
        client: "DineWell",
        status: "active",
        description: "A comprehensive management system for restaurant operations.",
        link: "https://dinewell.com/system",
        technologies: ["Node.js", "Express", "PostgreSQL"]
    },
    {
        title: "Blog Platform",
        client: "Techie",
        status: "done",
        description: "A modern blogging platform for tech enthusiasts.",
        link: "https://techieblog.com",
        technologies: ["GraphQL", "React", "Node.js"]
    },
    {
        title: "Social Media App",
        client: "ConnectUs",
        status: "in-progress",
        description: "A social networking application connecting users around the world.",
        link: "https://connectus.com",
        technologies: ["React Native", "Node.js", "Socket.IO"]
    },
    {
        title: "Inventory Management System",
        client: "SupplyChain Co.",
        status: "done",
        description: "An efficient inventory management system for businesses.",
        link: "https://supplychain.com/inventory",
        technologies: ["Node.js", "Express", "MongoDB"]
    },
    {
        title: "Online Learning Platform",
        client: "EduTech",
        status: "active",
        description: "An interactive platform for online courses and learning.",
        link: "https://edutech.com/courses",
        technologies: ["AI/ML", "Django", "React"]
    },
    {
        title: "Fitness Tracker App",
        client: "FitLife",
        status: "done",
        description: "A mobile app to track fitness activities and goals.",
        link: "https://fitlife.com/app",
        technologies: ["Flutter", "Firebase"]
    },
    {
        title: "Home Automation System",
        client: "SmartHome Inc.",
        status: "active",
        description: "An automation system for smart home devices.",
        link: "https://smarthome.com",
        technologies: ["GHL Automation", "IoT", "React"]
    }
];

export const productService = {
    getProductsSmall: () => Promise.resolve(products)
};