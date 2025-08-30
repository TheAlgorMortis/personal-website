import { useState, useCallback, useEffect, useMemo } from 'react';
import { BlogItemProvider, useBlogItem} from "../contexts/BlogContext.jsx"
import ImageButton from './ImageButton.jsx'
import rawBlogs from '../assets/posts.json'
import rawTags from '../assets/tags.json'
import './Bodies.css'

/* icon imports */
import { MdOutlineForum } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FiClock } from "react-icons/fi";
import { FaFileUpload } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

let blogs = [...rawBlogs];
let tagList = [...rawTags];

/**
 * React component to display everything relating to blogs
 *
 * @component
 *
 * @param {Object} props
 * @param {string} props.username - The username of the currently logged in user.
 *
 * @returns {JSX.Element} The rendered Blog component.
 */
export default function Blog( {username} ) {
  const editable = (username === "Algor");

  /* Get any posts stored locally */
  const storedBlogs = localStorage.getItem('blogs');
  if (storedBlogs) {
    blogs = JSON.parse(storedBlogs);
  }

  const storedTags = localStorage.getItem('tags');
  if (storedTags) {
    tagList = JSON.parse(storedTags);
  }

  const [posts, setPosts] = useState(blogs);
  const [postView, setPostView] = useState(-1);

  /**
   * create a new blog post and immediately start editing it.
   */
  const createNewPost = () => {
    const today = new Date();
    let newPost = {
      "title":"New post",
      "date":today.toISOString().split("T")[0],
      "tags":[],
      "body":[]
    };
    setPosts((prev) => {
      const updated = [...prev, newPost];
      setPostView(updated.length - 1);
      return updated;
    });
  }


  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(posts));
    }, [posts]
  );

  return (
    <>
      {postView === -1 ? (<BlogList tags={tagList} editable={editable} posts={posts} setPostView={setPostView} createNewPost={createNewPost} />) : (<BlogPost editable={editable} postIndex={postView} setPostView={setPostView} posts={posts} setPosts={setPosts} />)}
    </>
  )
}

/***********************************************
 * Components for the blog post list
 * ********************************************/

/**
 * React component to display a list of blog posts.
 *
 * @component
 *
 * @param {Object} props
 * @param {Object} props.tags - List of tags that posts can have
 * @param {boolean} props.editable - Whether posts are editable (and in this case, new
 * posts can be made)
 * @param {Object} props.posts - the posts
 * @param {Function} props.setPostView - the function to call when a post is
 * selected
 * @param {Function} props.createNewPost - the function to call when a post is
 * created
 *
 * @returns {JSX.Element} The rendered component.
 */
function BlogList( {tags, editable, posts, setPostView, createNewPost} ) {
  const [selected, setSelected] = useState([...posts.keys()]);
  const selectedSet = new Set(selected);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTags, setActiveTags] = useState([]);
  const [sortDate, setSortDate] = useState("Newest");

  return (
    <div>
      <h1 className="sectionHeading">Blog <MdOutlineForum /></h1>
      <ListFilter
        tags={tags}
        posts={posts}
        setSelected={setSelected}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeTags={activeTags}
        setActiveTags={setActiveTags}
        sortDate={sortDate}
        setSortDate={setSortDate}
      />
      {editable && (
        <button className="outerButton" onClick={createNewPost}><h2>Create New Post</h2></button>
      )}
      {selected.map((idx) => {
        const post = posts[idx];
        return post ? (
          <BlogPreview
            key={idx}
            index={idx}
            post={post}
            setPostView={setPostView}
            activeTags={activeTags}
            setActiveTags={setActiveTags}
            searchTerm={searchTerm}
          />
        ) : null;
      })}
    </div>
  )
}

/**
 * React component allowing filters to be made on the list of posts.
 *
 * @component
 *
 * @param {Object} props
 * @param {Object} props.tags - List of tags that posts can have
 * @param {Object} props.posts - the posts
 * @param {Function} props.setSelected - the function to call when the list is
 * @param {String} props.searchTerm - the search term searched for
 * @param {Function} props.setSearchTerm - the function to set the search term
 * @param {Object} props.activeTags - the selected tags
 * @param {Function} props.setActiveTags - the function to set the selected tags
 * @param {String} props.sortDate - the order of dates sorted by
 * @param {Function} props.setSortDate - function to set the date sort order
 *
 * @returns {JSX.Element} The rendered ListFilter component
 */
