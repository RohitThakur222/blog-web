document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  const loginForm = document.getElementById('login-form');
  const blogsContainer = document.getElementById('blogsContainer');
  const blogDetailsContainer = document.getElementById('blogDetailsContainer');
  const errorMessage = document.getElementById('error-message');
  const blogsList = document.getElementById('blogsList');
  const blogDetails = document.getElementById('blogDetails');
  const commentsList = document.getElementById('commentsList');
  let toastBox = document.getElementById('toastbox')
  let successMsg = '<i class="fa-solid fa-circle-check"></i> SuccessFully Login'
  let errorMsg = '<i class="fa-solid fa-circle-exclamation"></i> Invalid User or Password'

  const setUsername = 'user'; // Set the username
  const setPassword = 'password'; // Set the password

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    handleLogin();
  });
  //handel login

  function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === setUsername && password === setPassword) {
      loginForm.style.display = 'none';
      blogsContainer.style.display = 'block';
      fetchBlogs();
      showTost(successMsg)
    } else {

      showTost(errorMsg)
    }
  }
  // for toast notification
  function showTost(msg) {
    let toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = msg;
    toastBox.appendChild(toast);
    if (msg.includes('Invalid')) {
      toast.classList.add('invalid');
    }
    setTimeout(() => {
      toast.remove();
    }, 5000);


  }
  //fetching data blog.

  function fetchBlogs() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched blogs:', data); // Print fetched blogs to the console
        displayBlogs(data);
      })
      .catch((error) => console.error('Error fetching blogs:', error));
  }
  // display blog-data.

  function displayBlogs(blogs) {
    blogsList.innerHTML = '';
    blogs.forEach((blog) => {
      const blogItem = document.createElement('div');
      blogItem.className = 'blog-item';
      blogItem.innerHTML = `
        <div class=profile>
          <div>
            <img src="https://cdn-icons-png.flaticon.com/512/9783/9783993.png" alt="">
          </div>
          <div>
             <h2>ID : ${blog.id}</h2>
            <h2>USER_ID : ${blog.userId}</h2>
          
          </div>
         </div>
          
          <h3>${blog.title}:</h3>
          <p>${blog.body}.</p>
          <button  onclick="viewDetails(${blog.id})">View Details</button>
        `;
      blogsList.appendChild(blogItem);
    });
  }
  // Details tab and get all values.

  window.viewDetails = function (postId) {
    blogsContainer.style.display = 'none';
    blogDetailsContainer.style.display = 'block';
    fetchBlogDetails(postId);
    fetchComments(postId);
  };
  //fetch data.

  function fetchBlogDetails(postId) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => displayBlogDetails(data))
      .catch((error) => console.error('Error fetching blog details:', error));
  }
  // blog details.

  function displayBlogDetails(blog) {
    blogDetails.innerHTML = `
      <div class='details'>
      <div class=profile>
        <div>
          <img src="https://cdn-icons-png.flaticon.com/512/9783/9783993.png" alt="not found">
        </div>
        <div>
           <h2>ID : ${blog.id}</h2>
          <h2>USER_ID : ${blog.userId}</h2>
        
        </div>
       </div>
        
        <h3>${blog.title}</h3>
        <p>${blog.body}</p>
      </div>
      
        
      `;
  }
  // comment data fetch.

  function fetchComments(postId) {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then((response) => response.json())
      .then((data) => displayComments(data))
      .catch((error) => console.error('Error fetching comments:', error));
  }
  // comment data shown.

  function displayComments(comments) {
    commentsList.innerHTML = '';
    comments.forEach((comment) => {
      const commentItem = document.createElement('div');
      commentItem.className = 'comment-item';
      commentItem.innerHTML = `
          <h3><img src="https://cdn-icons-png.flaticon.com/512/9783/9783993.png"> @:  ${comment.email} <span> 12 days ago</span></h3>
          <h4>${comment.name} </h4>
          <p>${comment.body}</p>
          <div class='like'>
          <i class="fa-solid fa-thumbs-up"></i> <h3> 3.4k </h3> <i class="fa-solid fa-thumbs-down"></i></div>

        `;
      commentsList.appendChild(commentItem);
    });
  }
  // back to blog page.

  window.goBack = function () {
    blogDetailsContainer.style.display = 'none';
    blogsContainer.style.display = 'block';
  };
});


