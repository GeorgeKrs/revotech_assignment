class Session {
  constructor(sessionToken) {
    this.sessionToken = sessionToken;
  }

  /*
   *
   *  Public Methods
   *
   */
  get = async () => {
    const sessionCollection = await Parse.Object.extend("_Session");

    return await new Parse.Query(sessionCollection)
      .equalTo("sessionToken", this.sessionToken)
      .first({ useMasterKey: true });
  };

  delete = async () => {
    const session = await this.get();

    if (session) {
      await session.destroy({ useMasterKey: true });
    }
  };
}

export default Session;
