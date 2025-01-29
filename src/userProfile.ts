class UserProfile {
  name: string;
  age: number;
  email: string;
  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
  }
  greet() {
    return ` my name is ${this.name}
    `;
  }
}

const user = new UserProfile('John Doe', 30, 'john.doe@example.com');

console.log(user);
console.log(user.greet());

const user2 = new UserProfile('Jane Smith', 25, 'jane.smith@example.com');

console.log(user2);

export class PasswordUtility {
  /**
   *
   * @param password hekko password
   * @returns
   */
  validPassword(password: string): boolean {
    return password.length >= 8;
  }
  strongPassword(password: string): boolean {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }
  checkPasswordComplexity(password: string): string {
    if (this.strongPassword(password)) {
      return 'strong';
    } else if (this.validPassword(password)) {
      return 'medium';
    } else {
      return 'weak';
    }
  }

  /**
   *
   * @param password hekko password
   * @returns true if password is a valid password, false otherwise
   */
  generatePassword(length: number): string {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const at = Math.floor(Math.random() * charset.length);
      password += charset.charAt(at);
    }
    return password;
  }
}

class Auth{
    login(email: string, password: string): boolean {
        // Implement login logic here
        return true;
    }
    register(email: string, password: string): boolean {
        // Implement registration logic here
        return true;
    }
    forgotPassword(email: string): boolean {
        // Implement forgot password logic here
        return true;
    }
    changePassword(email: string, oldPassword: string, newPassword: string): boolean {
        // Implement change password logic here
        return true;
    }
    resetPassword(token: string, newPassword: string): boolean {
        // Implement reset password logic here
        return true;
    }
    logout(email: string): boolean {
        // Implement logout logic here
        return true;
    }
    verifyEmail(token: string): boolean {
        // Implement email verification logic here
        return true;
    }
    sendVerificationEmail(email: string): boolean {
        // Implement sending verification email logic here
        return true;
    }
    sendResetPasswordEmail(email: string): boolean {
        // Implement sending reset password email logic here
        return true;
    }
    changeEmail(email: string, newEmail: string): boolean {
        // Implement change email logic here
        return true;
    }
    deleteAccount(email: string, password: string): boolean {
        // Implement delete account logic here
        return true;
    }
    changePasswordByRecoveryToken(token: string, newPassword: string): boolean {
        // Implement change password by recovery token logic here
        return true;
    }

    
    
}
