const Product = require('../schema/product.schema');

exports.addProduct = (req, res, next) => {
    const name = req.body.prodName;
    const image = req.body.prodImage;
    const price = req.body.prodPrice;
    const discount = req.body.isDiscount;
    const desc = req.body.prodDesc;

    const Product = new Product({
        prodName: name,
        prodImage: image,
        prodPrice: price,
        isDiscount: discount,
        prodDesc: desc
    })
    return Product.save()
        .then(product => {
            res.status(200).json({
                success: true,
                message: 'Product Added successfully',
                product: product
            })
        })
        .catch(error => {
            console.log("Print error ", error)
        })
}

exports.getProductDetail = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
        .then(product => {
            res.status(200).json({
                success: true,
                Product: product
            })
        })
        .catch(error => {
            console.log("Print error ", error)
        })
}

exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.status(200).json({
                success: true,
                Products: products
            })
        })
        .catch(error => {
            console.log("Print error ", error)
        })
}

exports.editProduct = (req, res, next) => {
    const updatedName = req.body.prodName;
    const updatedImage = req.body.prodImage;
    const updatedPrice = req.body.prodPrice;
    const updatedDiscount = req.body.isDiscount;
    const updatedDesc = req.body.prodDesc;
    const prodId = req.body.prodId;

    Product.findById(prodId)
        .then(product => {
            product.prodName = updatedName
            product.prodImage = updatedImage;
            product.prodPrice = updatedPrice;
            product.isDiscount = updatedDiscount;
            product.prodDesc = updatedDesc;

            return product.save()
                .then(prdct => {
                    res.json({
                        success: true,
                        message: "Product updated successfully",
                        updatedProduct: prdct
                    })
                })
                .catch(err => {
                    console.log("Product updating error ", err)
                })
        })
        .catch(error => {
            console.log("Print error here ", error)
        })
}

exports.deleteProduct = (req, res, next) => {
    const prodId = req.params.productId;

    Product.deleteOne({ _id: prodId }).then(result => {
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        })
    })
        .catch(error => {
            console.log("Delete product error ", error)
        })
}