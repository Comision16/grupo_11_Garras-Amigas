const {loadProducts, storeProducts, loadCategorys, loadClass} = require('../data/db_Module');
const fs = require('fs');
const path = require('path');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


module.exports = {

    admin : (req,res) => {
    return res.render('adm/admin',{
        user : req.query.user
    })
    },
    loginAdm : (req,res)=> {
        return res.render('adm/loginAdm',{
            msg : req.query.error ? 'No tienes las credenciales validas para ingresar': null
        })
    },
    detailAdm: (req,res) => {
        const products = loadProducts();
        const product = products.find(product => product.id === +req.params.id);
        return res.render('adm/productDetailAdm' ,{
            product,
            toThousand
        })
    },
    edit: (req, res) => {
		const products = loadProducts();
		const categorys = loadCategorys();
		const subCategorys = loadClass();
        const product = products.find(product => product.id === +req.params.id);
		return res.render('adm/productEdit', {
			categorys,
			subCategorys,
			product
		})
    },
	update: (req, res) =>{
		const products = loadProducts();
		const {id} = req.params;
		const {name, price, discount, description, subCategory, category, stock} = req.body;
		const produtsModify = products.map(product => {
			if(product.id === +id){
				return {
					...product,
					name: name.trim(),
					price: +price,
					discount: +discount,
					subCategory,
					category,
					stock: +stock,
					description
				}
			}
			return product
		})
		storeProducts(produtsModify);

		return res.redirect('adm/productDetailAdm/' + req.params.id)
	},
    // Create - Form to create
    create: (req, res) => {
		const categorys = loadCategorys();
		const subCategorys = loadClass();
        return res.render('adm/productCreate',{
			categorys: categorys.sort(),
			subCategorys: subCategorys.sort()
		})
    },
	store: (req,res) =>{
		const products = loadProducts();
		const {name, price, discount, description, subCategory, category, stock} = req.body;
		const id = products[products.length - 1].id;
		const newProduct ={
			id: id +1,
			...req.body,
			name: name.trim(),
			price: +price,
			discount: +discount,
			stock: +stock,
			image: "Correa.jpeg",
			description,
			subCategory,
			category
		}
		const productsNew = [...products, newProduct];
		storeProducts(productsNew);
		return res.redirect('adm/product')
	},
	remove: (req, res) => {
		const products = loadProducts();
		const productsModify = products.filter(product => product.id !== +req.params.id);
		storeProducts(productsModify);
		return res.redirect('adm/product')
	}
}


  
