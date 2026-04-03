import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const BookmarkContext = createContext();

export function useBookmarks() {
  return useContext(BookmarkContext);
}

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('eventify_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('eventify_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (id, requireAuth) => {
    if (requireAuth && !requireAuth('bookmark')) return;
    setBookmarks(prev => {
      const isBookmarked = prev.includes(id);
      if (isBookmarked) {
        toast.success('Removed!');
        return prev.filter(b => b !== id);
      } else {
        toast.success('Saved!');
        return [...prev, id];
      }
    });
  };

  const removeBookmark = (id) => {
    setBookmarks(prev => prev.filter(b => b !== id));
    toast.success('Event removed from your bookmarks');
  };

  const isBookmarked = (id) => bookmarks.includes(id);

  const value = {
    bookmarks,
    toggleBookmark,
    removeBookmark,
    isBookmarked
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
}
