class APIFeatures {
  constructor(query, queryString) {
    // query is the Mongoose query (eg. Tour.find())
    // The advandtage is that we will be able to easily chain methods to the query object that we have created later on.
    this.query = query;
    // queryString is the query string that we have access to via Express (ie req.query)
    this.queryString = queryString;
    // On pourra de ce fait, utiliser notre classe avec d'autres modèles de l'API.
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B°) Advance filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt\b)/g, (match) => `$${match}`);
    // let query = Tour.find(JSON.parse(queryString));

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
    //  by returning this, we return the entire object, which in turn has access to the others methods of the class which enables chaining.
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;