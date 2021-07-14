import { Request, Response } from 'express'
import AddLinkUseCase from '../../../domain/useCases/AddLinkUseCase'
import ListLinksUseCase from '../../../domain/useCases/ListLinksUseCase'
import LinksRepository from '../../repositories/LinksRepository'

abstract class MissingParamError {
  public static message (paramError: string): string {
    return `Missing param: ${paramError}`
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
}

export default LinkController
