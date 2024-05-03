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
    const island = await this.get(id);

    if (payload.title?.trim()) {
      island.set("title", payload.title.trim());
    }

    if (payload.short_info?.trim()) {
      island.set("short_info", payload.short_info.trim());
    }

    if (payload.description?.trim()) {
      island.set("description", payload.description.trim());
    }

    await island.save();

    return island;
  };
}

export default Island;
