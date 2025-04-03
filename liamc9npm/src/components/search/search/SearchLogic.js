// searchLogic.js
import Fuse from 'fuse.js';
import { useMemo, useState, useEffect } from 'react';

const defaultFuseOptions = {
  keys: ['title'],
  threshold: 0.4,  // Adjusts fuzziness (0 = exact match, 1 = match anything)
  // You can include other default Fuse.js options here
};

export function createFuseInstance(items, options = {}) {
  const fuseOptions = { ...defaultFuseOptions, ...options };
  return new Fuse(items, fuseOptions);
}

export function performFuzzySearch(fuseInstance, query) {
  if (!query.trim()) return [];
  const results = fuseInstance.search(query);
  // Extract the original items from Fuse results
  return results.map(result => result.item);
}

export function useFuzzySearch(items, options = {}) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Create a memoized Fuse instance so it doesn't get recreated unnecessarily
  const fuseInstance = useMemo(() => createFuseInstance(items, options), [items, options]);

  useEffect(() => {
    const results = performFuzzySearch(fuseInstance, query);
    setSuggestions(results);
  }, [query, fuseInstance]);

  return { query, setQuery, suggestions };
}



export function SearchLogic({ items, onSearch, historyItems = [] }, fuseOptions = {}) {
    const [isOpen, setIsOpen] = useState(false);
    const { query, setQuery, suggestions } = useFuzzySearch(items, fuseOptions);
    const [lastQuery, setLastQuery] = useState('');
  
    const open = () => setIsOpen(true);
    const close = () => {
      setIsOpen(false);
      setQuery('');
    };
  
    const handleInputChange = (e) => {
      const newQuery = e.target.value;
      setQuery(newQuery);
      if (onSearch) onSearch(suggestions);
    };
  
    const handleSuggestionClick = (suggestion) => {
      const newQuery = suggestion.title;
      setQuery(newQuery);
      setLastQuery(newQuery);
  
      if (onSearch) {
        const updatedSuggestions = items.filter(item =>
          item.title.toLowerCase().includes(newQuery.toLowerCase())
        );
        onSearch(updatedSuggestions);
      }
      close();
    };
  
    const handleSearchForClick = () => {
      if (onSearch) onSearch(suggestions);
      setLastQuery(query);
      close();
    };
  
    return {
      isOpen,
      open,
      close,
      query,
      setQuery,
      suggestions,
      lastQuery,
      handleInputChange,
      handleSuggestionClick,
      handleSearchForClick,
    };
  }

  export default SearchLogic;