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
}

export default Island;
