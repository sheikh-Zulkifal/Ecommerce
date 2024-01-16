const catchAsyncError = require('../middlewares/catchAsyncError.js')
const Product = require('../models/productModel.js')
const ApiFeatures = require('../utils/apiFeatures.js')
const ErrorHandler = require('../utils/errorHandler.js')

//Create Prduct -- Admin

exports.createProduct = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user.id
    const product = await Product.create(req.body)
    res.status(201)
    .json({
        success: true,
        product
    })
})

// Get all Products
exports.getAllProducts = catchAsyncError(async (req, res) => {
    const resultPerPage = 5;
    const productCount = await Product.countDocuments()
    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage)
    const products = await apiFeature.query;
    res.status(200)
    .json({
        success: true,
        products
    })
})

//Get product Detail

exports.getProductDetail = catchAsyncError(async(req,res,next) => {

    const product = await Product.findById(req.params.id);
    
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }
    return res.status(200).json({
        success: true,
        product,
        productCount
    });

})

//Update a product -- Admin

exports.updateProduct = catchAsyncError(async(req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    return res.status(200)
    .json({
        success: true,
        product
    })
})

// Delete Product--admin

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    try {
        const product = await Product.deleteOne({ _id: req.params.id });

        if (!product) {
            return next(new ErrorHandler("Product not found", 404))
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});



// exports.deleteProduct = async (req,res,next) =>{
//     const product = await Product.findById(req.params.id)

//     if (!product) {
//         return res.status(500)
//         .json({
//             success:false,
//             message: "Product not found"
//         })
//         await Product.remove();
//         return res.status(200)
//         .json({
//             success: true,
//             message: "Product delete successfully"
//         })
//     }
// }