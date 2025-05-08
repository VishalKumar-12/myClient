import React from 'react';
import about from "../../assets/About.png";

export const AboutPage = () => {
  const styles = {
    container: {
      padding: '40px 20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      lineHeight: 1.7,
      backgroundColor: '#fdfdfd',
      color: '#333',
    },
    heading: {
      fontSize: '40px',
      color: '#2c3e50',
      textAlign: 'center',
      marginBottom: '20px',
    },
    subHeading: {
      fontSize: '24px',
      color: 'black',
      marginTop: '60px',
      textAlign: 'left',
    },
    image: {
      display: 'block',
      margin: '0 auto',
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '10px',
    },
    paragraph: {
      fontSize: '18px',
      margin: '20px auto',
      maxWidth: '1500px',
      textAlign: 'justify',
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Us</h1>
      <img src={about} alt="About" style={styles.image} />
      <h2 style={styles.subHeading}>
        BookNest: Where Every Genre, Every Author, Every Book Finds a Home
      </h2>

      <p style={styles.paragraph}>
        In the Great Green Room, there was a telephone… and a little bunny who sparked a lifelong love for stories.
        Just like Margaret Wise Brown’s ‘Goodnight Moon’, we at BookNest, began with a simple tale – a tale of love for books.
      </p>

      <p style={styles.paragraph}>
        Our story resonates with the journey of Liesel Meminger in Markus Zusak’s ‘The Book Thief’. Just as she discovered
        the captivating world of books amidst turmoil, so did we. We promised to deliver a universe of stories to every reader’s doorstep.
      </p>

      <p style={styles.paragraph}>
        Fast-forward to today, and the BookNest community is a robust 300,000+ followers strong on Instagram (@BookNest). Each follower is a
        testament to our shared love for books. Much like the magical creatures in J.K. Rowling’s ‘Fantastic Beasts’, each follower is unique,
        contributing to our diverse and vibrant bibliophile’s paradise.
      </p>

      <p style={styles.paragraph}>
        Just like ‘The Little Prince’ by Antoine De-Saint Exupéry, we believed we could make every genre, every author, every book accessible to all.
        Be it the mysterious codes in ‘The Da Vinci Code’ by Dan Brown or the gripping narratives of ‘To Kill a Mockingbird’ by Harper Lee, we’ve got you covered.
      </p>

      <p style={styles.paragraph}>
        Indeed, our passion for books runs as deep as the bond between Elizabeth and her beloved Mr. Darcy in ‘Pride and Prejudice’.
        Just as they found love in the unexpected, we found our purpose in the pages of countless books.
      </p>

      <p style={styles.paragraph}>
        Our Purpose isn’t just about selling books. It’s about fostering a love for reading. Inspired by the journey of the protagonist
        in Robin Sharma’s ‘The Monk Who Sold His Ferrari’, we initiated a movement to donate books—ensuring that every story finds a reader and every book a home.
      </p>

      <p style={styles.paragraph}>
        As we grew, so did our library. Each book, each reader added a new chapter to our story. Together, we’ve built not just a bookstore, but a library.
        A library reminiscent of the expansive world in J.R.R. Tolkien’s ‘The Lord of the Rings’, filled with endless stories waiting to be discovered.
      </p>

      <p style={styles.paragraph}>
        Welcome to BookNest — India’s fastest-growing online bookstore. A world woven with words, where every story counts and every reader matters!
        We’re dedicated to making reading accessible and affordable, featuring everything from the latest releases to timeless classics.
      </p>
    </div>
  );
};
