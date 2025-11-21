"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Server, TrendingUp, Users, ArrowUpFromLine, ArrowDownToLine } from "lucide-react";
import { toast } from "sonner";

export default function Dashboard() {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [withdrawNetwork, setWithdrawNetwork] = useState("");
  const [depositNetwork, setDepositNetwork] = useState("");
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);

  const walletAddresses = {
    TRC20: "TXYZabcd1234567890TRON",
    ERC20: "0xABCD1234567890ETH"
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (!withdrawAmount || amount < 59.20) {
      toast.error("Minimum withdrawal amount is $59.20");
      return;
    }
    if (!withdrawAddress || !withdrawNetwork) {
      toast.error("Please fill all fields");
      return;
    }
    toast.success("Withdrawal request submitted for admin review");
    setIsWithdrawOpen(false);
    setWithdrawAmount("");
    setWithdrawAddress("");
    setWithdrawNetwork("");
  };

  const stats = [
    {
      title: "Total Balance",
      value: "$12,450.00",
      change: "+12.5%",
      icon: DollarSign,
      gradient: "bg-green-600",
    },
    {
      title: "Active Machines",
      value: "8",
      change: "+2 this month",
      icon: Server,
      gradient: "bg-green-600",
    },
    {
      title: "Profit Earned",
      value: "$3,250.50",
      change: "+18.42%",
      icon: TrendingUp,
      gradient: "bg-green-600",
    },
    {
      title: "Referrals",
      value: "24",
      change: "+4 this week",
      icon: Users,
      gradient: "bg-green-600",
    },
  ];

  return (
    <div className="space-y-6 bg-slate-900 min-h-screen p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        {/* Title & Subtitle */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            User Dashboard
          </h2>
          <p className="text-sm md:text-base text-slate-400 mt-1">
            Welcome back to your mining dashboard
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <ArrowDownToLine className="mr-2 h-4 w-4" />
                Deposit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-white">Deposit Funds</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Choose your network and send USDT to the wallet address
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Select Network</Label>

                  <Select value={depositNetwork} onValueChange={setDepositNetwork}>
                    <SelectTrigger className="bg-black text-white border border-gray-600">
                      <SelectValue placeholder="Choose network" />
                    </SelectTrigger>

                    <SelectContent className="bg-[#0b0e13] text-white border border-gray-700">
                      <SelectItem value="TRC20">USDT - TRC20 (TRON)</SelectItem>
                      <SelectItem value="ERC20">USDT - ERC20 (Ethereum)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {depositNetwork && (
                  <div className="space-y-2">
                    <Label>Wallet Address</Label>
                    <div className="p-4 bg-secondary/50 rounded-lg border border-border/30">
                      <p className="font-mono text-sm break-all">{walletAddresses[depositNetwork as keyof typeof walletAddresses]}</p>
                    </div>
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(walletAddresses[depositNetwork as keyof typeof walletAddresses]);
                        toast.success("Address copied to clipboard");
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Copy Address
                    </Button>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700 text-white" style={{ backgroundColor: "#c02020" }}>
                <ArrowUpFromLine className="mr-2 h-4 w-4" />
                Withdraw
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0b0e13] text-white border border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white">Withdraw Funds</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Minimum withdrawal: $59.20
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Amount */}
                <div className="space-y-2">
                  <Label htmlFor="withdraw-amount" className="text-white">Amount (USD)</Label>
                  <Input
                    id="withdraw-amount"
                    type="number"
                    placeholder="59.20"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    min="59.20"
                    step="0.01"
                    className="
          bg-black text-white border border-gray-600 
          placeholder:text-gray-400
        "
                  />
                </div>

                {/* Network */}
                <div className="space-y-2">
                  <Label className="text-white">Network</Label>
                  <Select value={withdrawNetwork} onValueChange={setWithdrawNetwork}>
                    <SelectTrigger className="bg-black text-white border border-gray-600">
                      <SelectValue placeholder="Select network" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0b0e13] text-white border border-gray-700">
                      <SelectItem value="TRC20">USDT - TRC20 (TRON)</SelectItem>
                      <SelectItem value="ERC20">USDT - ERC20 (Ethereum)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Wallet Address */}
                <div className="space-y-2">
                  <Label htmlFor="wallet-address" className="text-white">Wallet Address</Label>
                  <Input
                    id="wallet-address"
                    placeholder="Enter your wallet address"
                    value={withdrawAddress}
                    onChange={(e) => setWithdrawAddress(e.target.value)}
                    className="
          bg-black text-white border border-gray-600 
          placeholder:text-gray-400
        "
                  />
                </div>

                {/* Button */}
                <Button
                  onClick={handleWithdraw}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  style={{ backgroundColor: "#c02020" }}
                >
                  Submit Withdrawal Request
                </Button>
              </div>
            </DialogContent>

          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-slate-800/50 border-slate-700/50 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                {stat.title}
              </CardTitle>
              <div className={`${stat.gradient} p-2 rounded-lg`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className="text-xs text-green-400 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-slate-800/50 border-slate-700/50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "Machine purchased", detail: "Antminer S19 Pro", time: "2 hours ago" },
              { action: "Withdrawal completed", detail: "$500.00", time: "5 hours ago" },
              { action: "Deposit received", detail: "$1,000.00", time: "1 day ago" },
              { action: "Referral bonus", detail: "$50.00", time: "2 days ago" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between border-b border-slate-700/30 pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-white">{activity.action}</p>
                  <p className="text-sm text-slate-400">{activity.detail}</p>
                </div>
                <p className="text-xs text-slate-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}