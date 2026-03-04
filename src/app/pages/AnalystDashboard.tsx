import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BarChart3, TrendingUp, AlertTriangle, DollarSign } from "lucide-react";
import { mockLoans, getLoanAnalytics, getMonthlyData, getRiskDistribution, getLoansByStatus } from "../data/mockData";

export default function AnalystDashboard() {
  const [loans] = useState(mockLoans);
  const analytics = getLoanAnalytics();
  const monthlyData = getMonthlyData();
  const riskData = getRiskDistribution();
  const statusData = getLoansByStatus();

  const stats = [
    {
      title: "Total Portfolio",
      value: `$${analytics.totalDisbursed.toLocaleString()}`,
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Collection Rate",
      value: `${analytics.collectionRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Avg Loan Size",
      value: `$${analytics.averageLoanSize.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "At-Risk Loans",
      value: loans.filter(l => l.riskLevel === 'high' || l.riskLevel === 'medium').length,
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  const COLORS = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444',
    pending: '#6b7280',
    approved: '#3b82f6',
    active: '#10b981',
    completed: '#8b5cf6',
    defaulted: '#ef4444',
    rejected: '#dc2626',
  };

  return (
    <DashboardLayout title="FINANCIAL PORTAL" roleColor="font-roboto text-orange-600">
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

        {/* Charts */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Portfolio Overview</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Cash Flow */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Cash Flow</CardTitle>
                  <CardDescription>Disbursements vs Collections</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="disbursed" fill="#3b82f6" name="Disbursed" />
                      <Bar dataKey="collected" fill="#10b981" name="Collected" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Loan Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Loan Status Distribution</CardTitle>
                  <CardDescription>Current loan portfolio breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="risk" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Risk Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Risk Level Distribution</CardTitle>
                  <CardDescription>Portfolio segmentation by risk</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={riskData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {riskData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* High Risk Loans */}
              <Card>
                <CardHeader>
                  <CardTitle>Loans Requiring Attention</CardTitle>
                  <CardDescription>Medium and high-risk loans</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {loans
                      .filter(l => l.riskLevel === 'medium' || l.riskLevel === 'high')
                      .map((loan) => (
                        <div key={loan.id} className="border rounded-lg p-3">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-semibold text-sm">{loan.id} - {loan.borrowerName}</p>
                              <p className="text-xs text-gray-600">{loan.purpose}</p>
                            </div>
                            <Badge className={
                              loan.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }>
                              {loan.riskLevel} risk
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-gray-600">Amount:</span>
                              <span className="font-medium ml-1">${loan.amount.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Credit:</span>
                              <span className="font-medium ml-1">{loan.creditScore}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 gap-6">
              {/* Outstanding Balance Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Outstanding Balance Trend</CardTitle>
                  <CardDescription>Portfolio outstanding over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="outstanding"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        name="Outstanding Balance"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Performance Metrics Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Loan Performance by Interest Rate</CardTitle>
                  <CardDescription>Analyzing returns across different rate tiers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { range: "6-7%", count: loans.filter(l => l.interestRate >= 6 && l.interestRate < 8).length, avgSize: 12500, collected: 95 },
                      { range: "8-9%", count: loans.filter(l => l.interestRate >= 8 && l.interestRate < 10).length, avgSize: 50000, collected: 22 },
                      { range: "10-12%", count: loans.filter(l => l.interestRate >= 10 && l.interestRate <= 12).length, avgSize: 27500, collected: 8 },
                    ].map((tier, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">{tier.range} Interest Rate</h4>
                          <Badge variant="outline">{tier.count} loans</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 mb-1">Avg Loan Size</p>
                            <p className="font-semibold">${tier.avgSize.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">Collection Rate</p>
                            <p className="font-semibold">{tier.collected}%</p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">Performance</p>
                            <Badge className={tier.collected > 80 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {tier.collected > 80 ? 'Excellent' : 'Good'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
