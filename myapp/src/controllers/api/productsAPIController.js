const { Product } = require('../../database/models');



module.exports = {
    async list (req, res) {
        try{
            const allProducts = await Product.findAndCountAll({
                include:["images", "sizes", "types"],
                order: ["id"],
                limit: 4,
                offset: 4,
            })
            allproducts.rows.forEach( product => {
                product.dataValues.detail = `http://localhost:3000/api/products/${product.id}`                    
            })

            

            const top = products.filter(product => {
                return product.types[0].title == 'Top'

            })
            
            const bottom = products.filter(product => {
                return product.types[0].title == 'Bottom'

            })

            const outerwear = products.filter(product => {
                return product.types[0].title == 'Outerwear'

            })
           


            
            res.json({
                meta: {
                    status: 'success',
                    count: products.length,
                    countByCategory: {
                        Top: top.length,
                        Bottom: bottom.length,
                        Outerwear: outerwear.length
                    }
                },
                data: {
                    products
                }
            })
        } catch (error) {
            res.status(500).json({
                meta: {
                    status: 'error',
                },
                error: 'Products not found',
            })
        }
    },

    async detail (req,res) {
        try{
            const product = await Product.findByPk(req.params.id,{
                include:["images","types","sizes","colors"]
            })
            
            const images = JSON.parse(product.images[0].filename)
            product.dataValues.images_url = images.map((image,i) => image = `http://localhost:3000/imgs/products/${images[i]}`)
            product.dataValues.images = undefined //Quitando data que parece sobrar

            res.json({
                meta: {
                    status: 'success',
                },
                data: {
                    product
                }
            })

        } catch (error){
            res.status(500).json({
                meta: {
                    status: 'error',
                },
                error: 'Product not found',
            })
        }
    }
};