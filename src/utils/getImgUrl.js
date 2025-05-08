function getImgUrl(name) {
    try {
      return require(`../assets/books/${name}`);
    } catch (e) {
      return require('../assets/books/p1.png'); // Use an existing image as fallback
    }
  }
  

  
  export { getImgUrl };