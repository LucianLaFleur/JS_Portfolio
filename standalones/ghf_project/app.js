//  Init Github
const github = new Github
//  init theUI class
const ui = new UI

// Search input
const searchUser = document.getElementById('searchUser');

// Search input event listener
searchUser.addEventListener('keyup', (e) => {
  // get input text by extracting value
  const userText = e.target.value;
  // validate to make sure value is not empty
  if(userText !== '') {
  // make http call
    github.getUser(userText).then(data => {
      // target the object's message to identify a missing user from query
      if(data.profile.message === 'Not found') {
  // show alert
      ui.showAlert('User not found', 'alert alert-danger') 
      } else {
  // show profile
  // target the user from the data returned by github
        ui.showProfile(data.profile);
        ui.showRepos(data.repos);
      }
  })
  } else {
    // clear profile to make it disappear
    ui.clearProfile();
  }
});