function ListFilter( {tags, posts, setSelected, searchTerm, setSearchTerm, activeTags, setActiveTags, sortDate, setSortDate}) {

  const key = (d) => (d ? String(d).trim().slice(0, 10) : "0000-00-00");

  const selectedIndices = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    const active = new Set(activeTags ?? []);

    return posts
      .map((p, i) => ({ p, i }))
      .filter(({ p }) => {
        const titleOk = !q || (p.title ?? "").toLowerCase().includes(q);
        const tagsOk =
          active.size === 0 || (p.tags ?? []).some((t) => active.has(t));
        return titleOk && tagsOk;
      })
      .sort((a, b) => {
        const A = key(a.p.date), B = key(b.p.date);
        return sortDate === "Newest" ? B.localeCompare(A) : A.localeCompare(B);
      })
      .map(({ i }) => i);
  }, [posts, searchTerm, activeTags, sortDate]);

  useEffect(() => {
      setSelected?.(selectedIndices);
    }, [selectedIndices, setSelected]);

  return (
    <div className="blogFilters">
      <ListSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ListTagGroup tags={tags} activeTags={activeTags} setActiveTags={setActiveTags} showReset={true} />
      <ListDate sortDate={sortDate} setSortDate={setSortDate} />
    </div>
  )
}

/*
 * React component used to search for posts
 *
 * @component
 *
 * @param {Object} props
 * @param {String} props.searchTerm - the term searched by
 * @param {Function} props.searchTerm - the function to call when the search
 * term changes
 *
 * @returns {JSX.Element} The rendered ListSearch component
 */
function ListSearch( {searchTerm, setSearchTerm} ) {
  return (
    <div className="searchBarGroup">
      <h3>Search</h3>
      <FaSearch/>
      <input
        className="searchBar"
        type="text"
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
      />
    </div>
  )
}

/**
 * React component allowing posts to be filtered by tags
 *
 * @component
 *
 * @param {Object} props
 * @param {Object} props.tags - List of tags that posts can have
 * @param {Object} props.activeTags - List of tags that are curretly selected
 * @param {Function} props.setActiveTags - the function to call when the active
 * tags list changes
 * @param {boolean} props.showReset - whether to do display the reset button
 *
 * @returns {JSX.Element} The rendered component
 */
function ListTagGroup( {tags, activeTags, setActiveTags, showReset} ) {

  /**
   * Add a tag to the filter
   * @param {String} tg - the tag to add
   */
  const handleAdd = (tg) => {
    setActiveTags((prev) => [...prev, tg]);
  }
  /**
   * remove a tag to the filter
   * @param {String} tg - the tag to remove
   */
  const handleRemove = (tg) => {
    setActiveTags((prev) => prev.filter((tag) => tag != tg));
  }
  /**
   * Reset the filter
   */
  const handleReset = (e)=> {
    setActiveTags([]);
  }

  return (
    <div className="tagFilter">
      {tags.map((tag)=>(<ListTagButton key={tag} tagName={tag} onActivate={()=>(handleAdd(tag))} onDeactivate={()=>(handleRemove(tag))} isActive={activeTags.includes(tag)}/>))}
      {showReset && (<button className="sectionButton" onClick={handleReset}>Reset Tag filters</button>)}
    </div>
  )
}


/**
 * React component allowing a tag to be selected for post filtering
 *
 * @component
 *
 * @param {Object} props
 * @param {Object} props.tagName - the name of the tag this button represents
 * @param {Function} props.onActivate - To call when a tag is activated
 * @param {Function} props.onDeactivate - To call when a tag is deactivated
 * @param {boolean} props.isActive - Whether the button is currently active.
 *
 * @returns {JSX.Element} The rendered component
 */
function ListTagButton( {tagName, onActivate, onDeactivate, isActive } ) {

  /**
   * Toggle active and inactive
   */
  const handleClick = (e) => {
    if (isActive) {
      onDeactivate();
    } else {
      onActivate();
    }
  }

  return (
    <button className={isActive ? "tagActive" : "tagButton"} onClick={handleClick}><h3>{tagName}</h3></button>
  )
}

