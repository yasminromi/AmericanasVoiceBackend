const ProductService = require('../services/ProductService');
const WishlistService = require('../services/WishlistService');

class ProductController {
    async searchProduct(req, res) {
        const { product } = req.params;
        const products = await ProductService.searchProductsV1Service(product);

        // parte comentada por conta do bloqueio da API das Americanas
        // const productsDetails = await Promise.all(products.map(item => ProductService.searchProductsV2Service(item.id)));

        // const response = productsDetails.map(item => {
        //     const product = {
        //         image: item.product.result.images[0].medium,
        //         name: item.product.result.name,
        //         price: item.offer.result.offers[0].salesPrice,
        //         store: item.offer.result.offers[0]._embedded.seller.name
        //     }
        //     return product;
        // })

        // TODO remover quando a API funcionar
        const response = products.map(product => {
            return {
                id: product.id,
                image: product.images[0].medium,
                name: product.name,
                price: 1.99 // mockado por conta do bloqueio da API das Americanas. Local funciona
            }
        });

        return res.json(response);
    }

    async addProduct(req, res) {
        
        const products = req.body;

        try {
            const response = await WishlistService.insertProduct(products[0]);
            return res.json(response);
        } catch (error) {
            console.log(error)
            return res.status(400).json(error);
        }
    }

    async listWishlist(req, res) {

        try {
            const response = await WishlistService.listWishlist();
            return res.json(response.rows);
        } catch (error) {
            console.log(error)
            return res.status(400).json(error);
        }
    }

    async clearWishlist(req, res) {

        try {
            const response = await WishlistService.clearWishlist();
            return res.json(response);
        } catch (error) {
            console.log(error)
            return res.status(400).json(error);
        }
    }

    async removeItem(req, res) {

        const { name } = req.params;
        console.log(req)
        try {
            const response = await WishlistService.removeItem(name);
            return res.json(response);
        } catch (error) {
            console.log(error)
            return res.status(400).json(error);
        }
    }
}

module.exports = new ProductController();