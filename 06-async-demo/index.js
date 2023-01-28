console.log('before');
getUser(1, displayUser);
console.log('after');

function displayRepos(repos){
    console.log('Repositories ', repos);
}

function displayUser(user){
    console.log('User retrived ', user);
    getRepositories(user.githubusername, displayRepos);
}

function getUser(id, callback){
    setTimeout(()=>{
        console.log('Reading the user from the database ...');
        callback({id: id, githubusername: 'jma'});
    }, 2000);
}

function getRepositories(username, callback){
    setTimeout(()=>{
        console.log('Getting repositories ...');
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}