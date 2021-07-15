import DTO from '../dtos/DTO'
import Link from '../entities/Link'

interface RepositoryBase<T> {
  findAll(): Promise<T[]>
  insert(data: DTO): Promise<T>
  findById(id: string): Promise<T | null>
  delete(link: Link): Promise<void>
}

export default RepositoryBase
