const catchAsyncError = require("../middlewares/catchAsyncError.js");
const Product = require("../models/productModel.js");
const ApiFeatures = require("../utils/apiFeatures.js");
const ErrorHandler = require("../utils/errorHandler.js");
const cloudinary = require("cloudinary");
// Create Product -- Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];
  // Asynchronously upload images
  const uploadPromises = images.map(async (image) => {
    const result = await cloudinary.v2.uploader.upload(image, {
      folder: "products",
    });
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  });

  // Wait for all images to be uploaded
  await Promise.all(uploadPromises);

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get all Products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
  let products = await apiFeature.query.clone();
  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query.clone();

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// Get all Products (Admin)
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

//Get product Detail

exports.getProductDetail = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  return res.status(200).json({
    success: true,
    product,
  });
});



// Update a product -- Admin

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  console.log(req.body)

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }
  req.body.Stock = req.body.stock
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});


// Delete Product--admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    // Delete images from Cloudinary
    const deletePromises = product.images.map(async (image) => {
      try {
        const result = await cloudinary.v2.uploader.destroy(image.public_id);
        // console.log(`Image with ID ${image.public_id} deleted successfully`);
        // console.log(result); // Log the result from Cloudinary
      } catch (error) {
        console.error(`Failed to delete image with ID ${image.public_id}:`, error);
      }
    });

    // Wait for all image deletions to complete
    await Promise.all(deletePromises);

    return res.status(200).json({
      success: true,
      message: "Product and associated images deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// exports.deleteProduct = catchAsyncError(async (req, res, next) => {
//   try {
//     const product = await Product.deleteOne({ _id: req.params.id });

//     if (!product) {
//       return next(new ErrorHandler("Product not found", 404));
//     }
//     for (let i = 0; i < product.images.length; i++) {
//       const imageId = product.images[i];
//       console.log(`Deleting image with ID: ${imageId}`);
//       try {
//         const result = await cloudinary.v2.uploader.destroy(imageId);
//         console.log(`Image with ID ${imageId} deleted successfully`);
//         console.log(result); // Log the result from Cloudinary
//       } catch (error) {
//         console.error(`Failed to delete image with ID ${imageId}:`, error);
//       }
//     }
    
    

//     return res.status(200).json({
//       success: true,
//       message: "Product deleted successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// });

// Create Update Review

exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);

  if (!product) {
    return next(
      new ErrorHandler(`Product not found with ID: ${productId}`, 404)
    );
  }
  const isReviwed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviwed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.ratings = product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All reviews of a single Product
exports.getProductReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete a Review

exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.body.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0
  if (reviews.length === 0) {
    ratings=0
  } else {
    ratings = avg / reviews.length;
  }
  
  const numOfReviews = reviews.length;
  await Product.findByIdAndUpdate(
    req.body.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
  });
});
