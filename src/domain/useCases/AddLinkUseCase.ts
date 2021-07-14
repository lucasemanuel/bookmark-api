import Link from '../entities/Link'
import LinkDTO from '../dtos/LinkDTO'
import RepositoryBase from '../repositories/RepositoryBase'

class AddLinkUseCase {
  constructor (private readonly linksRepository: RepositoryBase<Link>) {}

  public async execute (data: LinkDTO): Promise<Link> {
    const link = await this.linksRepository.insert(data)
    return link
  }
}

export default AddLinkUseCase
