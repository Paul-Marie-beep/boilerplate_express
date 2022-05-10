const mongoose = require("mongoose");
const slugify = require("slugify");

const userSchema= new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A Tour must have a name"],
      unique: true,
      trim: true,
      maxLength: [40, "A tour name must have less than or 40 characters"],
      minLength: [10, "A tour name must have more than or 10 characters"],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, "A Tour must have a duration"],
    },
    difficulty: {
      type: String,
      required: [true, "A Tour must have a difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty is either: easy, medium, or difficult",
      },
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    price: { type: Number, required: [true, "A Tour must have a price"] },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

userSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// eslint-disable-next-line prefer-arrow-callback
userSchema.pre('save', function (next) {
  // eslint-disable-next-line no-console
  console.log('Will save document....');
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
