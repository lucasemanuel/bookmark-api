import { Request, Response } from 'express'
import AddLinkUseCase from '../../../domain/useCases/AddLinkUseCase'
import DeleteLinkUseCase from '../../../domain/useCases/DeleteLinkUseCase'
import GetLinkByIdUseCase from '../../../domain/useCases/GetLinkByIdUseCase'
import ListLinksUseCase from '../../../domain/useCases/ListLinksUseCase'
import LinksRepository from '../../repositories/LinksRepository'

abstract class MissingParamError {
  public static message (paramError: string): string {
    return `Missing param: ${paramError}.`
  }
}

abstract class LinkController {
  public static async store (
    request: Request,
    response: Response
  ): Promise<Response> {
    const { title, url } = request.body

    if (!title)
      return response.status(400).json(MissingParamError.message('title'))
    else if (!url)
      return response.status(400).json(MissingParamError.message('url'))

    const linksRepository = new LinksRepository()
    const addLinkUseCase = new AddLinkUseCase(linksRepository)
    const link = await addLinkUseCase.execute({ title, url })

    return response.status(201).json(link)
  }

  public static async list (
    request: Request,
    response: Response
  ): Promise<Response> {
    const linksRepository = new LinksRepository()
    const listLinksUseCase = new ListLinksUseCase(linksRepository)
    const links = await listLinksUseCase.execute()

    return response.status(200).json(links)
  }

  public static async delete (
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params

    if (!id) return response.status(400).json(MissingParamError.message('id'))

    const linksRepository = new LinksRepository()
    const getLinkByIdUseCase = new GetLinkByIdUseCase(linksRepository)
    const link = await getLinkByIdUseCase.execute(id)

    if (!link) {
      return response.status(404).json('Not Found.')
    }

    const deleteLinkUseCase = new DeleteLinkUseCase(linksRepository)
    await deleteLinkUseCase.execute(link)

    return response.status(204).json()
  }
}

export default LinkController
