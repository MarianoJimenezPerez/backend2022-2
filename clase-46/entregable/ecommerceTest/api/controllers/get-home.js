module.exports = {


  friendlyName: 'Get home',


  description: '',


  inputs: {

  },


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/home2'
    },
    notFound: {
      description: 'No Products found',
      responseType: 'notFound'
    }
  },


  fn: async function (inputs) {

    var products = await Products.find();
    // All done.
    return {products: products};

  }


};
