import Link from "next/link";
import React from "react";
import { BarChart3, Box, Home, LayoutDashboard, LogOut, Settings, ShoppingBag } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-background text-foreground">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 hidden md:flex flex-col glass">
                <div className="h-16 flex items-center px-6 border-b border-white/10">
                    <Link href="/" className="font-bold text-xl tracking-tight text-gradient-primary">
                        FoodOS
                    </Link>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <NavItem href="/dashboard" icon={<LayoutDashboard />} label="Overview" active />
                    <NavItem href="/dashboard/inventory" icon={<Box />} label="Inventory" />
                    <NavItem href="/dashboard/orders" icon={<ShoppingBag />} label="Orders" />
                    <NavItem href="/dashboard/analytics" icon={<BarChart3 />} label="Analytics" />
                    <NavItem href="/dashboard/settings" icon={<Settings />} label="Settings" />
                </nav>
                <div className="p-4 border-t border-white/10">
                    <Link href="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors">
                        <LogOut className="w-4 h-4" />
                        Logout
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

function NavItem({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${active
                ? "bg-primary/20 text-primary border border-primary/20"
                : "text-muted-foreground hover:text-white hover:bg-white/5"
                }`}
        >
            {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-4 h-4" })}
            {label}
        </Link>
    );
}

