const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

 isAdmin: {
  type: Boolean,
  default: false,
},

  balance: {
    type: Number,
    default: 100000,
  },
  profileImage: {
  type: String,
  default: "",
},

  portfolio: [
    {
      stockId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stock",
      },
      quantity: {
        type: Number,
        default: 0,
      },
      averagePrice: {
        type: Number,
        default: 0,
      },
    },
  ],

  // ⭐ ADD THIS
  watchlist: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stock",
      },
    ],
    default: [],
  },
});

module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);