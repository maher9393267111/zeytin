import {
    DocumentData,
    collection,
    doc,
    getCountFromServer,
    getDoc,
    getDocs,
    query,
    where,
    deleteDoc,
    updateDoc,
    addDoc,
    limit,
    orderBy,
    onSnapshot,
    serverTimestamp
  } from "firebase/firestore";
  import { db, storage } from "./firebaseConfig";
  import { message } from "antd";
  
  
  import {
    // to speceify the folder to save and retrive image from it
    ref,
    // to delete image from storage
    deleteObject,
    // to send image from website to firebase/storage
    uploadBytes,
    // to retrive image from storage
    getDownloadURL,
  } from "firebase/storage";
  
  import { v4 as uuidv4 } from "uuid";
  
  //step-1- get number of documents in one Collection
  export const getCount = async (col) => {
    //col --> {products , categories , subcategories,users,projects}
    const colRef = collection(db, col);
    const snapshot = await getCountFromServer(colRef);
    return snapshot.data().count;
  };
  
  function postToJSON(doc) {
    const data = doc.data();
  
    return {
      ...data,
      id: doc.id,
    };
  
  
    
  }
  
  export const calculateDiscountedPrice = (price ,discount) => {
    const discountedPrice = price - (price * discount) / 100;
    return discountedPrice.toFixed(2); // Rounded to 2 decimal places
  };
  
  
  
  
  export const getDocuments = async (col, querydata = null, limit = null) => {
    const queryConstraints = [];
    // query here is value from function {price === 200} or {name === adidas} ....
    if (querydata !== null) queryConstraints.push(where(...querydata));
    if (limit !== null) queryConstraints.push(limit(limit));
    //col motghayir marra category marra sub category marra production
  
    // where(..) , where(''') , where ....
    const ref = collection(db, col);
    // query here is method from firebase to filter data
    const docsRef = query(ref, ...queryConstraints);
    //  if query params is exist and limit is exist  filter data else show all data from collection
    const documents = (await getDocs(docsRef)).docs.map(postToJSON);
  
    return documents; //  [] array of data named categories
    //, products  , subcategories in /admin/.../all
  };
  
  // send userState from component to getData and set response data inside useState
  //  get data of specific collection with sorting by created time
  
  export const getDocumentsOrder = async (col, orderBy,search=null ,limitcount) => {
    // get products with cat or sub with filteration when search != null 
    //index.jsx products
    //category
    //? where("category", "==", category)
    //: subcategory
    //? where("subcategory", "==", subcategory)
    //: null
  let q = null
  
  //category exists or subcategory exists that means not null
  //search is about where index.jsx product page line 41,43
  if (search === null) {
    q = query(collection(db, col), orderBy ,limit !==null &&  limit(limitcount));
  }
  else {
    //all products without searching (null)
    q = query(collection(db, col), orderBy,search ,limit !==null &&  limit(limitcount));
  }
  
    //const q = query(collection(db, cal), orderBy);
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  };
  
  // -----------------------------
  
  // get Single item from firestore ==> ... product ,subcategory , category , review ...
  
  //col  is collection changeable  , id is id of doucment to get from firestore changeble
  
  export const getDocument = async (col, id) => {
    const document = postToJSON(await getDoc(doc(db, col, id)));
  
    return document;
  };
  
  export const handleDelete = (col, item, isproduct = false, isUser = false) => {
    message.info(`${isUser} DATA`);
  
    // path of document we well delete
    const itemDoc = doc(db, col, item.id);
    // delete document from firestore then delete document images
  
    deleteDoc(itemDoc).then(async () => {
      // specifu image folder and name to delete it => col is folder  image.name is image name will deleted from storage
  
      // from productsTable array of images delete
  
      if (isproduct) {
        deleteImages(item.images);
      }
      
      else {
        message.info(`${isUser} DATA`);
  
        message.info(` ${isUser ? item.avatarUrl : item?.image?.name} data`);
  
        // if function came from usersTable delete avatarUrl  else remove  item.image
  
        const desertRef = isUser
          ? ref(storage, `${col}/${item?.imageId}`)
          : ref(storage, `${col}/${item.image.name}`);
  
        // delete single image
        await deleteObject(desertRef);
      }
  
      window.location.reload();
    });
  };
  
  export const handleDeleteGlobal = (col, item) => {
    console.log("item", item);
    // path of document we well delete
    const itemDoc = doc(db, col, item.id);
    // delete document from firestore then delete document images
    deleteDoc(itemDoc).then(async () => {
      if (item.image) {
      await deleteImage(item?.image);
      message.success("Image deleted successfully");
      }
      
      window.location.reload();
    });
  };
  
  // -------------Products-------
  
  // error input antd design -----
  
  export const antdFieldValidation = [
    {
      required: true,
      message: "This field is required",
    },
  ];
  
  //Upload product array of images to firebase/storage
  //Upload array of images if isnotproduct = false else upload only one image for cat and subcat
  export const uploadImages = async (
    files,
    isnotProduct = false,
    col = "products"
  ) => {
    console.log("is--->", isnotProduct, col);
    // from category and sub category send true  -->  uploadImages(file ,true ,'cats');
    if (isnotProduct) {
      message.success("Image Uploaded");
      // files here is object one object
      const imageRef = ref(storage, `${col}/${uuidv4()}`);
      // send image to firebase/storage
      const res = await uploadBytes(imageRef, files);
  
      // retrive image from firebase/storage
      const url = await getDownloadURL(res.ref);
  
      return url;
    } else {
      // files here is array
      const urls = [];
      await Promise.all(
        files.map(async (file) => {
          // folder and image name to save image it  --> products/121212
          const imageRef = ref(storage, `products/${uuidv4()}`);
          // send image to firebase/storage
          const res = await uploadBytes(imageRef, file);
  
          // retrive image from firebase/storage
          const url = await getDownloadURL(res.ref);
  
          //// then add image Link to array
          urls.push(url);
        })
      );
  
      // all images link return {result of this function}
  
      return urls;
    }
  };
  
  // delete only one Image
  export const deleteImage = async (image) => {
    try {
      const deleteResponses = await deleteObject(ref(storage, image));
      message.success("single image deleted successfully");
  
      return deleteResponses;
    } catch (error) {
      throw error;
    }
  };
  
  export const deleteImages = async (images) => {
    try {
      const deleteResponses = await Promise.all(
        images.map((image) => deleteObject(ref(storage, image)))
      );
      return deleteResponses;
    } catch (error) {
      throw error;
    }
  };
  
  export const updateUserRole = async (userId, updatedRole) => {
    console.log("Updating user role", userId, updatedRole);
    if (["guest", "user", "admin"].includes(updatedRole)) {
      const usersCollection = doc(db, "users", userId);
  
      try {
        // Update the role attribute in the user document
        await updateDoc(usersCollection, { role: updatedRole });
        // successCallback();
        message.success("User role updated successfully");
  
        window.location.reload();
        //console.log("User role successfully updated!");
      } catch (error) {
        //  console.error("Error updating user role:", error);
        message.error("User role): " + error.message);
      }
    } else {
      console.error(
        "Invalid updatedRole parameter. Please provide 'guest', 'user', or 'admin'."
      );
    }
  };
  
  
  
  
  export const handleNotifications = async (uid,title, details, toastDesc) => {
    await addDoc(collection(db, `users/${uid}/notifications`), {
      title,
      details,
      timestamp: serverTimestamp(),
      read: "false",
    });
  message.success("Notification created successfully")
  };