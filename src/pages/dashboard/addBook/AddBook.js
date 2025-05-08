import React, { useState } from 'react'
import InputField from './InputField'
import SelectField from './SelectField'
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../../redux/features/books/booksApi';
import Swal from 'sweetalert2';
import './AddBook.css'; // Import the CSS file

const AddBook = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageFile, setimageFile] = useState(null);
    const [addBook, {isLoading, isError}] = useAddBookMutation()
    const [imageFileName, setimageFileName] = useState('')
    const onSubmit = async (data) => {
 
        const newBookData = {
            ...data,
            coverImage: imageFileName
        }
        try {
            await addBook(newBookData).unwrap();
            Swal.fire({
                title: "Book added",
                text: "Your book is uploaded successfully!",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, It's Okay!"
              });
              reset();
              setimageFileName('')
              setimageFile(null);
        } catch (error) {
            console.error(error);
            alert("Failed to add book. Please try again.")   
        }
      
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setimageFile(file);
            setimageFileName(file.name);
        }
    }
  return (
    <div className="add-book-container">
      <h2 style={{ marginTop: "10px" }} className="add-book-title">Add New Book</h2>

      {/* Form starts here */}
      <form onSubmit={handleSubmit(onSubmit)} className="">
        {/* Reusable Input Field for Title */}
        <InputField
         label="ID"
         name="_id"
         placeholder="Enter Book ID"
         type="number"
         register={register}
          />

        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />
         <InputField
  label="Author"
  name="author"
  placeholder="Enter Author"
  register={register}
/>

        {/* Reusable Textarea for Description */}
        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
        />

        {/* Reusable Select Field for Category */}
        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Choose A Category' },
            { value: 'Fiction', label: 'Fiction' },
            { value: 'Fantasy', label: 'Fantasy' },
            { value: 'Non-fiction', label: 'Non-fiction' },
            { value: 'Thriller', label: 'Thriller' },
            { value: 'Romance', label: 'Romance' },
            // Add more options as needed
          ]}
          register={register}
        />

        {/* Trending Checkbox */}
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              {...register('trending')}
              className="checkbox-input"
            />
            <span className="checkbox-text">Trending</span>
          </label>
        </div>

        {/* Old Price */}
        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
        />

        {/* New Price */}
        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
        />

        {/* Cover Image Upload */}
        <div className="form-group">
          <label className="file-label">Cover Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="file-input" />
          {imageFileName && <p className="file-name">Selected: {imageFileName}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          {isLoading ? <span>Adding.. </span> : <span>Add Book</span>}
        </button>
      </form>
    </div>
  )
}

export default AddBook