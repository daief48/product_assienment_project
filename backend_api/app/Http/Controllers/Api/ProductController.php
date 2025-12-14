<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Services\ImageService;

class ProductController extends Controller
{
    public function __construct(private ImageService $imageService) {}

    public function index(Request $request)
    {
        $search = $request->query('search');

        $products = Product::query()
            ->when(
                $search,
                fn($q) =>
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('sku', 'like', "%{$search}%")
            )
            ->latest()
            ->paginate(10);

        return response()->json($products);
    }

        public function show(Product $product)
    {
        return response()->json($product);
    }

}
