const mongoose = require('mongoose');
const Product = require('./product');
const { Schema } = mongoose;

// mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
  
//   const db = mongoose.connection;
//   db.on("error", console.error.bind(console, "connection error:"));
//   db.once("open", () => {
//     console.log("Database connected");
//   });
  

const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Farm must have a name!']
    },
    city: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email required']
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});

// DELETE ALL ASSOCIATED PRODUCTS AFTER A FARM IS DELETED
farmSchema.post('findOneAndDelete', async function (farm) {
    if (farm.products.length) {
        const res = await Product.deleteMany({ _id: { $in: farm.products } })
        console.log(res);
    }
})

const Farm = mongoose.model('Farm', farmSchema);



module.exports = Farm;