const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

require('../db/conn');

const User = require('../model/userSchema');
const AddProduct = require('../model/addProduct');
const Cart = require('../model/cart');
const Order = require('../model/order');

router.get('/', (req, res) => {
    res.send(`Hello world from the server rotuer js`);
});

//api for register
router.post('/register', async (req, res) => {
    const { name, email, phone, password, confirmPassword } = req.body;
    
    if (!name || !email || !phone || !password || !confirmPassword) {
        return res.status(422).json({ status: "fail", error: "All fields are required." });
    }
    
    try {
        const userExist = await User.findOne({ email: email });
        
        if (userExist) {
            return res.status(422).json({ status: "fail", error: "Email already exists." });
        } else if (password != confirmPassword) {
            return res.status(422).json({ status: "fail", error: "Passwords do not match." });
        } else {
            const user = new User({ name, email, phone, password, confirmPassword });
            const userRegister = await user.save();
            res.status(201).json({ status: "success", message: "User registered successfully." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", error: "Internal server error." });
    }
});


// api for login
router.post('/login', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: "fail", message: "Please fill in all the required fields." });
        }

        const userLogin = await User.findOne({ email: email });
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            token = await userLogin.generateAuthToken();

            // Storing token into a cookie
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!isMatch) {
                res.status(400).json({ status: "fail", message: "Invalid credentials" });
            } else {
                res.status(200).json({
                    status: "success",
                    message: "User login successful",
                    userDetails: {
                        email: userLogin.email,
                        name: userLogin.name, 
                        phoneNumber: userLogin.phone 
                    }
                });
            }
        } else {
            res.status(400).json({ status: "fail", message: "Invalid credentials" });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
});

// Store file as buffer in memory
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

