const url = new URL(location.href);
const post = JSON.parse(url.searchParams.get('value'));

const postContainer = document.getElementById('post-container');

function createParagraphWithSpan(key,value) {
    const p = document.createElement('p');
    const span = document.createElement('span');
    span.innerText = `${key}`;
    const textValue = document.createTextNode(`: ${value}`);
    p.append(span, textValue);
    return p;
}
function postInfo(){
    const postDiv = document.createElement('div');
    postDiv.classList.add('post-info');

    for (const key in post) {
     postDiv.appendChild(createParagraphWithSpan(key,post[key]))
    }
    postContainer.appendChild(postDiv);
}
async function renderComments(){
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
    const comments = await response.json();

    const containerComments = document.createElement('div');
    containerComments.classList.add('container-comments');
    const h1 = document.createElement('h1');
    h1.innerText = 'Comments';

    comments.forEach(comment=>{
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment-info');

        for (let key in comment) {
            commentDiv.appendChild(createParagraphWithSpan(key,comment[key]));
        }
        containerComments.appendChild(commentDiv);
        postContainer.append(h1,containerComments);
    })
}

postInfo();
void renderComments();


