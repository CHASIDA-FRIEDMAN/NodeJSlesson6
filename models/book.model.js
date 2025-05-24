import mongoose from "mongoose";

const allowedCategories = ['פנטזיה', 'מסע', 'קלאסיקה', 'נוער', 'הרפתקה', 'רומן', 'דרמה', 'אחר'];

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, minlength: [2, 'שם הספר חייב להיות לפחות 2 תווים'] },
    price: { type: Number, required: true },
    categories: {
        type: [String],
        validate: {
            validator: function (cats) {
                return cats.every(cat => allowedCategories.includes(cat));
            },
            message: props => `${props.value} is not a valid category.`,
            default: ['אחר'] // ברירת מחדל אם לא נשלחו קטגוריות
        }
    },
    author: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true }
    }
})

const Book = mongoose.model('Book', bookSchema)

export default Book