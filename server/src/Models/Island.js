class Island {
  constructor(island) {
    this.island = island;
  }

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

  update = async (payload, sessionToken) => {
    if (payload.title?.trim()) {
      this.island.set("title", payload.title.trim());
    }

    if (payload.short_info?.trim()) {
      this.island.set("short_info", payload.short_info.trim());
    }

    if (payload.description?.trim()) {
      this.island.set("description", payload.description.trim());
    }

    await this.island.save(null, {
      sessionToken,
    });

    return this.island;
  };
}

export default Island;
