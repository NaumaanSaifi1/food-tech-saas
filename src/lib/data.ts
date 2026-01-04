import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

export type SKU = {
    id: string;
    name: string;
    category: "Recommended" | "Burgers" | "Bowls" | "Beverages" | "Desserts";
    price: number;
    description: string;
    isVeg: boolean;
    rating: number;
    votes: number;
    image?: string;
    stock: number;
    dailyDemand: number[];
    status: "In Stock" | "Low Stock" | "Out of Stock";
};

export const INVENTORY: SKU[] = [
    {
        id: "1",
        name: "Truffle Mushroom Burger",
        category: "Burgers",
        price: 14.99,
        description: "Brioche bun, swiss cheese, truffle mayo, caramelized onions.",
        isVeg: false,
        rating: 4.5,
        votes: 120,
        stock: 45,
        dailyDemand: [10, 15, 20, 25, 40, 35, 45],
        status: "In Stock",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80"
    },
    {
        id: "2",
        name: "Spicy Szechuan Noodles",
        category: "Bowls",
        price: 12.50,
        description: "Wok-tossed noodles with house special chili oil and peanuts.",
        isVeg: true,
        rating: 4.2,
        votes: 85,
        stock: 12,
        dailyDemand: [5, 8, 12, 10, 15, 20, 18],
        status: "Low Stock",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&q=80"
    },
    {
        id: "3",
        name: "Crispy Calamari",
        category: "Recommended",
        price: 9.00,
        description: "Golden fried squid rings served with tartare sauce.",
        isVeg: false,
        rating: 4.8,
        votes: 210,
        stock: 0,
        dailyDemand: [8, 12, 10, 14, 5, 2, 0],
        status: "Out of Stock",
        image: "https://images.unsplash.com/photo-1599321955726-e04842d994e7?w=400&q=80"
    },
    {
        id: "4",
        name: "Artisan Iced Coffee",
        category: "Beverages",
        price: 5.50,
        description: "Cold brew with a splash of oat milk and vanilla syrup.",
        isVeg: true,
        rating: 4.9,
        votes: 500,
        stock: 100,
        dailyDemand: [30, 45, 55, 60, 50, 65, 80],
        status: "In Stock",
        image: "https://images.unsplash.com/photo-1517701604599-bb29b5c5090c?w=400&q=80"
    },
    {
        id: "5",
        name: "Matcha Cheesecake",
        category: "Desserts",
        price: 7.50,
        description: "Creamy matcha infused cheesecake with a cookie crust.",
        isVeg: true,
        rating: 4.6,
        votes: 92,
        stock: 20,
        dailyDemand: [5, 5, 8, 12, 15, 18, 20],
        status: "In Stock",
        image: "https://images.unsplash.com/photo-1508737804141-4c3b688e2546?w=400&q=80"
    },
    {
        id: "6",
        name: "Paneer Butter Masala Bowl",
        category: "Bowls",
        price: 13.99,
        description: "Soft paneer cubes in rich tomato gravy served with jeera rice.",
        isVeg: true,
        rating: 4.3,
        votes: 156,
        stock: 30,
        dailyDemand: [15, 20, 25, 30, 35, 40, 45],
        status: "In Stock",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80"
    }
];

export const METRICS = [
    { label: "Total Revenue", value: "$12,450", change: "+15%", trend: "up" },
    { label: "Orders Today", value: "145", change: "+8%", trend: "up" },
    { label: "Wastage Saved", value: "24kg", change: "-12%", trend: "down" },
    { label: "Avg Wait Time", value: "4m 12s", change: "-30s", trend: "down" },
];

export type Order = {
    id: string;
    customer: string;
    items: string[];
    total: number;
    status: "Pending" | "Preparing" | "Ready" | "Completed";
    time: string;
};

export const RECENT_ORDERS: Order[] = [
    { id: "ORD-001", customer: "Alice M.", items: ["Truffle Burger", "Iced Coffee"], total: 20.49, status: "Preparing", time: "2 mins ago" },
    { id: "ORD-002", customer: "Bob D.", items: ["Spicy Noodles"], total: 12.50, status: "Ready", time: "5 mins ago" },
    { id: "ORD-003", customer: "Charlie", items: ["Matcha Cheesecake", "Iced Coffee"], total: 13.00, status: "Completed", time: "12 mins ago" },
];
