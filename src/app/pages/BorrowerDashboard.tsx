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
import { DollarSign, TrendingDown, Calendar, Plus, Eye, CreditCard } from "lucide-react";
import { mockLoans, mockPayments } from "../data/mockData";

export default function BorrowerDashboard() {
  const [loans] = useState(mockLoans.filter(l => l.borrowerId === 'U003' || l.borrowerId === 'U005' || l.borrowerId === 'U007'));
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);

  // Get upcoming payments
  const upcomingPayments = mockPayments
    .filter(p => {
      const loanIds = loans.map(l => l.id);
      return loanIds.includes(p.loanId) && p.status === 'pending';
    })
    .slice(0, 5);

  // Calculate stats
  const activeLoans = loans.filter(l => l.status === 'active').length;
  const totalBorrowed = loans.filter(l => l.status === 'active' || l.status === 'completed').reduce((sum, loan) => sum + loan.amount, 0);
  const totalOwed = loans.filter(l => l.status === 'active').reduce((sum, loan) => sum + loan.remainingAmount, 0);
  const nextPaymentAmount = upcomingPayments[0]?.amount || 0;

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
      value: nextPaymentAmount > 0 ? `$${nextPaymentAmount.toLocaleString()}` : 'N/A',
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <DashboardLayout title="BORROWER PORTAL" roleColor="font-roboto text-green-600">
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

        {/* Apply for Loan */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between pb-4">
              <div>
                <CardTitle>Loan Applications</CardTitle>
                <CardDescription>Apply for new loans and track applications</CardDescription>
              </div>
              <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Apply for Loan
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Apply for a Loan</DialogTitle>
                    <DialogDescription>
                      Complete the application form to request a loan
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="loanAmount">Requested Amount ($)</Label>
                        <Input id="loanAmount" type="number" placeholder="25000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="loanTerm">Loan Term (months)</Label>
                        <Input id="loanTerm" type="number" placeholder="24" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loanPurpose">Loan Purpose</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select purpose" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="business">Business Expansion</SelectItem>
                          <SelectItem value="home">Home Renovation</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="debt">Debt Consolidation</SelectItem>
                          <SelectItem value="vehicle">Vehicle Purchase</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="income">Annual Income ($)</Label>
                        <Input id="income" type="number" placeholder="75000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="employment">Employment Status</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="employed">Employed</SelectItem>
                            <SelectItem value="self">Self-Employed</SelectItem>
                            <SelectItem value="business">Business Owner</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="details">Additional Details</Label>
                      <Textarea
                        id="details"
                        placeholder="Provide additional information about your loan request..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsApplyDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsApplyDialogOpen(false)}>
                      Submit Application
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* My Loans */}
          <Card>
            <CardHeader>
              <CardTitle>My Loans</CardTitle>
              <CardDescription>View and manage your active loans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loans.map((loan) => {
                  const progress = (loan.paidAmount / loan.totalRepayment) * 100;
                  return (
                    <div key={loan.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold">{loan.purpose}</p>
                          <p className="text-sm text-gray-600">Loan ID: {loan.id}</p>
                        </div>
                        <Badge variant={
                          loan.status === 'active' ? 'default' :
                          loan.status === 'completed' ? 'secondary' :
                          loan.status === 'pending' ? 'outline' : 'default'
                        }>
                          {loan.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Lender:</span>
                          <span className="font-medium">{loan.lenderName}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Amount:</span>
                          <span className="font-medium">${loan.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Remaining:</span>
                          <span className="font-medium">${loan.remainingAmount.toLocaleString()}</span>
                        </div>
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">Repayment Progress</span>
                            <span className="font-medium">{progress.toFixed(0)}%</span>
                          </div>
                          <div className="bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Link to={`/loan/${loan.id}`}>
                          <Button variant="outline" size="sm" className="w-full">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Payments */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Payments</CardTitle>
              <CardDescription>Your scheduled payment obligations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingPayments.length > 0 ? (
                  upcomingPayments.map((payment) => {
                    const loan = loans.find(l => l.id === payment.loanId);
                    return (
                      <div key={payment.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <CreditCard className="w-4 h-4 text-gray-600" />
                            <span className="font-semibold">
                              ${payment.dueDate ? loan?.monthlyPayment.toLocaleString() : '0'}
                            </span>
                          </div>
                          <Badge variant={
                            payment.status === 'pending' ? 'outline' :
                            payment.status === 'overdue' ? 'destructive' : 'default'
                          }>
                            {payment.status}
                          </Badge>
                        </div>
                        <div className="text-sm space-y-1">
                          <p className="text-gray-600">Loan: {loan?.purpose}</p>
                          <p className="text-gray-600">Due: {new Date(payment.dueDate).toLocaleDateString()}</p>
                        </div>
                        {payment.status === 'pending' && (
                          <Button size="sm" className="w-full mt-3">
                            Make Payment
                          </Button>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No upcoming payments</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
