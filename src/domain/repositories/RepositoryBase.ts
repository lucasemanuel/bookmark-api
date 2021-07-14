import DTO from '../dtos/DTO'

interface RepositoryBase<T> {
  findAll(): Promise<T[]>
  insert(data: DTO): Promise<T>
}

export default RepositoryBase
