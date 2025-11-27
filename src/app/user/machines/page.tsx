"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Cpu, Loader2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserMachines } from "@/lib/feature/userMachine/usermachineApi";
import { getUserShareDetails } from "@/lib/feature/shareMachine/shareMachineSlice";
import { useGetAllMiningMachinesQuery } from "@/lib/feature/Machines/miningMachinesApiSlice";
import { purchaseAndAssignMachine, sellUserMachine } from "@/lib/feature/userMachine/transactionSlice";
import { AppDispatch, RootState } from '@/lib/store/store';


export default function Machines() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { userMachines } = useSelector((state: RootState) => state.userMachine);
  const { userShares } = useSelector((state: RootState) => state.shareMachine); // Update with your actual slice

  const [isLoading, setIsLoading] = useState(false);
  const [hasMachines, setHasMachines] = useState(false);
  const [hasShares, setHasShares] = useState(false);
  const [purchasingMachineId, setPurchasingMachineId] = useState<string | null>(null);

  // Fetch all mining machines for marketplace
  const { data: allMachines, isLoading: machinesLoading, error: machinesError } = useGetAllMiningMachinesQuery();





  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || !isAuthenticated) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        const fetchPromises = [];

        // Use email for machines and id for shares based on your existing implementation
        if (user.email) {
          fetchPromises.push(dispatch(fetchUserMachines(user.email)).unwrap());
        }

        if (user.id) {
          fetchPromises.push(dispatch(getUserShareDetails(user.id)).unwrap());
        }

        await Promise.all(fetchPromises);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load your machines data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [dispatch, user, isAuthenticated]);

  // Update state whenever the data changes
  useEffect(() => {
    // Check if user has active machines
    setHasMachines(
      userMachines &&
      Array.isArray(userMachines) &&
      userMachines.filter((machine) => machine.status === "active").length > 0
    );

    // Check if user has shares
    setHasShares(
      userShares &&
      userShares.shares &&
      Array.isArray(userShares.shares) &&
      userShares.shares.length > 0
    );
  }, [userMachines, userShares]);

  // Handle machine purchase
  const handlePurchaseMachine = async (machineId: string, machineName: string, price: number) => {
    if (!user || !isAuthenticated) {
      toast.error("Please login to purchase a machine");
      return;
    }

    try {
      setPurchasingMachineId(machineId);

      await dispatch(
        purchaseAndAssignMachine({
          userId: user.id,
          machineId,
          quantity: 1,    // REQUIRED
        })
      ).unwrap();

      toast.success(`Successfully purchased!`);

      if (user.email) {
        await dispatch(fetchUserMachines(user.email)).unwrap();
      }
    } catch (error: any) {
      console.error("Error purchasing machine:", error);
      toast.error(error?.message || "Failed to purchase machine. Please try again.");
    } finally {
      setPurchasingMachineId(null);
    }
  };


  // Use fetched user machines data or fallback to empty array
  const myMachines = userMachines && Array.isArray(userMachines) ? userMachines : [];

  // Get marketplace machines from API
  // Normalize API data shape to always return an array
  console.log("RAW MACHINES FROM API:", allMachines);
  const rawMachines: any = allMachines;

  const marketplaceMachines = Array.isArray(rawMachines)
    ? rawMachines
    : Array.isArray(rawMachines?.machines)
      ? rawMachines.machines
      : Array.isArray(rawMachines?.data)
        ? rawMachines.data
        : [];



  return (
    <div className="space-y-6 p-6 min-h-screen" style={{ backgroundColor: "#000000" }}>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

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
          {machinesLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-green-500" />
            </div>
          ) : machinesError ? (
            <div className="text-center py-8">
              <p className="text-red-400">Failed to load machines. Please try again.</p>
            </div>
          ) : marketplaceMachines.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-400">No machines available at the moment.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {marketplaceMachines.map((machine: any, i: number) => (
                <Card key={machine.id || i} className=" border-slate-700 shadow-lg overflow-hidden"style={{backgroundColor:"#1b1b1b"}}>
                  <div className="h-48 overflow-hidden bg-white">
                    <img
                      src={machine.images || machine.imageUrl || "https://via.placeholder.com/400x300?text=Mining+Machine"}
                      alt={machine.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between text-white">
                      <span>{machine.machineName}</span>
                      <span className="text-xl font-bold text-green-500">
                        ${machine.price || machine.priceRange}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Hash Rate:</span>
                          <span className="font-medium text-white">{machine.hashrate || machine.hashRate || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Power:</span>
                          <span className="font-medium text-white">{machine.power || machine.powerConsumption || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">ROI:</span>
                          <span className="font-medium text-white">{machine.roi || 'N/A'}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Profit Rate:</span>
                          <span className="font-medium text-green-500">{machine.profitRate || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Est. Profit:</span>
                          <span className="font-medium text-green-500">{machine.profit || machine.estimatedProfit || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-green-700 hover:bg-green-800 text-white"
                      onClick={() => handlePurchaseMachine(machine._id, machine.name, machine.price || machine.cost)}
                      disabled={purchasingMachineId === machine.id}
                    >
                      {purchasingMachineId === machine.id ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Purchase Machine
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="my-machines" className="space-y-4">
          <Card className=" border-slate-700 shadow-lg" style={{backgroundColor:"#1b1b1b"}}>
            <CardHeader>
              <CardTitle className="text-white">Your Mining Machines</CardTitle>
              <CardDescription className="text-slate-400">
                Manage your invested machines (10% deduction fee when sold)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-green-500" />
                </div>
              ) : myMachines.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-400">You do not have any machines yet.</p>
                  <p className="text-sm text-slate-500 mt-2">Purchase machines from the marketplace to get started.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {myMachines
                    .filter(machine => machine.status?.toLowerCase() === "active")
                    .map((machine, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 border border-slate-700"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-green-600 flex items-center justify-center">
                            <Cpu className="h-6 w-6 text-white" />
                          </div>

                          <div>
                            <p className="font-medium text-white">
                              {machine?.machineName || "N/A"}
                            </p>
                            <p className="text-sm text-slate-400">
                              Purchased: {new Date(machine.assignedDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="text-right space-y-1">
                          <p className="font-bold text-green-500">
                            ${machine.priceRange}
                          </p>

                          <p className="text-xs text-slate-400">{machine.status}</p>

                          <Button
                            style={{ backgroundColor: "#0b0e13" }}
                            variant="outline"
                            size="sm"
                            onClick={async () => {
                              try {
                                const salePrice =
                                  parseFloat(
                                    machine.priceRange.toString().replace("$", "")
                                  ) * 0.9;

                                const result = await dispatch(sellUserMachine(machine._id)).unwrap();

                                toast.success(
                                  result?.message ||
                                  `Machine sold for $${salePrice.toFixed(2)} (10% fee deducted)`
                                );

                              } catch (err: any) {
                                toast.error(err?.message || "Failed to sell machine");
                                console.error("SELL ERROR:", err);
                              }
                            }}
                            className="mt-1 border-slate-600 text-slate-300"
                          >
                            Sell (10% fee)
                          </Button>
                        </div>
                      </div>
                    ))}



                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}