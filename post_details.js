const url = new URL(location.href);
const post = JSON.parse(url.searchParams.get('value'));

const postContainer = document.getElementById('post-container');

function createParagraphWithSpan(key,value) {
    const p = document.createElement('p');
    const span = document.createElement('span');
    span.innerText = `${key}: `;
    const textValue = document.createTextNode(`${value}`);
    p.append(span, textValue);
    return p;
}
function postInfo(){
    const postDiv = document.createElement('div');

    for (const key in post) {
     postDiv.appendChild(createParagraphWithSpan(key,post[key]))
    }
    postContainer.appendChild(postDiv);
}
async function renderComments(){
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
    const comments = await response.json();

    comments.forEach(comment=>{
        const commentDiv = document.createElement('div');

        for (let key in comment) {
            commentDiv.appendChild(createParagraphWithSpan(key,comment[key]));
        }
        postContainer.appendChild(commentDiv);
    })
}

postInfo();
void renderComments();


