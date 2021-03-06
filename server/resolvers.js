const Post = require('./modules/post/models/post.model');
const User = require('./modules/auth/models/user.model');
const Project = require('./modules/projects/models/project.model');
const bcrypt = require('bcrypt');
const authHelper = require('./modules/auth/helpers');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const prepare = (o) => {
  o._id = o._id.toString()
  return o
};

const resolvers = {
  Query: {
    me: authHelper.authenticated((root, args, context) => context.currentUser),
    posts: () => Post.find({}),
    users: () => User.find({}),
    projects: (root, args) => {
      const userId = args.userId;
      //console.log(userId);
      return Project.find({ user: userId });

    },
    getUser: async (parent, { id }) => {
      return prepare(await User.findOne({ _id: id }));

    },
    verifyToken: async (parent, args) => {
      //console.log(args);
      try {
        const decoded = jwt.verify(args.token, process.env.SECRET);
        //console.log(decoded);
        const user = await User.findOne({ _id: decoded.id });
        return {...user._doc }
      }
      catch (err) {
        throw err;
      }
    }
  },

  // The mutation resolvers must return the created object.
  Mutation: {
    addPost: (parent, post) => {
      // Create a new record in the database
      const newPost = new Post({ title: post.title, content: post.content });
      // Save the record and return it
      return newPost.save();
    },
    addProject: (parent, args) => {
      console.log(args.project);
      const newProject = new Project({ ...args.project });
      return newProject.save();
    },
    updateProject: (parent, args) => {
      console.log(args);
      const id = args.id;
      const projectData = args.project;
      return Project.findOneAndUpdate({ _id: id}, { ...projectData });
    },
    removeProject: (parent, args) => {
      console.log(args);
      return Project.findOneAndDelete({ _id: args.id});
    },
    createUser: async (parent, args) => {
      const { email, password, confirm } = args.userInput;

      if (!validator.isEmail(email)) {
        throw new Error('Invalid email!');
      }

      const userExists = await User.findOne({ email });
      if (userExists) {
        throw new Error('User already exists!');
      }

      if (password !== confirm) {
        throw new Error('Passwords must match!');
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User(
        {
          email: args.userInput.email,
          password: hashedPassword
        },
        err => {
          if (err) throw err;
        }
      );
      user.save();

      const token = jwt.sign({ id: user._id }, process.env.SECRET);
      const response = { token, password: null, ...user._doc };
      console.log(response);
      return response;
    },
    updateUser: (parent, args) => {
      return User.findOneAndUpdate({ _id: args.id}, {  ...args.user });
    },
    updateUserInfo: (parent, args) => {
      //console.log(args);
        return User.findOneAndUpdate({ _id: args.id}, { info: { ...args.userInfo }});
    },
    updateUserStyles: (parent, args) => {
      return User.findOneAndUpdate({ _id: args.id}, { styles: { ...args.userStyles }});
    },
    login: async (parent, args) => {
      console.log(args);
      try {
        if (!validator.isEmail(args.email)) throw new Error('Invalid email.');

        const user = await User.findOne({ email: args.email });
        if (!user) throw new Error('Email does not exist');

        const passwordIsValid = await bcrypt.compare(args.password, user.password);
        if (!passwordIsValid) throw new Error('Password incorrect');

        const token = jwt.sign({ id: user._id }, process.env.SECRET);
        return { token, password: null, ...user._doc };
      }
      catch (err) {
        throw err;
      }
    },
  }
};

module.exports = resolvers;
