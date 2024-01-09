const { User } = require('../models');
const { signToken } = require('../utils/auth');
const {AuthenticationError} = require('@apollo/server')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id }).select('-_V -password');
            }
            throw AuthenticationError;
          },
    },

    Mutations: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {token, user};
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw AuthenticationError;
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
            throw AuthenticationError;
            }
            const token = signToken(user);
            return { token, user };
        },
        SaveBook: async (parent, {bookId}, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    {_idd: context.user_id},
                    {$addToSet:{savedbooks: bookId}},
                    { new : true }
                )
            }
        },
        RemoveBook: async (parent, {bookId}, context) => {
            if(context.user) {
                const removedbook = await User.findOneandDelete(
                    {_id: context.user._id},
                    {$pull: {savedbooks: {bookId:bookId}}},
                    {new:true}
                )
                return removedbook;
            }

        }


    },
}

module.exports = resolvers