// API to add a product
router.post('/add-product', upload.single('image'), async (req, res) => {
    try {
        const {
            category,
            productName,
            price,
            description,
            dateCreated,
        } = req.body;

        const imageBuffer = req.file.buffer.toString('base64'); 
        const newProduct = new AddProduct({
            category,
            productName,
            price,
            description,
            image: imageBuffer,
            dateCreated,
        });

        await newProduct.save();

        res.status(201).json({
            status: 'success',
            message: 'Product added successfully',
            product: newProduct,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});


// API to get all products 
router.get('/get-products/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const allProducts = await AddProduct.find();
        const userCart = await Cart.findOne({ userId });
        const productIdsInCart = userCart ? userCart.items.map(item => item.productId.toString()) : [];
        const productsWithFlag = allProducts.map(product => ({
            productId: product._id,
            image: product.image,
            productName: product.productName,
            price: product.price,
            category: product.category,
            description: product.description,
            addtocart: productIdsInCart.includes(product._id.toString()), 
        }));

        res.status(200).json({
            status: 'success',
            message: 'Products retrieved successfully',
            products: productsWithFlag,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

// API to get single product
router.post('/get-singleProduct/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const productId = req.body.productId; 
        const product = await AddProduct.findById(productId);
        const userCart = await Cart.findOne({ userId });
        const productIdsInCart = userCart ? userCart.items.map(item => item.productId.toString()) : [];

        if (!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Product not found',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Product retrieved successfully',
            product: {
                productId: product._id,
                image: product.image,
                productName: product.productName,
                price: product.price,
                addtocart: productIdsInCart.includes(product._id.toString()), 
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});


// API to add product in the cart
router.post('/add-to-cart', async (req, res) => {
    try {
        const { userId, productId, quantity,size } = req.body;
        let userCart = await Cart.findOne({ userId });

        if (!userCart) {
            userCart = new Cart({ userId, items: [] });
        }
        if (productId) {
            const existingItem = userCart.items.find(item => item.productId.equals(productId));

            if (existingItem) {
                existingItem.quantity += quantity;
                existingItem.size = size;
                existingItem.addtocart = true; 
            } else {
                userCart.items.push({ productId, quantity,size,addtocart: true }); 
            }

            await userCart.save();
            return res.status(200).json({ status: 'success', message: 'Product added to cart successfully', cart: userCart });
        } else {
            console.error('Invalid productId provided in the request.');
            return res.status(400).json({ status: 'fail', message: 'Invalid productId provided in the request.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

// API to remove product from the cart
router.post('/remove-from-cart', async (req, res) => {
    try {
        const { userId, productId } = req.body;
        if (mongoose.connection.readyState !== 1) {
            console.error('MongoDB connection is not established.');
            return res.status(500).json({ status: 'error', message: 'Internal server error' });
        }

        let userCart;

        // Implement retry logic for findOne operation
        for (let retry = 0; retry < 3; retry++) {
            try {
                userCart = await Cart.findOne({ userId });
                break; // Break out of the loop if findOne is successful
            } catch (error) {
                console.error(`Retrying findOne attempt ${retry + 1} due to error:`, error);
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
            }
        }

        // Check if userCart is still not found
        if (!userCart) {
            console.error('User cart not found.');
            return res.status(404).json({ status: 'fail', message: 'User cart not found.' });
        }

        const productIndex = userCart.items.findIndex(item => item.productId.equals(productId));

        if (productIndex !== -1) {
            userCart.items.splice(productIndex, 1);
            await userCart.save();

            console.log('Product removed from cart successfully:', userCart);
            return res.status(200).json({ status: 'success', message: 'Product removed from cart successfully', cart: userCart });
        } else {
            console.error('Product not found in the cart.');
            return res.status(404).json({ status: 'fail', message: 'Product not found in the cart' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

// api to get carts
router.get('/get-cart/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const userCart = await Cart.findOne({ userId }).populate('items.productId');

        if (!userCart) {
            return res.status(404).json({ status: 'fail', message: 'Cart not found for the user' });
        }

        const productsInCart = userCart.items.map(item => {
            if (item.productId && item.productId._id) {
                return {
                    productId: item.productId._id,
                    image: item.productId.image,
                    productName: item.productId.productName,
                    price: item.productId.price,
                    quantity: item.quantity,
                    size: item.size,
                    addtocart: item.addtocart || false,
                };
            } else {
                console.error('Invalid productId found in cart:', item);
                return null;
            }
        }).filter(Boolean);

        res.status(200).json({ status: 'success', productsInCart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

// API to place order
router.post('/place-order', async (req, res) => {
    try {
        const orderDetails = req.body;

        // Validate orderDetails and ensure all required fields are present
        if (!orderDetails.userId || !orderDetails.products || orderDetails.products.length === 0 || !orderDetails.user || !orderDetails.user.email) {
            return res.status(400).json({ status: 'fail', message: 'Invalid order details' });
        }

        // Fetch product details from the database
        const products = await Promise.all(orderDetails.products.map(async (product) => {
            const productDetails = await AddProduct.findById(product.productId);
            if (!productDetails) {
                return null; // Handle the case where the product is not found
            }
            return {
                productId: productDetails._id,
                productName: productDetails.productName,
                description: productDetails.description,
                image: productDetails.image,
                size: product.size,
                quantity: product.quantity,
                price: productDetails.price,
            };
        }));

        // Check if all products were found
        if (products.some(product => !product)) {
            return res.status(404).json({ status: 'fail', message: 'One or more products not found' });
        }

        // Check if the products are in the user's cart before removing
        const userCart = await Cart.findOne({ userId: orderDetails.userId });
        if (userCart) {
            for (const product of products) {
                const productInCart = userCart.items.find(item => item.productId.equals(product.productId));
                if (productInCart) {
                    // Product is in the cart, remove it
                    await Cart.updateOne(
                        { userId: orderDetails.userId },
                        { $pull: { items: { productId: product.productId } } }
                    );
                }
            }
        }

        // Calculate total price
        const totalPrice = products.reduce((total, product) => total + product.price * product.quantity, 0);

        // Save the order details in the database
        const newOrder = new Order({
            userId: orderDetails.userId,
            products,
            totalPrice,
            user: orderDetails.user,
        });
        const savedOrder = await newOrder.save();

        // Send email to the seller
        const emailContent = createEmailContent(savedOrder);
        await sendEmailToSeller(orderDetails.user.email, emailContent);

        // res.status(200).json({ orderId: savedOrder._id });
        res.status(200).json({
            status: savedOrder.status,
            message: 'Order placed successfully',
            orderId: savedOrder._id,
        });
        
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Function to create email content for the seller
function createEmailContent(order) {
    let content = '<h1>New Order Placed</h1>';
    content += `<p>Order ID: ${order._id}</p>`;
    content += `<p>User ID: ${order.userId }</p>`;
    content += '<h2>Ordered Products:</h2>';

    order.products.forEach((product) => {
        content += `<p>Product ID: ${product.productId}</p>`;
        content += `<p>Product Name: ${product.productName}</p>`;
        content += `<p>Description: ${product.description}</p>`;
        content += `<p>Size: ${product.size}</p>`;
        content += `<p>Quantity: ${product.quantity}</p>`;
        content += `<p>Price: ${product.price}</p>`;
        
        // Display image using img tag with data URL
        content += `<img src="data:image/jpeg;base64,${product.image}" alt="${product.productName} Image" style="max-width: 100%;" />`;
        content += '<hr />';
    });

    content += '<p>User Details:</p>';
    // Check if user details are available
    if (order.user) {
        content += `<p>Name: ${order.user.name}</p>`;
        content += `<p>Address: ${order.user.address}</p>`;
        content += `<p>Mobile Number: ${order.user.mobileNumber}</p>`;
        content += `<p>Status: ${order.status}</p>`;
        content += `<p>Date Created: ${order.dateCreated}</p>`;
    } else {
        content += '<p>User details not available</p>';
    }
    content += '<hr />';
    content += `<h2>Total Price: ${order.totalPrice+50} Rs.</h2>`;
    content += '<p>Thank you for using our service!</p>';

    return content;
}

// Function to send email to the seller
async function sendEmailToSeller(userEmail, content) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'prachipanwar397@gmail.com',
                pass: 'mncg deiq nknx qrdf', // Use your application-specific password
            },
        });
        const mailOptions = {
            from: userEmail,
            to: 'prachipanwar397@gmail.com',
            subject: 'New Order Placed',
            html: content,
        };

        let retryCount = 0;
        const maxRetries = 3;

        while (retryCount < maxRetries) {
            try {
                const result = await transporter.sendMail(mailOptions);
                console.log('Email sent successfully:', result);
                return; // Successful, exit the function
            } catch (error) {
                console.error('Error sending email to seller:', error);
                retryCount++;
                console.log(`Retrying email send attempt ${retryCount} of ${maxRetries}`);
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
            }
        }

        console.error('Max retries reached. Could not send email to seller.');
    } catch (error) {
        console.error('Error in sendEmailToSeller function:', error);
    }
}

// api to get order details
router.get('/orders/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const userOrders = await Order.find({ userId });
        if (!userOrders || userOrders.length === 0) {
            return res.status(404).json({ status: 'fail', message: 'No orders found for the user' });
        }
        res.status(200).json({ status: 'success', orders: userOrders });
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;