class MockInput {
    constructor() {
      this.username = '';
    }
  
    set_username(username) {
      this.username = username;
    }
  
    get_username() {
      return this.username;
    }
  }
  
  export default MockInput;
  