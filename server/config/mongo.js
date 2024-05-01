import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://adilayanikkadan315:fyOirAgHEa3zGF3X@cluster0.hyrrtnu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

export default connectDB;