/*
 * React component used to sort the post list by date.
 *
 * @component
 *
 * @param {Object} props
 * @param {String} props.sortDate - the order to sort by
 * @param {Function} props.setSortDate - the function to call to set the order
 * to sort by
 *
 * @returns {JSX.Element} The rendered ListDate component
 */
function ListDate( {sortDate, setSortDate} ) {
  let caption;
  let changeTo;
  let Icon;
  if (sortDate === "Newest") {
    Icon = FaSortAmountDown;
    caption = "Sorting from newest to oldest";
    changeTo = "Oldest";
  } else {
    Icon = FaSortAmountUp;
    caption = "Sorting from oldest to newest"
    changeTo = "Newest"
  }
  return (
    <button className="sectionButton" onClick={(e)=> {setSortDate(changeTo)}}><SlCalender/>{caption}<Icon/></button>
  )
}


/*
 * React component used to preview a blog post
 *
 * @component
 *
 * @param {Object} props
 * @param {number} props.index - the index of the post
 * @param {Object} props.post - the post itself
 * @param {Function} props.setPostView  function to call to return to the post
 * list
 * @param {Object} props.activeTags - the selected tags
 * @param {Function} props.setActiveTags - the function to set the selected tags
 * @param {String} props.searchTerm - the search term searched for
 *
 * @returns {JSX.Element} The rendered blog preview component
 */
function BlogPreview( {index, post, setPostView, activeTags, setActiveTags, searchTerm} ) {

  const titleSplit = splitBySubstring(post.title, searchTerm);

  return (
    <div className="sectionBlock">
      <h1 className>{titleSplit.preTotal}<span className="searchHighlight">{titleSplit.totalSub}</span>{titleSplit.postTotal}</h1>
      <h3 className="flexRow"><FiClock/> {post.date}</h3>
      <ListTagGroup tags={post.tags} activeTags={activeTags} setActiveTags={setActiveTags} showReset={false}/>
      <button className="sectionButtonLeft" onClick={()=>{setPostView(index)}}><h2>View Post</h2></button>
    </div>
  )
}

/**
 * Splits a string by a substring so that the substring can be highlighted
 *
 * @param {String} total - the full string
 * @param {String} totalSubstring - the substring to search by in total.
 *
 */
function splitBySubstring(total, totalSubstring) {
  if (totalSubstring === "") {
    return { preTotal: "", totalSub: "", postTotal: total };
  }

  const hay = total.toLowerCase();
  const needle = totalSubstring.toLowerCase();

  const i = hay.indexOf(needle);
  if (i === -1) return { preTotal: total, totalSub: "", postTotal: "" };

  const j = i + needle.length;
  return {
    preTotal:  total.slice(0, i),
    totalSub:  total.slice(i, j),
    postTotal: total.slice(j)
  };
}


/***********************************************
 * Components for individual blog posts
 * ********************************************/


/**
 * React component to display an individual blog post
 *
 * @component
 *
 * @param {Object} props
 * @param {boolean} props.editable - whether the post is editable
 * @param {number} props.postIndex - index of this post
 * @param {Function} props.setPostView  function to call to return to the post
 * list
 * @param {Object} props.posts - The full list of posts
 * @param {Function} props.setPosts - the function to update posts
 *
 * @returns {JSX.Element} The rendered component.
 */
function BlogPost( {editable, postIndex, setPostView, posts, setPosts} ) {
  /** Check if the content is editable, ie if the admin is logged in */

  /** Called when the user saves and exits */
  const handleCommit = useCallback(
    (updatedBlog) => {setPosts(prev => {
      const next = prev.map((p, i) => (i === postIndex ? updatedBlog : p));
      return next;
    });
      setPostView(-1);
    },
    [postIndex, setPosts, setPostView]
  );

  return (
    <>
      <BlogItemProvider initial={posts[postIndex]} onCommit={handleCommit}>
        <BlogContent editable={editable} setPostView={setPostView}/>
      </BlogItemProvider>
    </>
  )
}

/**
 * React component to display the content of a blog post
 *
 * @component
 *
 * @param {Object} props
 * @param {boolean} props.editable - whether the post is editable
 * @param {Function} props.setPostView  function to call to return to the post
 * list
 *
 * @returns {JSX.Element} The rendered component.
 */
