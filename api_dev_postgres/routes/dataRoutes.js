const { db } = require("../utils/admin");

const {
  getProductById,
  getJacketsLimit4,
  getBeltsLimit4,
  getBagsLimit4,
  getWalletsLimit4,
} = require("../utils/query/dataQuery");
const { productInterpolation } = require("../utils/changeDataInterpolation");

exports.home = async (req, res) => {
  let productData = {};
  try {
    let jacketsQuery = await db.query(getJacketsLimit4());
    let bagsQuery = await db.query(getBagsLimit4());
    let walletsQuery = await db.query(getWalletsLimit4());
    let beltsQuery = await db.query(getBeltsLimit4());
    productData.jackets = productInterpolation(jacketsQuery.rows);
    productData.wallets = productInterpolation(walletsQuery.rows);
    productData.bags = productInterpolation(bagsQuery.rows);
    productData.belts = productInterpolation(beltsQuery.rows);

    res.status(200).json({ productData });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.viewAll = async (req, res) => {
  let categoryData = [];
  let key = req.params.key;

  //Paginate
  let limit = 8;
  let page = parseInt(req.query.page);

  //SORT
  let sortBy = req.query.sortBy;
  let sortOrder = req.query.sortOrder === "" ? "asc" : req.query.sortOrder;

  //Filter
  let category1 = req.query.category1;
  let category3 = req.query.category3;

  console.log(page);
  console.log("Sort Order", category1);
  var v = 1;
  try {
    // var query = db
    //   .collection("products")
    //   .where("category2", "==", key)
    //   .limit(8)
    //   .offset(page * limit);
    var query = {
      text: `SELECT * FROM products WHERE category2 = $${v} `,
      values: [key],
    };
    console.log(query);

    if (category1) {
      console.log("Category1 Run");
      v++;
      query.text = query.text + `AND category1 = $${v} `;
      query.values = [...query.values, category1];
    }
    if (category3) {
      console.log("Category3 Run");
      v++;
      query.text = query.text + `AND category3 = $${v} `;
      query.values = [...query.values, category3];
    }
    if (sortBy) {
      console.log("Sort Run");
      query.text = query.text + `ORDER BY ${sortBy} ${sortOrder} `;
    }

    query.text = query.text + `LIMIT 8 OFFSET ${page * limit}`;
    console.log(query);

    // let finalQuery = await query.get();
    let categoriesQuery = await db.query(query);
    // let categories = categoriesQuery.docs[0].data()[key];
    // let categoryData = getData(finalQuery.docs);
    let categoryData = categoriesQuery.rows;
    // console.log(categoryData);
    let cat = await db.query({
      text: "SELECT * FROM categories where category2 = $1",
      values: [key],
    });
    let categories = cat.rows[0];
    console.log(categoryData.map((cat) => cat.discounted_price));

    let paginateInfo = {
      key,
      page,
      limit,
      category1,
      category3,
      sortBy,
      sortOrder,
      categories,
    };
    // paginateInfo.hasMore = !finalQuery.empty;

    // categoryData.forEach((data, i) => console.log(data.discounted_price))
    // console.log(paginateInfo);
    res.status(200).json({ categoryData, paginateInfo });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.fetchProductById = async (req, res) => {
  let productId = req.query.productId;
  if (productId == undefined) {
    res.status(400).json({ errors: "No ID provided" });
    return;
  }
  let arrOfId = productId.split(", ");
  let arrofProducts = [];

  arrOfId.forEach(async (id, index) => {
    try {
      let response = await db.query(getProductById(id));
      console.log(response.rowCount);
      if (!response.rowCount == 0) {
        let product = productInterpolation(response.rows)[0];
        arrofProducts.push(product);
      } else {
        res.status(400).json({ errors: "No such product" });
        return;
      }
      if (arrOfId.length == index + 1) {
        res.status(200).json({ arrofProducts });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
};
