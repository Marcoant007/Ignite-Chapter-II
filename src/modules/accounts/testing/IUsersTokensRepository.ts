import { ICreateUserTokensDTO } from "../dtos/ICreateUserTokensDTO";
import { UserTokens } from "../infra/typeorm/entities/UserToken";

interface IUsersTokensRepository {
    create({ user_id, expires_date, refresh_token }: ICreateUserTokensDTO): Promise<UserTokens>
}

export { IUsersTokensRepository }