function BlogContent ( {editable, setPostView}) {

  /* use functions to update the blog */
  const {draft, setTitle, setTags, setBodyItem, deleteBodyItem, commit, reset} = useBlogItem();

  return (
    <>
      <BlogTitle postTitle={draft.title} editable={editable} setTitle={setTitle} />
      <div className="blogInfo">
        <h3> Date created: {draft.date} </h3>
        <BlogTags postTags={draft.tags} editable={editable} setTags={setTags}/>
      </div>
      <BlogBody postBody={draft.body} editable={editable} setBodyItem={setBodyItem } deleteBodyItem={deleteBodyItem}/>
      {editable && (
        <>
          <button className="outerButton" onClick={commit}><h2>Update and Return</h2></button>
        </>
      )}
      {!editable && (<button className="outerButton" onClick={()=>{setPostView(-1)}}><h2>Return</h2></button>)}
    </>
  )
}

/**
 * React component to display the Title of a blog post
 *
 * @component
 *
 * @param {Object} props
 * @param {String} props.postTitle - The title of the post
 * @param {boolean} props.editable - whether the title is editable
 * @param {Function} props.setTitle - The function to call to change the tile
 * @returns {JSX.Element} The rendered component.
 */
function BlogTitle( {postTitle, editable, setTitle} ) {
  const [tempTitle] = useState(postTitle);
  return (
    <h1
      className="sectionHeading"
      contentEditable={editable}
      suppressContentEditableWarning
      onInput={(e)=>setTitle(e.currentTarget.textContent)}
    >
      {tempTitle}
    </h1>
  );
}

/**
 * React component to display the Taglist of a blog
 *
 * @component
 *
 * @param {Object} props
 * @param {Object} props.postTags - The tags of the post
 * @param {boolean} props.editable - whether the tags are editable
 * @param {Function} props.setTags - The function to call to change the tags
 *
 * @returns {JSX.Element} The rendered component.
 */
function BlogTags({ postTags, editable, setTags }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  /** When a tag is added */
  const handleClick = useCallback(() => {
    const v = value.trim().toLowerCase();
    /** If there is no added tag, return */
    if (!v) {
      setError("No tag entered")
      return;
    }

    /** Don't allow tags already on the post */
    if (postTags?.includes(v)) {
      setError("You already have this tag");
      return;
    }

    /** Add the tag */
    setTags([...(postTags ?? []), v]);
    setValue("");

    /** Add the tags to the tag list if its not already there */
    const storedTags = localStorage.getItem('tags');
    if (storedTags) {
      tagList = JSON.parse(storedTags);
    }
    if (!tagList.includes(v)) {
      const next = [...tagList, v];
      setError(`You have created the tag ${v}`);
      localStorage.setItem("tags", JSON.stringify(next));
    } else {
      setError(`You have added the tag ${v}`);
    }
  }, [value, postTags, setTags, setValue, setError]);

  return (
    <div className="tagFilter">
      <h3>Tags:</h3>
      {postTags.map(tag => (<div className="tag" key={tag}>{tag}</div>))}
      {!editable ||
        <div className="tagAdder">
          <input
            className="searchBar"
            type="text"
            value={value}
            onChange={(e)=> setValue(e.target.value)}
            placeholder="new tag"
          />
          <button className="sectionButton" onClick={handleClick}>Add Tag</button>
          {error && <div>{error}</div>}
        </div>
      }
    </div>
  )
}

/**
 * React component making up the paragraphs and images of a blog post
 *
 * @component
 *
 * @param {Object} props
 * @param {Object} props.postBody - The list of post body elements
 * @param {boolean} props.editable - whether the post body is editable
 * @param {Function} props.setBodyItem - function to add to the body
 * @param {Function} props.deleteBodyItem - function to delete from the body
 *
 * @returns {JSX.Element} The rendered component.
 */
