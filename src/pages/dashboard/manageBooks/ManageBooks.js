import React from 'react'
import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../../redux/features/books/booksApi';
import { Link, useNavigate } from 'react-router-dom';
import './ManageBooks.css'; // Import the CSS file

const ManageBooks = () => {
    const navigate = useNavigate();

    const {data: books, refetch} = useFetchAllBooksQuery()

    const [deleteBook] = useDeleteBookMutation()

    // Handle deleting a book
    const handleDeleteBook = async (id) => {
        try {
            await deleteBook(id).unwrap();
            alert('Book deleted successfully!');
            refetch();

        } catch (error) {
            console.error('Failed to delete book:', error.message);
            alert('Failed to delete book. Please try again.');
        }
    };

    // Handle navigating to Edit Book page
    const handleEditClick = (id) => {
        navigate(`dashboard/edit-book/${id}`);
    };
  return (
    <section className="books-section">
      <div className="container">
        <div className="books-card">
            <div className="card-header">
                <div className="header-container">
                    <div className="header-title">
                        <h3>All Books</h3>
                    </div>
                    <div className="header-action">
                        <button className="btn-primary" type="button">See all</button>
                    </div>
                </div>
            </div>

            <div className="table-container">
                <table className="books-table">
                    <thead>
                        <tr>
                            <th className="table-header">ID</th>
                            <th className="table-header">Book Title</th>
                            <th className="table-header">Author</th>
                            <th className="table-header">Category</th>
                            <th className="table-header">Price</th>
                            <th className="table-header">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            books && books.map((book, index) => (
                                <tr key={index}>
                                <th className="table-cell-id">
                                   {book._id}
                                </th>
                                <td className="table-cell">
                                    {book.title}
                                </td>
                                <td className="table-cell">
                                    {book.author}
                                </td>
                                <td className="table-cell-center">
                                  {book.category}
                                </td>
                                <td className="table-cell">
                                    ${book.newPrice}
                                </td>
                                <td className="table-cell-actions">
                                    <Link to={`/dashboard/edit-book/${book._id}`} className="edit-link">
                                        Edit
                                    </Link>
                                    <button 
                                    onClick={() => handleDeleteBook(book._id)}
                                    className="delete-btn">Delete</button>
                                </td>
                            </tr> 
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </section>
  )
}

export default ManageBooks