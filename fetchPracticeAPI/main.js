let arrayOfPosts;

// this function is going to make a fetch request to the url inside it's parameter brackets (). Then it will turn the response (data it's getting back), saved here as res. The res.json will not be saved as posts and saved into the variable, arrayOfPosts
const getPosts = () => {
  fetch('http://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(posts => arrayOfPosts = posts)
}

const fetchFivePosts = () => {
  fetch('http://jsonplaceholder.typicode.com/posts?_limit=5')
    .then(res => res.json())
    .then(posts => arrayOfPosts = posts)
}


const getComments = () => {
  fetch('http://jsonplaceholder.typicode.com/comments')
    .then(res => res.json())
    .then(posts => arrayOfPosts = posts)
}

const displayComments = () => {
  clearDisplay();
  const allPosts = document.getElementById('all-posts')
  arrayOfPosts.map((post) => {
    const li = document.createElement('li')
    const text = document.createTextNode(`#${post.id}, Name: ${post.name}:  ${post.body}, by user: ${post.email}`)
    li.appendChild(text)
    allPosts.append(li)
  })
}

const getUsers = () => {
  fetch('http://jsonplaceholder.typicode.com/users')
  .then(res => res.json())
  .then(posts => arrayOfPosts = posts)
}

const displayUsers = () => {
  clearDisplay();
  const allPosts = document.getElementById('all-posts')
  arrayOfPosts.map((post) => {
    const li = document.createElement('li')
    const text = document.createTextNode(`#${post.id}, 
    Name: ${post.name}
    UserName: ${post.username}
    Email: ${post.email}
    Address: ${post.address.street} ${post.address.suite} ${post.address.city} ${post.address.zipcode}`)
    li.appendChild(text)
    allPosts.append(li)
  })
}

const newPost = () => {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json))
}

const editPost = () => {
  fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'PUT',
    body: JSON.stringify({
      id: 1,
      title: 'foo',
      body: 'bar',
      userId: 1
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json))
}

// this function logs the results in your browsers console
const consolePosts = () => {
  console.log(arrayOfPosts)
}

// this function creates elements inside the all-posts ul, then appends text inside it with the posts that were returned in the request.
const displayPost = () => {
  clearDisplay();
  const allPosts = document.getElementById('all-posts')
  arrayOfPosts.map((post) => {
    const li = document.createElement('li')
    const text = document.createTextNode(`#${post.id}, Title: ${post.title}:  ${post.body}, by user: ${post.userId}`)
    li.appendChild(text)
    allPosts.append(li)
  })
}

const clearDisplay = () => {
  const allPosts = document.getElementById('all-posts');
  allPosts.innerHTML = '';
}

