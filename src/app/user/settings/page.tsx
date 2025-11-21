"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Settings() {
  return (
    <div className="space-y-6 p-6 bg-slate-950 min-h-screen">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Settings</h2>
        <p className="text-slate-400">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger 
            value="profile" 
            className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger 
            value="security"
            className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400"
          >
            Security
          </TabsTrigger>
          <TabsTrigger 
            value="notifications"
            className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400"
          >
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Profile Information</CardTitle>
              <CardDescription className="text-slate-400">Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-emerald-500 text-white text-2xl">
                    JD
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" className="border-slate-700 bg-slate-800 text-white ">
                  Change Avatar
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="text-slate-300">First Name</Label>
                  <Input 
                    id="first-name" 
                    placeholder="John" 
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-slate-300">Last Name</Label>
                  <Input 
                    id="last-name" 
                    placeholder="Doe" 
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john.doe@example.com" 
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-300">Phone Number</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="+1 (555) 123-4567" 
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>

              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Change Password</CardTitle>
              <CardDescription className="text-slate-400">Update your account password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-slate-300">Current Password</Label>
                <Input 
                  id="current-password" 
                  type="password" 
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-slate-300">New Password</Label>
                <Input 
                  id="new-password" 
                  type="password" 
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-slate-300">Confirm New Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                Update Password
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Two-Factor Authentication</CardTitle>
              <CardDescription className="text-slate-400">Add an extra layer of security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-slate-300">Enable 2FA</Label>
                  <p className="text-sm text-slate-500">
                    Secure your account with two-factor authentication
                  </p>
                </div>
<Switch
  className="
    data-[state=checked]:bg-emerald-500 
    data-[state=unchecked]:bg-gray-300
    [&>span]:bg-white 
    data-[state=checked]:[&>span]:bg-emerald-100
    transition-colors
  "
/>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Email Notifications</CardTitle>
              <CardDescription className="text-slate-400">Manage your email preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-slate-300">Mining Updates</Label>
                  <p className="text-sm text-slate-500">
                    Receive updates about your mining operations
                  </p>
                </div>
<Switch
  className="
    data-[state=checked]:bg-emerald-500 
    data-[state=unchecked]:bg-gray-300
    [&>span]:bg-white 
    data-[state=checked]:[&>span]:bg-emerald-100
    transition-colors
  "
/>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-slate-300">Transaction Alerts</Label>
                  <p className="text-sm text-slate-500">
                    Get notified about deposits and withdrawals
                  </p>
                </div>
                <Switch
  className="
    data-[state=checked]:bg-emerald-500 
    data-[state=unchecked]:bg-gray-300
    [&>span]:bg-white 
    data-[state=checked]:[&>span]:bg-emerald-100
    transition-colors
  "
/>

              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-slate-300">Referral Notifications</Label>
                  <p className="text-sm text-slate-500">
                    Updates about your referral earnings
                  </p>
                </div>
<Switch
  className="
    data-[state=checked]:bg-emerald-500 
    data-[state=unchecked]:bg-gray-300
    [&>span]:bg-white 
    data-[state=checked]:[&>span]:bg-emerald-100
    transition-colors
  "
/>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-slate-300">Marketing Emails</Label>
                  <p className="text-sm text-slate-500">
                    Receive promotional offers and news
                  </p>
                </div>
<Switch
  className="
    data-[state=checked]:bg-emerald-500 
    data-[state=unchecked]:bg-gray-300
    [&>span]:bg-white 
    data-[state=checked]:[&>span]:bg-emerald-100
    transition-colors
  "
/>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}