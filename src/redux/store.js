import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import booksApi from './features/books/booksApi';
import ordersApi from './features/orders/ordersApi';
import bookRequestApi from './features/bookrequest/bookRequestApi';
import wishlistReducer from './features/wishlist/wishlistSlice';
export const store = configureStore({
  reducer: {
    cart: cartReducer,  // ✅ Cart slice added correctly
    wishlist: wishlistReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [bookRequestApi.reducerPath]: bookRequestApi.reducer,
    
  },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware,ordersApi.middleware,bookRequestApi.middleware),

  devTools: process.env.NODE_ENV !== 'production', // ✅ Enables Redux DevTools in development
});

export default store;
