<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Services\ImageService;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

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

    public function store(StoreProductRequest $request)
    {
        $imagePath = $this->imageService->upload(
            $request->file('image'),
            'products'
        );

        $product = Product::create([
            ...$request->validated(),
            'image' => $imagePath,
        ]);

        return response()->json($product, 201);
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        $imagePath = $this->imageService->upload(
            $request->file('image'),
            'products',
            $product->image
        );

        $product->update([
            ...$request->validated(),
            'image' => $imagePath,
        ]);

        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Product archived successfully']);
    }
}
