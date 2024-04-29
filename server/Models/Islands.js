class Island {
  static find = async () => {
    return await new Parse.Query("Islands").ascending("order").find();
  };

  static get = async (id) => {
    return await new Parse.Query("Islands").get(id);
  };
}

export default Island;
