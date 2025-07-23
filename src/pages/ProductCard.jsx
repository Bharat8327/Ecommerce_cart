import { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function ProductCard({
  product,
  onBuy,
  onAddToWishlist,
  isWishlisted = false,
}) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2">
            <Badge variant={product.inStock ? 'default' : 'destructive'}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isWishlisted
                ? 'text-red-500 bg-white'
                : 'text-gray-600 bg-white/80'
            } hover:bg-white`}
            onClick={() => onAddToWishlist(product)}
          >
            <Heart
              className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`}
            />
          </Button>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="text-sm text-gray-600 ml-1">
                {product.rating}
              </span>
            </div>
          </div>

          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">
              ${product.price}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={() => onBuy(product)}
          disabled={!product.inStock}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.inStock ? 'Buy Now' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
