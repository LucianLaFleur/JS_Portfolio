// broken/ doesn't work

const data = [
  {
    name: 'Adam Lamb',
    age: 23,
    gender: 'male',
    lookingfor: 'female',
    location: 'New York NY',
    image: 'https://randomuser.me/api/portraits.men/33.jpg'
  },
  {
    name: 'Betty Prator',
    age: 29,
    gender: 'female',
    lookingfor: 'male',
    location: 'New York NY',
    image: 'https://randomuser.me/api/portraits.women/12.jpg'
  },
  {
    name: 'Candice Ewin',
    age: 34,
    gender: 'female',
    lookingfor: 'male',
    location: 'New York NY',
    image: 'https://randomuser.me/api/portraits.women/34.jpg'
  }
];

const profiles = profileIterator(data);

// next event:
document.getElementById('next').addEventListener('click', nextProfile);

// next profile display
function nextProfile() {
  const currentProfile = profiles.next().value;

  if(currentProfile !== undefined) {
    document.getElementById('profileDisplay').innerHTML = `
    <ul class="list-group">
      <li class="list-group-item>Number: ${currentProfile}</li>
      <li class="list-group-item">Name: ${currentProfile.name}</li>
      <li class="list-group-item">Age: ${currentProfile.age}</li>
      <li class="list-group-item">Location: ${currentProfile.location}</li>
      <li class="list-group-item">Preference:: ${currentProfile.gender} looking for ${currentProfile.lookingfor}</li>
    </ul>
    `;

    document.getElementById('imageDisplay').innerHTML = `<img src="${currentProfile.image}">`;
  } else {
    // Out of profiles, just reload the page
    window.location.reload();
  }
}

// Profile iterator
function profileIterator(profiles) {
  let nextIndex = 0;
  // above is like a counter
  return {
    next: function() {
      return nextIndex < profiles.length ? 
      {value: profiles[nextIndex++], done: false } :
      {done : true}
    }
  };
}