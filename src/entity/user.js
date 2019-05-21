class User {
    constructor(user) {
        this.user = user;
    }

    get email() {
        return this.user.email;
    }

    get password() {
        return this.user.password;
    }

    get username() {
        return this.user.username;
    }

    get id() {
        return this.user.id;
    }
}

module.exports = User;