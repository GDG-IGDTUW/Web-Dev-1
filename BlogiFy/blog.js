  document.getElementById("blog-form").addEventListener("submit", function (e) {
    e.preventDefault(); 
  
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const image = document.getElementById("image").files[0];
  
    const blogPost = {
      title: title,
      content: content,
      date: new Date().toLocaleString(),
      image: image ? URL.createObjectURL(image) : null,
    };
  
    let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
  
    posts.push(blogPost);
  
    localStorage.setItem("blogPosts", JSON.stringify(posts));
  
    alert("Blog posted successfully!");
    window.location.href = "index.html"; 
  });
  
  document.getElementById("category").addEventListener("change", function () {
    const category = this.value;
    const saveBtn = document.getElementById("save-btn");
    const shareSecretBtn = document.getElementById("share-secret-btn");
  
    if (category === "secret") {
      saveBtn.style.display = "none"; 
      shareSecretBtn.style.display = "inline-block"; 
    } else {
      saveBtn.style.display = "inline-block"; 
      shareSecretBtn.style.display = "none"; 
    }
  });
  
  
  document.getElementById("share-secret-btn").addEventListener("click", function (e) {
    e.preventDefault();
  
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const image = document.getElementById("image").files[0];
  
    if (!title || !content) {
      alert("Please fill out the title and content fields!");
      return;
    }
  
    const secretPost = {
      title: title,
      content: content,
      date: new Date().toLocaleString(),
      image: image ? URL.createObjectURL(image) : null,
    };
  
    let secrets = JSON.parse(localStorage.getItem("secretPosts")) || [];
    secrets.push(secretPost);
    localStorage.setItem("secretPosts", JSON.stringify(secrets));
  
    alert("Secret shared successfully!");
  });
  