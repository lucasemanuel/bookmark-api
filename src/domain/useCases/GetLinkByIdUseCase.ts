import Link from '../entities/Link'
import RepositoryBase from '../repositories/RepositoryBase'

class GetLinkByIdUseCase {
  constructor (private readonly linksRepository: RepositoryBase<Link>) {}

  public async execute (id: string): Promise<Link | null> {
    const link = await this.linksRepository.findById(id)
    return link
  }
}

export default GetLinkByIdUseCase
