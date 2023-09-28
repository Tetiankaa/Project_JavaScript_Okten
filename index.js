fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=>response.json())
        .then(users=>{
            const usersContainer = document.getElementById('usersContainer');

            users.forEach(user=>{
                const userDiv = document.createElement('div');
                userDiv.classList.add('user-div');

                const paragraphId = document.createElement('p');
                paragraphId.innerText = `ID: ${user.id}`;

                const paragraphName = document.createElement('p');
                paragraphName.innerText = `${user.name}`;

                const button = document.createElement('button');
                button.innerText = "More info about user";
                button.classList.add("user-btn")
                button.onclick = ()=>{
                    location.href = `user-details.html?id=${user.id}`
                }
                userDiv.append(paragraphId,paragraphName,button);
                usersContainer.appendChild(userDiv);
            })
        })