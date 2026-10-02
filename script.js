let post = [];

const form = document.getElementById("post-form");
const titleInput = document.getElementById("post-title");
const contentInput = document.getElementById("post-content");
const titleError = document.getElementById("title-error");
const contentError = document.getElementById("content-error");
const postList = document.getElementById("post-list");
const emptyMsg = document.getElementById("empty-msg");

    //sumbitting a post
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    let valid = true;

    //goes back to blank
    titleError.textContent = "";
    contentError.textContent = "";

    // making error messages pop up if not correct 
    if (title === "") {
        titleError.textContent = "Title is required.";
        valid = false;
      }
      if (content === "") {
        contentError.textContent = "Content is required.";
        valid = false;
      }
      if (!valid) return;

    //adding the post and then the for reset to blank 
      addPost(title, content);
      form.reset();
    });

    // function to add/delete a post  
function addPost(title, content) {
    // save post in the array (newest goes first)
    post.unshift({ title: title, content: content });
    
    };
    savePosts();
    renderPosts();



function deletePost(id) {
    posts = posts.filter(function (item) {
        return item.id !== id;
    });
    savePosts();
    renderPosts();
}
    //drawing list
function renderPosts() {
    // clear what's currently shown, but keep the empty message element
    postList.querySelectorAll(".post").forEach(el => el.remove());

    // show "No posts yet." only when the array is empty
    emptyMsg.style.display = post.length === 0 ? "block" : "none";

    post.forEach(function (item) {
        const article = document.createElement("article");
        article.className = "post";

        const h3 = document.createElement("h3");
        h3.textContent = item.title;

        const p = document.createElement("p");
        p.textContent = item.content;

        article.append(h3, p);
        postList.appendChild(article);
    });
}

// local storage
function savePosts() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (err) {
        console.error("Could not save posts:", err);
    }
}

function loadPosts() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        posts = saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error("Could not load posts:", err);
        posts = [];
    }
}

//loading the pages
loadPosts();
renderPosts();





