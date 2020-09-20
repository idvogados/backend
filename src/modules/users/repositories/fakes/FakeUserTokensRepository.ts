import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'
import { v4 as uuid } from 'uuid'
import UserToken from '../../infra/typeorm/entities/UserToken'

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = []

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken()

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      update_at: new Date()
    })

    this.userTokens.push(userToken)

    return userToken
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(user => user.token === token)
    return userToken
  }

  public async delete(id: string): Promise<void> {
    this.userTokens = this.userTokens.filter(token => token.id !== id)
  }
}

export default FakeUserTokensRepository
