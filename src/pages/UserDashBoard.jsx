import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag, Download, Trash2 } from 'lucide-react';
import axios from 'axios';

const UserDashboard = () => {
  const [purchases, setPurchases] = useState([]);

  return (
    <div className="p-4 sm:p-6 max-w-full mt-10 md:max-w-7xl mx-auto min-h-screen">
      <div className="mt-6 sm:mt-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Welcome to Your Dashboard
        </h1>
        <p className="text-white text-sm sm:text-base">
          Discover amazing products and manage your purchases
        </p>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mt-1 h-30 sm:h-10">
          <TabsTrigger value="orders">My Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          {purchases.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
                <ShoppingBag className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  No orders yet
                </h3>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">
                  Start shopping to see your orders here
                </p>
                <Button
                  onClick={() =>
                    document.querySelector('[value="products"]')?.click()
                  }
                >
                  Start Shopping
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {purchases.map((purchase) => (
                <Card key={purchase.id}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center space-x-4 w-full sm:w-auto">
                        <img
                          src={purchase.product.image}
                          alt={purchase.product.name}
                          className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-semibold text-base sm:text-lg">
                            {purchase.product.name}
                          </h3>
                          <p className="text-gray-600 text-xs sm:text-sm">
                            Order #{purchase.invoiceNumber}
                          </p>
                          <p className="text-xs text-gray-500">
                            Purchased on {purchase.date}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                        <div className="text-right">
                          <p className="text-xl sm:text-2xl font-bold text-blue-600">
                            ${purchase.product.price}
                          </p>
                          <Badge variant="default">{purchase.status}</Badge>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() =>
                            handleDownloadInvoice(purchase.product)
                          }
                          className="w-full sm:w-auto"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Invoice
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
