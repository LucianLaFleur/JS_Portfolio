class Github {
  constructor() {
    this.client_id = '1cc2c554e3e8b9cf3d10';
    this.client_secret = '351ab0869dc3d365d711a0e08eac854dc79fb9b5';
    this.repos_count = 5;
    this.repos_sort = 'created: asc';
  }

  async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    // use constructed vars for count and sort to limit to the 5 most recent repos being displayed
    const repoResponse = await fetch
    (`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);


    const profile = await profileResponse.json();
    const repos = await repoResponse.json();
    // return an object I think?
    return {
      // profile: profile
      // if same, just single word is acceptable
      profile,
      repos
    }
  }
}