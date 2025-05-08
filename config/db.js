import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // קריאה ראשונה, כדי לאפשר שימוש במשתנים בסביבה

const connectDB = async () => {
  try {
    // התחברות למסד הנתונים
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // אם יש שגיאה בהתחברות, השרת יפסיק לפעול
  }
};

export default connectDB;
