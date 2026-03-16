import imagekit from "./imageKitConfig.js";

export const uploadFoodImage = async (req, res) => {
  try {

    const file = req.file; // from multer

    const response = await imagekit.upload({
      file: file.buffer.toString("base64"),
      fileName: file.originalname,
      folder: "/foods",
    });

    res.json({
      success: true,
      imageUrl: response.url
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};