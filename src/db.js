// db.js
import Dexie from 'dexie'
import { useLiveQuery } from 'dexie-react-hooks'

export const db = new Dexie('retreat-photos')
db.version(1).stores({
    photos: 'id' // Primary key, don't index photos
})


async function addPhoto(id, file) {
    console.log('addPhoto', file.size, id);
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
        console.log(`Photo ${file.size} bytes successfully added. Got id ${i}`);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.log(`Failed to add photo: ${error}`);
    }
  }
  

  function GetPhotoSrc(id) {
    // console.log('getPhotoSrc', id)
    const img = useLiveQuery(
      () => db.photos.where('id').equals(id).toArray(),
      [id]
    )
    // console.table(img)
  
    if (Array.isArray(img) && img.length > 0) {
      return img[0].imgSrc
    } else {
      return null // or handle the case where img is not found
    }
  }
  

export {addPhoto, GetPhotoSrc}