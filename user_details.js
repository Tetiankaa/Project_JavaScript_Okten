const url = new URL(location.href);
const id = JSON.parse(url.searchParams.get('id'));

const userContainer = document.getElementById('user-info-container');
fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(response => response.json())
    .then(user => {

        const divForUl = document.createElement('div');
        const ul = document.createElement('ul');
        divForUl.classList.add('user-info');
        divForUl.appendChild(ul);
        userBuilder(user, ul);

        const buttonTitleOfPosts = document.createElement('button');
        buttonTitleOfPosts.innerText = "Posts of current user";
        buttonTitleOfPosts.classList.add('btn-posts')
        buttonTitleOfPosts.onclick = () => {
            getPostsTitle();
            buttonTitleOfPosts.disabled = true;
        }
        userContainer.append(divForUl, buttonTitleOfPosts);
    })

function userBuilder(userObject, ulList) {
    for (const key in userObject) {
        if (typeof userObject[key] === 'object') {
            ulBuilder(key, userObject[key], ulList)
        } else {
            liBuilder(key, userObject[key], ulList)
        }
    }
}

function liBuilder(key, value, tag) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerText = `${key}`;
    const valueText = document.createTextNode(`: ${value}`)
    li.append(span, valueText);
    tag.appendChild(li);
}

function ulBuilder(key, value, tag) {
    const ul = document.createElement('ul');
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerText = `${key}`;
    li.append(span, ul);
    tag.appendChild(li);
    userBuilder(value, ul);
}

async function getPostsTitle() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`);
    const postTitles = await response.json()

    const postsDiv = document.createElement('div');
    postsDiv.classList.add('post-titles');
    userContainer.appendChild(postsDiv);

    postTitles.forEach(post => {
        const div = document.createElement('div');
        div.classList.add('title-div')
        const title = document.createElement('p');
        title.innerText = `${post.title}`
        const button = document.createElement('button');
        button.innerText = 'Read more';
        button.classList.add('btn-see-comment');
        button.onclick = () => {
            location.href = `post-details.html?value=` + JSON.stringify(post);
        }
        div.append(title, button);
        postsDiv.appendChild(div);
    })


}