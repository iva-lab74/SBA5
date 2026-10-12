let posts = [];
const STORAGE_KEY = "blog-posts";
let editingId = null; //left open for edits

const form = document.getElementById("post-form");
const titleInput = document.getElementById("post-title");
const contentInput = document.getElementById("post-content");
const titleError = document.getElementById("title-error");
const contentError = document.getElementById("content-error");
const postList = document.getElementById("post-list");
const emptyMsg = document.getElementById("empty-msg");
const submitBtn = document.getElementById("submit-btn");

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

    //edits
     if (editingId === null) {
        addPost(title, content);
    } else {
        updatePost(editingId, title, content);
    }
    form.reset();

});

// function to add/delete a post / save post in the array (newest goes first)

function addPost(title, content) {
    posts.unshift({ id: Date.now(), title: title, content: content });
    savePosts();
    renderPosts();
}


function deletePosts(id) {
    if (editingId === id) {
        editingId = null;
        submitBtn.textContent = "Submit";
        form.reset();
    }

    posts = posts.filter(function (item) {
        return item.id !== id;
    });
    savePosts();
    renderPosts();
}

//make edits on posts
function makeEdit(id) {
    const postEdit = posts.find(function (item) {
        return item.id === id;
    });
    if (!postEdit) return;

    editingId = id;
    titleInput.value = postEdit.title;
    contentInput.value = postEdit.content;
    submitBtn.textContent = "Update"
}

//making the update
function updatePost( id, title, content) {
    posts.forEach(function (item) {
        if (item.id === id) {
            item.title = title;
            item.content = content;
        }
    });

    editingId = null;
    submitBtn.textContent = "Submit";
    savePosts();
    renderPosts();
}


//drawing list

function renderPosts() {
    // clear what's currently shown, but keep the empty message element
    postList.querySelectorAll(".post").forEach(function (el) { el.remove() });

    // show "No posts yet." only when the array is empty
    emptyMsg.style.display = posts.length === 0 ? "block" : "none";

    posts.forEach(function (item) {
        const article = document.createElement("article");
        article.className = "post";

        const h3 = document.createElement("h3");
        h3.textContent = item.title;

        const p = document.createElement("p");
        p.textContent = item.content;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", function () {
            makeEdit(item.id);
        });

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", function () {
            deletePosts(item.id);
        });

        article.append(h3, p, delBtn, editBtn);
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





