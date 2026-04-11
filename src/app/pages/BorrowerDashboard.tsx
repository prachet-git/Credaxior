import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { DollarSign, TrendingDown, Calendar, Plus, Eye, CreditCard } from "lucide-react";
import { getLoans, createLoan } from "../../services/api";

export default function BorrowerDashboard() {
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);

  const [form, setForm] = useState({
    amount: "",
    term: "",
    purpose: "",
    income: "",
    employment: "",
    details: "",
  });

  
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const data = await getLoans();
        setLoans(data);
      } catch (err) {
        console.error("Error fetching loans:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  const handleSubmit = async () => {
    try {
      await createLoan(form);
      setIsApplyDialogOpen(false);

      
      const updated = await getLoans();
      setLoans(updated);
    } catch (err) {
      console.error("Error creating loan:", err);
    }
  };

  
  const upcomingPayments: any[] = [];

  
  const activeLoans = loans.filter(l => l.status === "active").length;

  const totalBorrowed = loans.reduce(
    (sum, loan) => sum + (loan.amount || 0),
    0
  );

  const totalOwed = loans
    .filter(l => l.status === "active")
    .reduce((sum, loan) => sum + (loan.remainingAmount || 0), 0);

  const nextPaymentAmount = 0;

  const stats = [
    {
      title: "Active Loans",
      value: activeLoans,
      icon: TrendingDown,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Borrowed",
      value: `$${totalBorrowed.toLocaleString()}`,
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Owed",
      value: `$${totalOwed.toLocaleString()}`,
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Next Payment",
      value: "N/A",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <DashboardLayout title="BORROWER PORTAL" roleColor="font-roboto text-green-600">
      <div className="space-y-6">

        {/* LOADING STATE */}
        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading loans...
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </CardTitle>
                      <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Apply Loan */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between pb-4">
                  <div>
                    <CardTitle>Loan Applications</CardTitle>
                    <CardDescription>Apply for new loans</CardDescription>
                  </div>

                  <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Apply for Loan
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Apply for Loan</DialogTitle>
                      </DialogHeader>

                      <div className="space-y-4">
                        <Input
                          placeholder="Amount"
                          onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        />
                        <Input
                          placeholder="Term"
                          onChange={(e) => setForm({ ...form, term: e.target.value })}
                        />
                        <Textarea
                          placeholder="Purpose"
                          onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                        />

                        <Button onClick={handleSubmit}>
                          Submit
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
            </Card>

            {/* Loans */}
            <Card>
              <CardHeader>
                <CardTitle>My Loans</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {loans.map((loan) => (
                    <div key={loan.id} className="border rounded-lg p-4">
                      <p className="font-semibold">{loan.purpose}</p>
                      <p className="text-sm text-gray-600">Amount: ${loan.amount}</p>

                      <Link to={`/loan/${loan.id}`}>
                        <Button size="sm" className="mt-3">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
