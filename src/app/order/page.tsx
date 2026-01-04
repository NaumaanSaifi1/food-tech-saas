"use client";

import { useState } from "react";
import { INVENTORY, SKU } from "@/lib/data";
import { ArrowLeft, Minus, Plus, ShoppingBag, Search, Star, ChevronDown } from "lucide-react";
import Link from "next/link";
import { NonVegIconStandard, VegIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function OrderPage() {
    const [cart, setCart] = useState<{ item: SKU; qty: number }[]>([]);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("Recommended");

    const categories = ["Recommended", "Burgers", "Bowls", "Beverages", "Desserts"];

    // derived state
    const filteredItems = INVENTORY.filter(item =>
        (activeCategory === "Recommended" || item.category === activeCategory) &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getQty = (itemId: string) => cart.find(x => x.item.id === itemId)?.qty || 0;

    const addToCart = (item: SKU) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.item.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.item.id === item.id ? { ...i, qty: i.qty + 1 } : i
                );
            }
            return [...prev, { item, qty: 1 }];
        });
    };

    const removeFromCart = (itemId: string) => {
        setCart((prev) => prev.filter((i) => i.item.id !== itemId));
    };

    const updateQty = (itemId: string, delta: number) => {
        setCart((prev) => {
            return prev.map((i) => {
                if (i.item.id === itemId) {
                    const newQty = i.qty + delta;
                    if (newQty <= 0) {
                        return { ...i, qty: 0 }; // We will filter it out after
                    }
                    return { ...i, qty: newQty };
                }
                return i;
            }).filter(i => i.qty > 0);
        });
    };

    const total = cart.reduce((acc, curr) => acc + curr.item.price * curr.qty, 0);

    const handleCheckout = () => {
        setOrderPlaced(true);
        setTimeout(() => {
            setCart([]);
            setOrderPlaced(false);
            setIsCheckoutOpen(false);
        }, 3000); // Reset after 3s showing success
    };

    return (
        <div className="min-h-screen bg-background pb-32 md:pb-0">
            {/* Mobile Top Bar */}
            <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-white/5 px-4 py-3 shadow-sm">
                <div className="flex items-center gap-4 mb-3">
                    <Link href="/" className="p-2 rounded-full hover:bg-white/5 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="font-bold text-sm">Pizza Hut</h1>
                        <p className="text-xs text-muted-foreground">Sampige Road • 25 mins</p>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Search className="w-5 h-5" />
                    </Button>
                </div>

                {/* Search & Categories */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-colors border ${activeCategory === cat
                                    ? "bg-foreground text-background border-foreground"
                                    : "bg-white/5 border-white/10 text-muted-foreground hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </header>

            {/* Menu List */}
            <main className="max-w-3xl mx-auto p-4 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-dashed border-white/10">
                    <h2 className="text-lg font-bold tracking-tight">{activeCategory}</h2>
                    <span className="text-xs text-muted-foreground">{filteredItems.length} items</span>
                </div>

                {filteredItems.map((item) => {
                    const qty = getQty(item.id);
                    return (
                        <div key={item.id} className="flex gap-4 justify-between group relative py-6 border-b border-white/5 last:border-0">
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                    {item.isVeg ? <VegIcon /> : <NonVegIconStandard />}
                                    {item.rating > 4.0 && (
                                        <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-500/10 px-1 rounded">
                                            <Star className="w-2.5 h-2.5 fill-amber-500" />
                                            {item.rating}
                                        </span>
                                    )}
                                </div>
                                <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">{item.name}</h3>
                                <p className="text-sm font-medium text-foreground">${item.price.toFixed(2)}</p>
                                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{item.description}</p>
                            </div>

                            <div className="relative w-32 flex flex-col items-center">
                                <div className="w-32 h-28 rounded-xl bg-white/5 overflow-hidden">
                                    {item.image && (
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    )}
                                </div>
                                {/* Add Button - Offset overlapping image */}
                                <div className="absolute -bottom-2 w-24 shadow-xl">
                                    {qty === 0 ? (
                                        <button
                                            onClick={() => addToCart(item)}
                                            disabled={item.status === 'Out of Stock'}
                                            className="w-full bg-white text-green-600 font-bold text-sm py-2 rounded-lg border border-white/10 hover:bg-gray-100 uppercase transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {item.status === 'Out of Stock' ? 'Sold Out' : 'ADD'}
                                        </button>
                                    ) : (
                                        <div className="w-full bg-white text-green-600 font-bold text-sm py-2 rounded-lg border border-white/10 flex items-center justify-between px-3">
                                            <button onClick={() => updateQty(item.id, -1)}><Minus className="w-3 h-3" /></button>
                                            <span>{qty}</span>
                                            <button onClick={() => updateQty(item.id, 1)}><Plus className="w-3 h-3" /></button>
                                        </div>
                                    )}
                                </div>
                                {/* Customizable Tag */}
                                <span className="text-[10px] text-muted-foreground mt-4 font-medium">Customisable</span>
                            </div>
                        </div>
                    );
                })}
                {filteredItems.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        <p>No items found in this category.</p>
                    </div>
                )}
            </main>

            {/* Cart Float (Bottom Bar) */}
            {cart.length > 0 && !isCheckoutOpen && (
                <div className="fixed bottom-4 left-4 right-4 z-30 max-w-3xl mx-auto">
                    <button
                        onClick={() => setIsCheckoutOpen(true)}
                        className="w-full bg-green-600 text-white p-4 rounded-xl shadow-2xl flex items-center justify-between hover:bg-green-700 transition-colors"
                    >
                        <div className="flex flex-col items-start">
                            <span className="font-bold text-sm">{cart.reduce((a, c) => a + c.qty, 0)} items | ${total.toFixed(2)}</span>
                            <span className="text-xs opacity-90">Extra charges may apply</span>
                        </div>
                        <div className="flex items-center gap-2 font-bold text-sm">
                            View Cart <ShoppingBag className="w-4 h-4 ml-1" />
                        </div>
                    </button>
                </div>
            )}

            {/* Checkout Sheet (Simple Overlay) */}
            {isCheckoutOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-end md:items-center p-4">
                    <div className="bg-background w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden max-h-[80vh] flex flex-col">
                        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-card/50">
                            <h2 className="font-bold text-lg">My Cart</h2>
                            <button onClick={() => setIsCheckoutOpen(false)} className="p-2 rounded-full hover:bg-white/10"><ChevronDown className="w-5 h-5" /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {orderPlaced ? (
                                <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-300">
                                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                                        <span className="text-2xl">✓</span>
                                    </div>
                                    <h3 className="text-xl font-bold">Order Confirmed!</h3>
                                    <p className="text-muted-foreground">Prepare your tastebuds 😋</p>
                                </div>
                            ) : (
                                cart.map((line) => (
                                    <div key={line.item.id} className="flex items-start justify-between">
                                        <div className="flex gap-2">
                                            <div className="mt-1">{line.item.isVeg ? <VegIcon /> : <NonVegIconStandard />}</div>
                                            <div>
                                                <p className="font-medium text-sm">{line.item.name}</p>
                                                <p className="text-xs text-muted-foreground">${line.item.price}</p>
                                            </div>
                                        </div>
                                        <div className="w-20 bg-white/5 border border-white/10 rounded-md flex items-center justify-between px-2 py-1 h-8">
                                            <button onClick={() => updateQty(line.item.id, -1)} className="text-green-500"><Minus className="w-3 h-3" /></button>
                                            <span className="text-sm font-medium">{line.qty}</span>
                                            <button onClick={() => updateQty(line.item.id, 1)} className="text-green-500"><Plus className="w-3 h-3" /></button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {!orderPlaced && (
                            <div className="p-4 bg-card/50 border-t border-white/5 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Item Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-base font-bold">
                                    <span>To Pay</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <Button onClick={handleCheckout} size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-12">
                                    Place Order
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
