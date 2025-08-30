import { createContext, useContext, useMemo, useState, useCallback } from "react";

/**
 * Context for editing a single blog post's draft.
 */

const BlogItemContext = createContext(null);

export function BlogItemProvider({ initial, onCommit, children }) {
  /** Local editable copy of the blog. */
  const [draft, setDraft] = useState(() => structuredClone(initial));

  /** Update the blog's title. */
  const setTitle = useCallback((v) => setDraft((d) => ({ ...d, title: v })), []);

  /** Replace the blog's tags array. */
  const setTags = useCallback((arr) => setDraft((d) => ({ ...d, tags: arr })), []);

  /**
   * Update a single item in the body array at the given index.
   *
   * @param {number} index - The index in `draft.body` to update.
   * @param {*} value - The new value for that position.
   */
  const setBodyItem = useCallback(
    (index, value) =>
      setDraft((d) => {
        const newBody = Array.isArray(d.body) ? [...d.body] : [];
        if (index >= newBody.length) {
          newBody.push(value);
        } else {
          newBody[index] = value;
        }
        return { ...d, body: newBody };
      }),
    []
  );

  /** Delete a single item from the body array at the given index. */
  const deleteBodyItem = useCallback(
    (index) =>
      setDraft((d) => {
        const newBody = Array.isArray(d.body) ? [...d.body] : [];
        newBody.splice(index, 1);  // Remove the item at the specified index
        return { ...d, body: newBody };
      }),
    []
  );

  /** Push the current draft back up to the parent via onCommit. */
  const commit = useCallback(() => onCommit?.(draft), [draft, onCommit]);

  /** Reset the draft back to the original initial blog object. */
  const reset = useCallback(() => setDraft(structuredClone(initial)), [initial]);

  /**
   * Memoize the context value so children aren't forced to re-render
   * unless something they actually use has changed.
   */
  const value = useMemo(
    () => ({
      draft,
      setTitle,
      setTags,
      setBodyItem,
      deleteBodyItem,  // Include delete function
      commit,
      reset
    }),
    [draft, setTitle, setTags, setBodyItem, deleteBodyItem, commit, reset]
  );

  return <BlogItemContext.Provider value={value}>{children}</BlogItemContext.Provider>;
}

/**
 * Hook to consume the BlogItemContext.
 * Throws an error if used outside a BlogItemProvider.
 */
export function useBlogItem() {
  const ctx = useContext(BlogItemContext);
  if (!ctx) throw new Error("useBlogItem must be used within BlogItemProvider");
  return ctx;
}
