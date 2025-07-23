import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Heart,
  Clock,
  Send,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useToast } from '../components/Toast';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('7');

  const revenueData = {
    7: [
      { day: 'Day 1', revenue: 1200 },
      { day: 'Day 2', revenue: 1800 },
      { day: 'Day 3', revenue: 2200 },
      { day: 'Day 4', revenue: 1600 },
      { day: 'Day 5', revenue: 2800 },
      { day: 'Day 6', revenue: 3200 },
      { day: 'Day 7', revenue: 2900 },
    ],
    15: [
      { day: 'Week 1', revenue: 12000 },
      { day: 'Week 2', revenue: 15000 },
      { day: 'Week 3', revenue: 8000 },
    ],
    30: [
      { day: 'Week 1', revenue: 25000 },
      { day: 'Week 2', revenue: 32000 },
      { day: 'Week 3', revenue: 28000 },
      { day: 'Week 4', revenue: 35000 },
    ],
  };

  const topProductsData = [
    { name: 'iPhone 14', sales: 45, revenue: 35000 },
    { name: 'MacBook Pro', sales: 32, revenue: 65000 },
    { name: 'AirPods Pro', sales: 78, revenue: 15000 },
    { name: 'iPad Air', sales: 23, revenue: 14000 },
    { name: 'Apple Watch', sales: 56, revenue: 22000 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 45, color: '#8884d8' },
    { name: 'Clothing', value: 25, color: '#82ca9d' },
    { name: 'Books', value: 15, color: '#ffc658' },
    { name: 'Sports', value: 15, color: '#ff7300' },
  ];

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      lastActive: '2 days ago',
      totalPurchases: 5,
      totalSpent: 1250,
      wishlistItems: 3,
      purchases: [
        { product: 'iPhone 14', date: '2024-01-15', amount: 999 },
        { product: 'AirPods Pro', date: '2024-01-10', amount: 249 },
      ],
      wishlist: [
        { product: 'MacBook Pro', addedDays: 5 },
        { product: 'iPad Air', addedDays: 12 },
        { product: 'Apple Watch', addedDays: 3 },
      ],
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      lastActive: '1 day ago',
      totalPurchases: 8,
      totalSpent: 2100,
      wishlistItems: 2,
      purchases: [
        { product: 'MacBook Pro', date: '2024-01-12', amount: 1299 },
        { product: 'iPad Air', date: '2024-01-08', amount: 599 },
      ],
      wishlist: [
        { product: 'iPhone 14', addedDays: 8 },
        { product: 'AirPods Pro', addedDays: 15 },
      ],
    },
  ];

  const [selectedUser, setSelectedUser] = useState(users[0]);

  const sendOffer = (userId, productName) => {
    console.log(`Sending offer for ${productName} to user ${userId}`);
    // implimentations
  };

  const totalRevenue = revenueData[selectedPeriod].reduce(
    (sum, item) => sum + item.revenue,
    0,
  );

  return (
    <div className="p-4 sm:p-6 max-w-full lg:max-w-7xl mx-auto">
      <div className="mb-6 mt-10 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
          Admin Dashboard
        </h1>
        <p className="text-white text-sm sm:text-base">
          Monitor your e-commerce performance and manage users
        </p>
      </div>

      <Tabs defaultValue="analytics" className="space-y-4 sm:space-y-10 ">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 h-30 sm:h-11">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="products">Product Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-4 sm:space-y-6 ">
          {/* Metrices key */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 sm:mt-10">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold">
                  ${totalRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold">2,350</div>
                <p className="text-xs text-muted-foreground">+180 new users</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">
                  Total Orders
                </CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">
                  Conversion Rate
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold">3.2%</div>
                <p className="text-xs text-muted-foreground">
                  +0.5% from last period
                </p>
              </CardContent>
            </Card>
          </div>

          {/* revenue chart */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <CardTitle>Revenue Overview</CardTitle>
                <Select
                  value={selectedPeriod}
                  onValueChange={setSelectedPeriod}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="15">Last 15 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="w-full h-56 sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData[selectedPeriod]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* category distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-56 sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* user list */}
            <Card>
              <CardHeader>
                <CardTitle>User List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className={`p-3 sm:p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedUser.id === user.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedUser(user)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-sm sm:text-base">
                            {user.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {user.email}
                          </p>
                        </div>
                        <Badge
                          variant={
                            user.lastActive.includes('day')
                              ? 'default'
                              : 'secondary'
                          }
                        >
                          {user.lastActive}
                        </Badge>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-600">
                        <span>{user.totalPurchases} purchases</span>
                        <span>${user.totalSpent} spent</span>
                        <span>{user.wishlistItems} wishlist items</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* user details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">
                  User Details - {selectedUser.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                {/* purchase history */}
                <div>
                  <h4 className="font-semibold mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Purchase History
                  </h4>
                  <div className="space-y-2">
                    {selectedUser.purchases.map((purchase, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 bg-gray-50 rounded"
                      >
                        <div>
                          <p className="font-medium text-sm">
                            {purchase.product}
                          </p>
                          <p className="text-xs text-gray-600">
                            {purchase.date}
                          </p>
                        </div>
                        <span className="font-semibold mt-1 sm:mt-0">
                          ${purchase.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* wishlist */}
                <div>
                  <h4 className="font-semibold mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                    <Heart className="h-4 w-4 mr-2" />
                    Wishlist Items
                  </h4>
                  <div className="space-y-2">
                    {selectedUser.wishlist.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 bg-gray-50 rounded"
                      >
                        <div>
                          <p className="font-medium text-sm">{item.product}</p>
                          <p className="text-xs text-gray-600 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            Added {item.addedDays} days ago
                          </p>
                        </div>
                        <Button
                          size="sm"
                          className="mt-2 sm:mt-0"
                          onClick={() =>
                            sendOffer(selectedUser.id, item.product)
                          }
                        >
                          <Send className="h-3 w-3 mr-1" />
                          Send Offer
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64 sm:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topProductsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {topProductsData.map((product, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base">
                        {product.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {product.sales} units sold
                      </p>
                    </div>
                    <div className="text-right mt-2 sm:mt-0">
                      <p className="font-semibold text-green-600">
                        ${product.revenue.toLocaleString()}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Revenue
                      </p>
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
};

export default AdminDashboard;
