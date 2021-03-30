import bcrypt from 'bcryptjs';

const data ={

    users: [
        {
            username:'Admin',
            email:'admin@example.com',
            password: bcrypt.hashSync('admin', 8), //hashing the password using bcryptjs library
            isAdmin: true,
        },
        {
            username:'Bob',
            email:'Bob@example.com',
            password: bcrypt.hashSync('1234', 8), //hashing the password using bcryptjs library
            isAdmin: false,
        },
    ],

    products:[
        {
        name:'Orange Garden',
        category:'Summer',
        image: 'images/1.png',
        price: 420,
        InStock: true,
        description: 'high quality product',
    },
    {
        name:'Merry-go-round',
        category:'Summer',
        image: 'images/2.jpg',
        price: 650,
        InStock: true,
        description: 'high quality product',
    },
    {
        name:'Young Coconut Bread',
        category:'Summer',
        image: 'images/3.jpg',
        price: 55,
        InStock: false,
        description: 'high quality product',
    },
    {
        name:'V1 Nama Chocolate Milk',
        category:'Winter',
        image: 'images/4.jpg',
        price: 220,
        InStock: true,
        description: 'high quality product',
    },
    {
        name:'Cruncy Nutella Cake',
        category:'Winter',
        image: 'images/5.jpg',
        price: 260,
        InStock: true,
        description: 'high quality product',
    },
    
],
};

export default data
