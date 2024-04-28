class Island {
  // static createSchema = async () => {
  //   const schema = new Parse.Schema("Island");

  //   schema.addString("photo_thumb");
  //   schema.addNumber("order");
  //   schema.addString("url");
  //   schema.addString("short_info");
  //   schema.addFile("photo");
  //   schema.addGeoPoint("location");
  //   schema.addString("title");
  //   schema.addString("description");
  //   schema.addIndex("createdAtIndex", { createdAt: 1 });

  //   await schema.save();
  // };

  static fetch = async () => {
    const results = await new Parse.Query("Islands").find();

    return results.map((island) => island.toJSON());
  };
}

export default Island;
