"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Cpu } from "lucide-react";
import { toast } from "sonner";

export default function Machines() {
  const machines = [
    {
      name: "GoldShell KD 6 II",
      price: "$50",
      profit: "$9.21/month",
      hashrate: "7.3 TH/s",
      power: "2630W",
      roi: "5.4 months",
      profitRate: "18.4%",
      image: "https://ecominex.net/_next/image/?url=https%3A%2F%2Fres.cloudinary.com%2Fdt1tch0v9%2Fimage%2Fupload%2Fv1741967524%2Fmining-machines%2Fiybjgfixblvx0iuegehu.jpg&w=1920&q=75"
    },
    {
      name: "Bitmain Antminer L7",
      price: "$13,500",
      profit: "$1,050/month",
      hashrate: "9.5 GH/s",
      power: "3425W",
      roi: "12.9 months",
      profitRate: "7.8%",
      image: "https://ecominex.net/_next/image/?url=https%3A%2F%2Fres.cloudinary.com%2Fdt1tch0v9%2Fimage%2Fupload%2Fv1736678863%2Fmining-machines%2Fbjutswpgezygslgc1mol.png&w=1920&q=75"
    }
  ];

  const myMachines = [
    { name: "Bitcoin Miner S19 Pro", status: "Active", earnings: "$1,250", purchased: "Oct 15, 2025", purchasePrice: "$2,500" },
    { name: "Ethereum Miner RTX 4090", status: "Active", earnings: "$890", purchased: "Oct 20, 2025", purchasePrice: "$1,800" },
    { name: "Litecoin Miner L7", status: "Maintenance", earnings: "$1,120", purchased: "Nov 1, 2025", purchasePrice: "$3,200" },
  ];

  return (
    <div className="space-y-6 p-6 min-h-screen" style={{ backgroundColor: "#0b0e13" }}>
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Mining Machines</h2>
        <p className="text-slate-400">Purchase machines or manage your investments (10% fee on sales)</p>
      </div>

      <Tabs defaultValue="marketplace" className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-2 bg-slate-800/50 border border-slate-700">
          <TabsTrigger
            value="marketplace"
            className="data-[state=active]:bg-green-600/20 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-green-600 text-slate-400"
          >
            Marketplace
          </TabsTrigger>
          <TabsTrigger
            value="my-machines"
            className="data-[state=active]:bg-green-600/20 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-green-600 text-slate-400"
          >
            My Machines
          </TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {machines.map((machine, i) => (
              <Card key={i} className="bg-slate-800/50 border-slate-700 shadow-lg overflow-hidden">
                <div className="h-48 overflow-hidden bg-white">
                  <img
                    src={machine.image}
                    alt={machine.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-start justify-between text-white">
                    <span>{machine.name}</span>
                    <span className="text-xl font-bold text-green-500">{machine.price}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Hash Rate:</span>
                        <span className="font-medium text-white">{machine.hashrate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Power:</span>
                        <span className="font-medium text-white">{machine.power}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">ROI:</span>
                        <span className="font-medium text-white">{machine.roi}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Profit Rate:</span>
                        <span className="font-medium text-green-500">{machine.profitRate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Est. Profit:</span>
                        <span className="font-medium text-green-500">{machine.profit}</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-green-700 hover:bg-green-800 text-white">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Purchase Machine
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-machines" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Your Mining Machines</CardTitle>
              <CardDescription className="text-slate-400">Manage your invested machines (10% deduction fee when sold)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {myMachines.map((machine, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 border border-slate-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-green-600 flex items-center justify-center">
                        <Cpu className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{machine.name}</p>
                        <p className="text-sm text-slate-400">Purchased: {machine.purchased}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-bold text-green-500">{machine.earnings}</p>
                      <p className="text-xs text-slate-400">{machine.status}</p>
                      <Button
                        style={{ backgroundColor: "#0b0e13" }}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const salePrice = parseFloat(machine.purchasePrice.replace('$', '').replace(',', '')) * 0.9;
                          toast.success(`Machine sold for $${salePrice.toFixed(2)} (10% fee deducted)`);
                        }}
                        className="mt-1 border-slate-600 text-slate-300  "
                      >
                        Sell (10% fee)
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}