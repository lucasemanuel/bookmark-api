import Link from '../entities/Link'
import RepositoryBase from '../repositories/RepositoryBase'

class ListLinksUseCase {
  constructor (private readonly linksRepository: RepositoryBase<Link>) {}

  public async execute (): Promise<Link[]> {
    const links = await this.linksRepository.findAll()
    return links
  }
}

export default ListLinksUseCase
