class UI {
  constructor() {
    this.profile = document.getElementById('profile');
  }
// example in image shows how to extract data from the profile object by using a key to get related value data. Displays the profile in UI.
  showProfile(user) {
    this.profile.innerHTML = `
    <div class="card card-body mb-3">
      <div class="row'>
        <div class="col-md-3">
          <img class="img-fluid mb-2" src="${user.avatar_url}">
          <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
        </div>
        <div class="col-md-9">
          <span class="badge badge-primary">Public Repos:${user.public_repos}</span>
          <span class="badge badge-primary">Public Gists:${user.public_gists}</span>
          <span class="badge badge-primary">Followers:${user.followers}</span>
          <span class="badge badge-primary">Following:${user.following}</span>
          <br><br>
          <ul class="list-group">
            <li class"list-group-item">Company: ${user.company}</li>
            <li class"list-group-item">Website/Blog: ${user.blog}</li>
            class"list-group-item">Location: ${user.location}</li>
            class"list-group-item">Member since: ${user.created_at}</li>
          </ul>
        </div>
      </div>
    </div>
    <h3 class="page-heading mb-3">Latest Repos</h3>
    <div id="repos"></div>
  `;
  }
// show user repos
showRepos(repos) {
  let output = '';
  repos.forEach(function(repo) {
    output += `
    <div class="card card-body mb-2">
      <div class="row">
        <div class="col-md-6">
          <a href="${repo.html_url}" target="_blank">${repo.name}
          </a>
          </div>
          <div class="col-md-6">
          <span class="badge badge-primary">Public Stars:${user.stargazers_count}</span>
          <span class="badge badge-primary">Watchers:${user.watchers_count}</span>
          <span class="badge badge-primary">Forks:${user.forms_count}</span>
          </div>
        </div>
      </div>
    `;  
  });
  // output repos
  document.getElementById('repos').innerHTML = output;
}

  // show the alert message
  showAlert(message, className) {
    // Clear remaining alerts before showing another one (prevents alerts from stacking up)
    this.clearAlert();
    // make div with a class
    const div = document.createElement('div');
    div.className = className;
    //  add test within the div
    div.appendChild(document.createTextNode(message));
    // get parent
    const container = document.querySelector('.searchContainer');
    const search = document.querySelector('.search');
    // insert the new div (the alert) before the search class
    container.insertBefore(div, search); 
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }
  
// clear alert message
clearAlert() {
  const currentAlert = document.querySelector('.alert');
  if(currentAlert){
    currentAlert.remove();
  }
}

  // clear the profile info
  clearProfile() {
    this.profile.innerHTML = '';
  }
}
