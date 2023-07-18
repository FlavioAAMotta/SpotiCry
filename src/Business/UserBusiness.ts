import { IUserData } from "../model/InterfaceUserData";
import User from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { generateId } from "../services/IdGenerator";
import { LoginInputDTO } from "../types/loginInputDTO";
import { SignupInputDTO } from "../types/signupInputDTO";

export class UserBusiness {
  private userData: IUserData;
  private hashManager: HashManager;
  private authenticator: Authenticator;

  constructor(userDataRepository: IUserData) {
    this.userData = userDataRepository;
    this.hashManager = new HashManager();
    this.authenticator = new Authenticator();
  }
  signup = async (input: SignupInputDTO) => {
    try {
      const { name, email, password } = input;
      if (!email || !name || !password) {
        throw new Error("Campos inválidos");
      }

      const registeredUser = await this.userData.findByEmail(email);
      if (registeredUser) {
        throw new Error("Email já cadastrado");
      }

      const id = generateId();
      const hashedPassword = await this.hashManager.hash(password);
      const user = new User(id, name, email, hashedPassword);
      await this.userData.insertUser(user);
      const token = this.authenticator.generateToken({ id });
      return token;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  login = async (input: LoginInputDTO) => {
    try {
      const { email, password } = input;
      if (!email || !password) {
        throw new Error("Campos inválidos");
      }

      const user = await this.userData.findByEmail(email);
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const passwordIsCorrect = await this.hashManager.compare(
        password,
        user.password
      );
      if (!passwordIsCorrect) {
        throw new Error("Senha incorreta");
      }

      const token = this.authenticator.generateToken({ id: user.id });
      return token;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}