function BlogBody( {postBody=[], editable, setBodyItem, deleteBodyItem} ) {

  /** Add a new body element depending on the type */
  const addBodyElement = useCallback(
    (type) => {
      const nextIndex = postBody.length;
      if (type === "text") {
        setBodyItem(nextIndex, {text:""});
      } else if (type === "images") {
        setBodyItem(nextIndex, {images:[]});
      }
    },
    [postBody.length, setBodyItem]
  );

  /** Determine how to render the individual items in the body */
  const renderBlock = useCallback(
    (block, index) => {
      if ("text" in block) {
        const value = block.text ?? "";
        return (<BlogParagraph
          key={'paragraphs' + index}
          value={value}
          editable={editable}
          onChange={(newText)=> setBodyItem(index, {text: newText})}
          onDelete={() => {deleteBodyItem(index)}}
        />
        )
      } else if ("images" in block) {
        const values= block.images ?? [];
        return (<BlogPictures
          key={'images' + index}
          position={index}
          images={values}
          editable={editable}
          updateImages={(newImages)=>setBodyItem(index, {images:newImages})}
          onDelete={() => {deleteBodyItem(index)}}
        />);
      }
      return null;
    },
    [editable, setBodyItem]
  );

  /** Return the component */
  return (
    <div>
      {postBody.map((block, index) => renderBlock(block,index))}
      {editable &&
      (<div className="addButtons">
        <button className="outerButton" onClick={()=>{addBodyElement("text")}}><h2>Add Paragraph</h2></button>
        <button className="outerButton" onClick={()=>{addBodyElement("images")}}><h2>Add Images</h2></button>
       </div>
      )}
    </div>
  )
}

/**
 * React component to display an individual blog paragraph
 *
 * @component
 *
 * @param {Object} props
 * @param {Object} props.value - The text
 * @param {boolean} props.editable - whether the paragraph is editable
 * @param {Function} props.onChange - function to change the text
 * @param {Function} props.onDelete - function to delete the paragraph
 *
 * @returns {JSX.Element} The rendered component.
 */
function BlogParagraph( {value, editable, onChange, onDelete} ) {
  const [text] = useState(value);
  return (
    <div className="paragraphEditor">
      <p
        className="sectionBlock"
        contentEditable={editable}
        suppressContentEditableWarning
        onInput={(e)=> onChange(e.currentTarget.textContent)}
      >
        {text}
      </p>
      {editable && (<button className="addPicture" onClick={onDelete}><RiDeleteBin6Line /></button>)}
    </div>
  )
}

/**
 * React component to display an image list
 *
 * @component
 *
 * @param {Object} props
 * @param {number} props.position - for key indexing
 * @param {Object} props.images - the image list
 * @param {boolean} props.editable - whether the images are editable
 * @param {Function} props.updateImages - function to update the image list
 * @param {Function} props.onDelete - function to delete the images
 *
 * @returns {JSX.Element} The rendered component.
 */
function BlogPictures( {position, images=[], editable, updateImages, onDelete} ) {
  const toUrl = (name) => new URL(name, import.meta.url).href;

  const addPic = useCallback((pic) => {
    if (pic !== '') {
      updateImages([...images,pic]);
    }
  }, [images, updateImages]);

  const removePic = useCallback(
    (index) => {
      updateImages(images.filter((_, i) => i !== index));
    },
    [images, updateImages]
  );

  return (
    <div className="blogPictures">
      {images.map((img, index) => (<ImageWithButton key={position + "list,ind" + index} src={toUrl(img)} onButtonClick={()=>{removePic(index)}} editable={editable}/>))}
      {!editable || (
        <>
          <ImageButton className="addPicture" caption="" setFunc={addPic} icon={(<FaFileUpload/>)} />
          <button className="addPicture" onClick={onDelete}><RiDeleteBin6Line /></button>
        </>
      )}
    </div>
  )
}

/**
 * React image with a delete button
 *
 * @component
 *
 * @param {Object} props
 * @param {Object} props.src - the image source
 * @param {boolean} props.editable - whether the image can be deleted
 * @param {Function} props.onButtonClick - what to do when the delete button is
 * clicked
 *
 * @returns {JSX.Element} The rendered component.
 */
function ImageWithButton({ src, onButtonClick, editable}) {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <img src={src} className="blogPicture"/>
      {editable && (
      <button
        onClick={onButtonClick}
        className="delButton"
      >
        <h2><RiDeleteBin6Line /></h2>
      </button>
      )}
    </div>
  );
}
