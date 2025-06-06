import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            name: user.name
        },
        process.env.JWT_SECRET, // Ensure you have JWT_SECRET in your environment variables
        {expiresIn:'5m'}
    );
}