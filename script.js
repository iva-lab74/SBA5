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

    // function to add it 
    
    






