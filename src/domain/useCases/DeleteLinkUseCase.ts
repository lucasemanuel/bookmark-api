import Link from '../entities/Link'
import RepositoryBase from '../repositories/RepositoryBase'

class DeleteLinkUseCase {
  constructor (private readonly linksRepository: RepositoryBase<Link>) {}

  public async execute (link: Link): Promise<void> {
    await this.linksRepository.delete(link)
  }
}

export default DeleteLinkUseCase
