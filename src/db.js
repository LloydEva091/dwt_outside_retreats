import Dexie from "dexie";
import { useLiveQuery } from "dexie-react-hooks";

export const db = new Dexie("retreat-photos");
db.version(1).stores({
  photos: "id", // Primary key, don't index photos
});

async function addPhoto(id, file) {
  console.log("addPhoto", file.size, id);
  try {
    const reader = new FileReader();
    reader.onload = async () => {
      const imgSrc = reader.result;
      // Save the new photo with id as key for todo array in localStorage
      // to avoid having a second pk for one todo item
      const i = await db.photos.add({
        id: id,
        imgSrc: imgSrc,
      });
      console.log(
        `Photo ${file.size} bytes successfully added. Got id ${i}`
      );
    };
    reader.readAsDataURL(file);
  } catch (error) {
    console.log(`Failed to add photo: ${error}`);
    throw new Error("Failed to add photo from database");
  }
}

async function updatePhoto(id, file) {
  console.log("updatePhoto", file.size, id);
  try {
    const existingPhoto = await db.photos.where("id").equals(id).first();
    // Compare the size and type of the new file with the existing one
    if (
      existingPhoto &&
      file.size === existingPhoto.size &&
      file.type === existingPhoto.type
    ) {
      console.log("File is the same as existing photo. No update needed.");
      return;
    }
    // Delete the previous photo with the given id
    if (existingPhoto) {
      await db.photos.where("id").equals(id).delete();
    }
    const reader = new FileReader();
    reader.onload = async () => {
      const imgSrc = reader.result;
      // Add the new photo with the same id
      const i = await db.photos.add({
        id: id,
        imgSrc: imgSrc,
      });
      console.log(
        `Photo ${file.size} bytes successfully updated. Got id ${i}`
      );
    };
    reader.readAsDataURL(file);
  } catch (error) {
    console.log(`Failed to update photo: ${error}`);
    throw new Error("Failed to update photo from database");
  }
}
async function removePhoto(id) {
  console.log("removePhoto", id);
  try {
    // Delete the photo with the given id
    await db.photos.where("id").equals(id).delete();
    console.log(`Photo ${id} successfully removed.`);
  } catch (error) {
    console.log(`Failed to remove photo: ${error}`);
    throw new Error("Failed to remove photo from database");
  }
}
async function getPhoto(id) {
  try {
    const photo = await db.photos.get(id);
    return photo;
  } catch (error) {
    console.error("Error fetching photo:", error);
    throw new Error("Failed to get photo from database");
  }
}

function GetPhotoSrc(id) {
  // Define a function to retrieve the image source from the database using the given id.
  const img = useLiveQuery(
    () => db.photos.where("id").equals(id).toArray(), // Retrieve the image with the given id from the database
    [id] // Re-run the query when the id changes
  );

  // Check if the retrieved image is valid, and return the image source if so.
  if (Array.isArray(img) && img.length > 0) {
    return img[0].imgSrc;
  } else {
    return null; // Return null if the image is not found or invalid
  }
}
export { getPhoto, addPhoto, GetPhotoSrc, updatePhoto, removePhoto };
