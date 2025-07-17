import User from '../models/users.model.js';

export class UserController {
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async getAllUsers(_, res) {
        try {
            const users = await User.find();
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: users
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "not found"
                });
            }
            return res.status(200).json({
                statusCode: 200,
                message: "success",
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async updateUser(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "not found"
                });
            }
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: updatedUser
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "not found"
                });
            }
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: {}
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }
}
