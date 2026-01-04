"use client";

import { METRICS as M, INVENTORY as I, RECENT_ORDERS as O } from "@/lib/data";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const chartData = [
    { time: "10am", value: 30 },
    { time: "11am", value: 45 },
    { time: "12pm", value: 80 },
    { time: "1pm", value: 95 },
    { time: "2pm", value: 60 },
    { time: "3pm", value: 40 },
    { time: "4pm", value: 55 },
];

export default function DashboardPage() {
    return (
        <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
                    <p className="text-muted-foreground">Real-time overview of your outlet's performance.</p>
                </div>
                <div className="flex gap-2">
                    <Badge variant="success" className="px-3 py-1 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse mr-2" />
                        Live Service
                    </Badge>
                    <Button variant="outline">Export Data</Button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {M.map((metric, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {metric.label}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{metric.value}</div>
                            <p className={`text-xs flex items-center mt-1 ${metric.trend === "up" ? "text-green-500" : "text-red-500"
                                }`}>
                                {metric.trend === "up" ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                                {metric.change}
                                <span className="text-muted-foreground ml-1">from yesterday</span>
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Live Demand Forecast</CardTitle>
                        <CardDescription>Projected order volume for the next 4 hours based on AI models.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis
                                        dataKey="time"
                                        stroke="#888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={10}
                                    />
                                    <YAxis
                                        stroke="#888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `${value}`}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: "#0f0f11", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }}
                                        itemStyle={{ color: "#fff" }}
                                        cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="hsl(25, 95%, 53%)"
                                        fillOpacity={1}
                                        fill="url(#colorValue)"
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Orders */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>Latest transactions from POS and App.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {O.map((order) => (
                            <div key={order.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-foreground">
                                        {order.customer.charAt(0)}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none text-foreground">{order.customer}</p>
                                        <p className="text-xs text-muted-foreground">{order.items.length} items • {order.time}</p>
                                    </div>
                                </div>
                                <div className="text-right space-y-1">
                                    <p className="text-sm font-bold">${order.total}</p>
                                    <Badge variant={order.status === "Ready" ? "success" : order.status === "Preparing" ? "warning" : "secondary"}>
                                        {order.status}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                        <Button variant="ghost" className="w-full text-muted-foreground hover:text-primary">
                            View All Orders
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Inventory Highlight */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Inventory Alerts</CardTitle>
                        <CardDescription>Items requiring immediate attention.</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">Manage Stock</Button>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm text-left">
                            <thead className="[&_tr]:border-b [&_tr]:border-white/5">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-10 px-4 align-middle font-medium text-muted-foreground">Item Name</th>
                                    <th className="h-10 px-4 align-middle font-medium text-muted-foreground">Category</th>
                                    <th className="h-10 px-4 align-middle font-medium text-muted-foreground">Status</th>
                                    <th className="h-10 px-4 align-middle font-medium text-muted-foreground text-right">Stock Level</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {I.filter(item => item.status !== "In Stock").map((item) => (
                                    <tr key={item.id} className="border-b border-white/5 transition-colors hover:bg-muted/50">
                                        <td className="p-4 align-middle font-medium text-foreground">{item.name}</td>
                                        <td className="p-4 align-middle text-muted-foreground">{item.category}</td>
                                        <td className="p-4 align-middle">
                                            <Badge variant={item.status === 'Out of Stock' ? 'destructive' : 'warning'}>
                                                {item.status}
                                            </Badge>
                                        </td>
                                        <td className="p-4 align-middle text-right text-muted-foreground font-mono">{item.stock} units</td>
                                    </tr>
                                ))}
                                {I.filter(item => item.status !== "In Stock").length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-muted-foreground">All items fully stocked.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
