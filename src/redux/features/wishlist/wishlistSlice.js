import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    wishlistItems: [],
};

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            // Check if item already exists in wishlist
            const existingIndex = state.wishlistItems.findIndex(
                item => item._id === action.payload._id
            );
            
            if (existingIndex === -1) {
                // Item doesn't exist in wishlist, add it
                state.wishlistItems.push(action.payload);
            }
        },
        removeFromWishlist: (state, action) => {
            state.wishlistItems = state.wishlistItems.filter(
                item => item._id !== action.payload._id
            );
        },
        clearWishlist: (state) => {
            state.wishlistItems = [];
        },
        moveToCart: (state, action) => {
            // This doesn't actually modify the wishlist state
            // The corresponding thunk will handle cart operations
            
            // Here we only remove the item from wishlist
            state.wishlistItems = state.wishlistItems.filter(
                item => item._id !== action.payload._id
            );
        },
    },
});

// Action creators are generated for each reducer function
export const { 
    addToWishlist, 
    removeFromWishlist, 
    clearWishlist,
    moveToCart
} = wishlistSlice.actions;

// Thunk for moving item from wishlist to cart
export const moveItemToCart = (product) => (dispatch, getState) => {
    // First add to cart with quantity 1
    dispatch({
        type: 'cart/addToCart',
        payload: { ...product, quantity: 1 }
    });
    
    // Then remove from wishlist
    dispatch(removeFromWishlist(product));
};

export default wishlistSlice.reducer;