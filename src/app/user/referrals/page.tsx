"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, Users, DollarSign, TrendingUp } from "lucide-react";
import { toast } from "sonner";

export default function Referrals() {
  const referralCode = "CRYPTO2025XYZ";
  const referralLink = `https://cryptomine.app/ref/${referralCode}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const referralStats = [
    { title: "Total Referrals", value: "24", icon: Users, bgColor: "bg-emerald-500" },
    { title: "Active Referrals", value: "18", icon: TrendingUp, bgColor: "bg-emerald-500" },
    { title: "Total Earned", value: "$1,450", icon: DollarSign, bgColor: "bg-emerald-500" },
  ];

  const referralHistory = [
    { name: "User #1234", status: "Active", earned: "$125.50", joined: "Nov 10, 2025" },
    { name: "User #1235", status: "Active", earned: "$98.20", joined: "Nov 12, 2025" },
    { name: "User #1236", status: "Pending", earned: "$0.00", joined: "Nov 14, 2025" },
    { name: "User #1237", status: "Active", earned: "$210.80", joined: "Nov 15, 2025" },
  ];

  return (
    <div className="space-y-6 p-6 bg-slate-950 min-h-screen">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Referral Program</h2>
        <p className="text-slate-400">Earn rewards by inviting friends</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {referralStats.map((stat) => (
          <Card key={stat.title} className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Your Referral Link</CardTitle>
          <CardDescription className="text-slate-400">
            First-time deposit: 10% bonus • Further deposits: 2% bonus • Registration required to qualify
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={referralLink}
              readOnly
              className="font-mono text-sm bg-slate-800 border-slate-700 text-white"
            />
            <Button
              onClick={() => copyToClipboard(referralLink)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white shrink-0"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
          <div className="flex gap-2">
            <Input
              value={referralCode}
              readOnly
              className="font-mono text-sm bg-slate-800 border-slate-700 text-white"
            />
            <Button
              onClick={() => copyToClipboard(referralCode)}
              variant="outline"
              className="shrink-0 border-slate-700 text-white bg-slate-800"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Code
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="h-12 w-12 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                1
              </div>
              <h3 className="font-semibold text-white">Share Your Link</h3>
              <p className="text-sm text-slate-400">
                Send your unique referral link to friends and family
              </p>
            </div>
            <div className="space-y-2">
              <div className="h-12 w-12 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                2
              </div>
              <h3 className="font-semibold text-white">They Sign Up</h3>
              <p className="text-sm text-slate-400">
                Your referrals create an account and start mining
              </p>
            </div>
            <div className="space-y-2">
              <div className="h-12 w-12 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                3
              </div>
              <h3 className="font-semibold text-white">Earn Bonuses</h3>
              <p className="text-sm text-slate-400">
                10% bonus on first deposit, 2% on further deposits
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Your Referrals</CardTitle>
          <CardDescription className="text-slate-400">Track your referral performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {referralHistory.map((referral, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/50"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center" style={{ backgroundColor: "#185630" }}>
                    <Users className="h-5 w-5 text-slate-300 " />
                  </div>
                  <div>
                    <p className="font-medium text-white">{referral.name}</p>
                    <p className="text-sm text-slate-400">Joined: {referral.joined}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${referral.status === "Active" ? "text-emerald-400" : "text-slate-400"
                    }`}>
                    {referral.earned}
                  </p>
                  <p className="text-xs text-slate-500">{referral.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}