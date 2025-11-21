"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { toast } from "sonner";

export default function Wallet() {
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

  const transactions = [
    { type: "Deposit", amount: "+$1,000.00", status: "Completed", date: "Nov 15, 2025" },
    { type: "Withdrawal", amount: "-$500.00", status: "Completed", date: "Nov 14, 2025" },
    { type: "Mining Reward", amount: "+$15.50", status: "Completed", date: "Nov 13, 2025" },
    { type: "Deposit", amount: "+$2,000.00", status: "Completed", date: "Nov 10, 2025" },
    { type: "Withdrawal", amount: "-$300.00", status: "Pending", date: "Nov 9, 2025" },
  ];

  return (
    <div className="space-y-6 p-4 md:p-6 bg-slate-950 min-h-screen">
  {/* Header */}
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
    {/* Title & Subtitle */}
    <div>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
        Wallet
      </h2>
      <p className="text-sm md:text-base text-slate-400 mt-1">
        Manage your funds and view transaction history
      </p>
    </div>
    
        <div className="flex gap-2">
          <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                <ArrowDownToLine className="mr-2 h-4 w-4" />
                Deposit
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-white">Deposit Funds</DialogTitle>
                <DialogDescription className="text-slate-400">Choose your network and send USDT to the wallet address</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Select Network</Label>
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
                    <Label className="text-slate-300">Wallet Address</Label>
                    <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                      <p className="font-mono text-sm break-all text-white">{walletAddresses[depositNetwork as keyof typeof walletAddresses]}</p>
                    </div>
                    <Button 
                      onClick={() => {
                        navigator.clipboard.writeText(walletAddresses[depositNetwork as keyof typeof walletAddresses]);
                        toast.success("Address copied to clipboard");
                      }}
                      variant="outline"
                      className="w-full border-slate-700 text-black "
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
              <Button className="bg-red-500 hover:bg-red-600 text-white" style={{backgroundColor:"#c02020"}}>
                <ArrowUpFromLine className="mr-2 h-4 w-4" />
                Withdraw
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-white">Withdraw Funds</DialogTitle>
                <DialogDescription className="text-slate-400">Minimum withdrawal: $59.20</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="withdraw-amount" className="text-slate-300">Amount (USD)</Label>
                  <Input 
                    id="withdraw-amount"
                    type="number"
                    placeholder="59.20"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    min="59.20"
                    step="0.01"
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
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
                <div className="space-y-2">
                  <Label htmlFor="wallet-address" className="text-slate-300">Wallet Address</Label>
                  <Input 
                    id="wallet-address"
                    placeholder="Enter your wallet address"
                    value={withdrawAddress}
                    onChange={(e) => setWithdrawAddress(e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <Button onClick={handleWithdraw} className="w-full bg-red-500 hover:bg-red-600 text-white" style={{backgroundColor:"#c02020"}}>
                  Submit Withdrawal Request
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-400">
              Available Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">$12,450.00</div>
            <p className="text-xs text-emerald-400 mt-1">+$1,250.00 this month</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-400">
              Total Deposited
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">$25,000.00</div>
            <p className="text-xs text-slate-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-400">
              Total Withdrawn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">$14,300.00</div>
            <p className="text-xs text-slate-500 mt-1">All time</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Transaction History</CardTitle>
          <CardDescription className="text-slate-400">Your recent wallet activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((transaction, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/50"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    transaction.type === "Deposit" || transaction.type === "Mining Reward"
                      ? "bg-emerald-500/20"
                      : "bg-slate-700"
                  }`}>
                    {transaction.type === "Deposit" || transaction.type === "Mining Reward" ? (
                      <ArrowDownToLine className="h-5 w-5 text-emerald-400" />
                    ) : (
                      <ArrowUpFromLine className="h-5 w-5 text-slate-300" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-white">{transaction.type}</p>
                    <p className="text-sm text-slate-400">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${
                    transaction.amount.startsWith("+") ? "text-emerald-400" : "text-white"
                  }`}>
                    {transaction.amount}
                  </p>
                  <p className="text-xs text-slate-500">{transaction.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}