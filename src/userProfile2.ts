// class UserProfile {
//   private _name: string;
//   constructor(name: string) {
//     this._name = name;
//   }
//   //   getName() {
//   //     return this._name;
//   //   }
//   //   setName(name: string) {
//   //     this._name = name;
//   //   }
//   get name() {
//     return this._name;
//   }
//   set name(name: string) {
//     this._name = name;
//   }
// }
// // Access modifiers
// // private, public, protected

// const user = new UserProfile('Mostakem');
// user.name = 'Mostakem';
// console.log(user);

class UserProfile2 {
  private ssn: string;
  public readonly userId: string;
  private _email: string;
  constructor(
    ssn: string,
    public name: string,
  ) {
    this.ssn = ssn;
    this.userId = this.generatedUserId();
    this._email = '';
  }

  //method
  public describe(): string {
    return `Name: ${this.name}, UserId: ${this.userId}, SSN: ${this.ssn}`;
  }

  private generatedUserId(): string {
    return `${this.name}-${Math.floor(Math.random() * 1000)}`;
  }

  get email(): string {
    return this._email;
  }

  set email(newEmail: string) {
    if (newEmail.includes('@')) {
      this._email = newEmail;
    } else {
      console.log('Invalid email');
    }
  }
}

// usage
const userProfile2 = new UserProfile2('123-45-6789', 'John Doe');
console.log(userProfile2.describe());
userProfile2.email = 'johndoe@example.com';
console.log(userProfile2.describe());
userProfile2.email = 'johndoe';
console.log(userProfile2.describe());
