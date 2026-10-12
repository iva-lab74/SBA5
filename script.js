let posts = [];
const STORAGE_KEY = "blog-posts";

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

    
    addPost(title, content);
    form.reset();
});

// function to add/delete a post / save post in the array (newest goes first)

function addPost(title, content) {
    posts.unshift({ id: Date.now(), title: title, content: content });
    savePosts();
    renderPosts();
}


function deletePosts(id) {
    posts = posts.filter(function (item) {
        return item.id !== id;
    });
    savePosts();
    renderPosts();
}

//drawing list

function renderPosts() {
    // clear what's currently shown, but keep the empty message element
    postList.querySelectorAll(".post").forEach(function (el) { el.remove()});

    // show "No posts yet." only when the array is empty
    emptyMsg.style.display = posts.length === 0 ? "block" : "none";

    posts.forEach(function (item) {
        const article = document.createElement("article");
        article.className = "post";

        const h3 = document.createElement("h3");
        h3.textContent = item.title;

        const p = document.createElement("p");
        p.textContent = item.content;

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", function () {
            deletePosts(item.id);
        });

        article.append(h3, p, delBtn);
        postList.appendChild(article);
    });
}

// local storage
function savePosts() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (error) {
        console.error("Could not save posts:", error);
    }
}

function loadPosts() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        posts = saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error("Could not load posts:", error);
        posts = [];
    }
}

//loading the pages
loadPosts();
renderPosts();





