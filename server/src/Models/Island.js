class Island {
  static find = async (requestParameters) => {
    let query = new Parse.Query("Islands");

    if (requestParameters.term && requestParameters.term.trim().length > 0) {
      const termToSearch = requestParameters.term.trim();

      query
        .fullText("title", termToSearch)
        .fullText("short_info", termToSearch)
        .fullText("description", termToSearch);
    }

    return query.ascending("order").find();
  };

  static get = async (id) => {
    return await new Parse.Query("Islands").get(id);
  };

  static update = async (id, payload) => {
    const island = await self.get(id);

    if (title?.trim()) island.set("title", payload.title);
    if (short_info?.trim()) island.set("short_info", payload.short_info);
    if (description?.trim()) island.set("description", payload.description);

    island.set("title", title);
    island.set("short_info", short_info);
    island.set("description", description);

    await island.save();

    return island;
  };
}

export default Island;
