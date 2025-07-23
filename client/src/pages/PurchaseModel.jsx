import React from 'react';
import { CheckCircle, Download, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

function PurchaseModal({ isOpen, onClose, product, onDownloadInvoice }) {
  const invoiceNumber = `INV-${Date.now()}`;
  const purchaseDate = new Date().toLocaleDateString();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Purchase Successful!</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">
              Thank you for your purchase!
            </h3>
            <p className="text-gray-600">
              Your order has been confirmed and will be processed shortly.
            </p>
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{product.name}</h4>
                  <p className="text-sm text-gray-600">{product.category}</p>
                  <p className="text-lg font-bold text-blue-600">
                    ${product.price}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Invoice Number:</span>
                  <span className="font-mono">{invoiceNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Purchase Date:</span>
                  <span>{purchaseDate}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold">
                  <span>Total Amount:</span>
                  <span className="text-blue-600">${product.price}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Button
              className="w-full"
              onClick={() => onDownloadInvoice(product)}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Invoice PDF
            </Button>
            <Button variant="outline" className="w-full" onClick={onClose}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PurchaseModal;
