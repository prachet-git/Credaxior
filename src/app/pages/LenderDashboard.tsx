import { useState } from "react";
import { Link } from "react-router";
import DashboardLayout from "../components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { DollarSign, TrendingUp, Clock, Plus, Eye } from "lucide-react";
import { mockLoans } from "../data/mockData";

export default function LenderDashboard() {
  const [loans] = useState(mockLoans.filter(l => l.lenderId === 'U002' || l.lenderId === 'U004'));
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Calculate stats for the lender
  const activeLoans = loans.filter(l => l.status === 'active').length;
  const totalLent = loans.reduce((sum, loan) => sum + loan.amount, 0);
  const totalCollected = loans.reduce((sum, loan) => sum + loan.paidAmount, 0);
  const pendingApplications = loans.filter(l => l.status === 'pending').length;

  const stats = [
    {
      title: "Active Loans",
      value: activeLoans,
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Lent",
      value: `$${totalLent.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Collected",
      value: `$${totalCollected.toLocaleString()}`,
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Pending Apps",
      value: pendingApplications,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <DashboardLayout title="LENDER PORTAL" roleColor="font-roboto text-blue-600">
      <div className="space-y-6">
        {/* Stats Grid */}
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

        {/* Create Loan Offer */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between pb-4">
              <div>
                <CardTitle>Loan Offers</CardTitle>
                <CardDescription>Create and manage your loan offers</CardDescription>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Loan Offer
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Loan Offer</DialogTitle>
                    <DialogDescription>
                      Set up a new loan offer for potential borrowers
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Loan Amount ($)</Label>
                        <Input id="amount" type="number" placeholder="50000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rate">Interest Rate (%)</Label>
                        <Input id="rate" type="number" step="0.1" placeholder="8.5" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="term">Term (months)</Label>
                        <Input id="term" type="number" placeholder="36" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="minCredit">Min. Credit Score</Label>
                        <Input id="minCredit" type="number" placeholder="650" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="purpose">Loan Purpose Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="personal">Personal</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="home">Home Improvement</SelectItem>
                          <SelectItem value="debt">Debt Consolidation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the loan offer terms and requirements..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsCreateDialogOpen(false)}>
                      Create Offer
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
        </Card>

        {/* My Loans Table */}
        <Card>
          <CardHeader>
            <CardTitle>My Loans</CardTitle>
            <CardDescription>Track all loans you've issued</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loan ID</TableHead>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Interest Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loans.map((loan) => {
                  const progress = (loan.paidAmount / loan.totalRepayment) * 100;
                  return (
                    <TableRow key={loan.id}>
                      <TableCell className="font-medium">{loan.id}</TableCell>
                      <TableCell>{loan.borrowerName}</TableCell>
                      <TableCell>${loan.amount.toLocaleString()}</TableCell>
                      <TableCell>{loan.interestRate}%</TableCell>
                      <TableCell>
                        <Badge variant={
                          loan.status === 'active' ? 'default' :
                          loan.status === 'completed' ? 'secondary' :
                          loan.status === 'pending' ? 'outline' :
                          loan.status === 'approved' ? 'default' : 'destructive'
                        }>
                          {loan.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 min-w-[80px]">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{progress.toFixed(0)}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link to={`/loan/${loan.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
