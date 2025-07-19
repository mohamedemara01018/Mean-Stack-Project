import userModel from "../Models/user.models.js"


const getAllUser = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({
            message: 'all users are fetched',
            users: users || []
        })

    } catch (error) {
        res.status(400).json({
            message: 'Error finding user',
            error: error.message
        });
    }
}


const createUser = async (req, res) => {
    const newUser = req.body;
    try {
        const user = await userModel.create(newUser);
        res.status(201).json({
            message: 'User created successfully',
            user: user
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error creating user',
            error: error.message
        });
    }
};

export { getAllUser, createUser }