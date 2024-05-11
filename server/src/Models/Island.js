import sharp from "sharp";

class Island {
  constructor(island) {
    this.island = island;
  }

  /*
   *
   *  Static Methods
   *
   */
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

  /*
   *
   *  Public Methods
   *
   */
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

    if (this.island.get("photo") !== payload.photo && "photo" in payload) {
      await this.#handlePhotoUpdate(payload.photo, sessionToken);
    }

    await this.island.save(null, {
      sessionToken,
    });

    return this.island;
  };

  /*
   *
   *  Private Methods
   *
   */
  #handlePhotoUpdate = async (encodedPhoto, sessionToken) => {
    /*
     * Store new photo
     */
    const photoExtension = this.#getFileExtension(encodedPhoto);

    const photo = new Parse.File(
      this.island.get("title") + "." + photoExtension,
      {
        base64: encodedPhoto,
      }
    );

    await photo.save(null, { sessionToken });
    this.island.set("photo", photo.url());

    /**
     * Create thumbnail from new photo
     */
    const base64ToImage = encodedPhoto.split(";base64,").pop();
    const imageBuffer = Buffer.from(base64ToImage, "base64");

    const processedBuffer = await sharp(imageBuffer)
      .resize(
        parseInt(process.env.THUMB_HEIGHT),
        parseInt(process.env.THUMB_WIDTH)
      )
      .toFormat("jpg")
      .toBuffer();

    const imageToBase64 = `data:image/${photoExtension};base64,${processedBuffer.toString(
      "base64"
    )}`;

    const thumbnail = new Parse.File(
      this.island.get("title") + "_thumb." + photoExtension,
      { base64: imageToBase64 }
    );

    await thumbnail.save(null, { sessionToken });
    this.island.set("photo_thumb", thumbnail.url());
  };

  #getFileExtension(base64String) {
    /**
     * Regex to extract the content type from the base64String
     */
    const result = base64String.match(/^data:(.*?);base64,/);

    if (result && result.length > 1) {
      /**
       * Example: image/jpeg
       */
      const mimeType = result[1];
      const parts = mimeType.split("/");
      /**
       * Example: return jpeg
       */
      return parts[1];
    }

    throw new Error(
      "Invalid or unsupported data format on Island.getFileExtension"
    );
  }
}

export default Island;
