export let SERVER_URL = 'http://localhost:9090';

// export let SERVER_URL = 'http://localhost:8080';

export class ConfigRoute {
  /*----------------------------------------------------------------------------------------------------------*/
  /* ------------------------------------------- CONTROLLER ADMIN ------------------------------------------- */
  /*----------------------------------------------------------------------------------------------------------*/
  static authenticate() { // POST: api/users/authenticate
    return `api/users/authenticate`;
  }

  static getAllUsers() { // GET: api/users/?uid=CF
    return `api/users/`;
  }

  static filterUsers() {// GET: api/users/filter/?uid=CF
    return `api/users/filter/`;
  }

  /*static getUserProfile(id: string) {// GET: api/users/{id}/?uid=CF
    return `api/users/${id}/`;
  }*/

  static deleteUser(id: string) {// DELETE: api/users/{id}/?uid=CF
    return `api/users/${id}/`;
  }

  static createUser() {// POST: api/users/?uid=CF
    return `api/users/`;
  }

  static updateUser(id: string) {// PUT: api/users/{id}/?uid=CF
    return `api/users/${id}/`;
  }


  /*----------------------------------------------------------------------------------------------------------*/
  /*-------------------------------------------- CONTROLLER USER -------------------------------------------- */

  /*----------------------------------------------------------------------------------------------------------*/
  static getProfile(uid: string) {// GET: api/users/{uid}
    return `api/users/${uid}`;
  }

  static getUserRequests(uid: string) {// GET: api/users/{uid}/requests
    return `api/users/${uid}/requests`;
  }

  static filterUserRequests(uid: string) {// POST: api/users/{uid}/requests/filter
    return `api/users/${uid}/requests/filter`;
  }

  static getSelectUserRequest(uid: string, id: string) {// GET: api/users/{uid}/requests/{id}
    return `api/users/${uid}/requests/${id}`;
  }

  static createRequest(uid: string) {// POST: api/users/{uid}/requests
    return `api/users/${uid}/requests`;
  }

  static updeteRequest(uid: string, id: string) {//  PUT: api/users/{uid}/requests/{id}
    return `api/users/${uid}/requests/${id}`;
  }

  static subscribeRequest(uid: string, id: string) {// GET: api/users/{uid}/requests/{id}/subscribe
    return `api/users/${uid}/requests/${id}/subscribe`;
  }

  /*----------------------------------------------------------------------------------------------------------*/
  /*----------------------------------------- CONTROLLER RESPONSIBLE -----------------------------------------*/
  /*----------------------------------------------------------------------------------------------------------*/
  static getAllRequests() {// GET: api/requests/?uid=CF
    return `api/requests/`;
  }

  static filterRequests() {// POST: api/requests/filter/?uid=CF
    return `api/requests/filter/`;
  }

  static getSelectRequest(id: string) {// GET: api/requests/{id}/?uid=CF
    return `api/requests/${id}/`;
  }

  static deleteRequest(id: string) { // DELETE: api/requests/{id}/?uid=CF
    return `api/requests/${id}/`;
  }

  static validateRequest(id: string) {// PUT: api/requests/{id}/?uid=CF
    return `api/requests/${id}/`;
  }
}
