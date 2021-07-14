import { Request, Response } from 'express'
import AddLinkUseCase from '../../../domain/useCases/AddLinkUseCase'
import LinksRepository from '../../repositories/LinksRepository'

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
}

abstract class MissingParamError {
  public static message (paramError: string): string {
    return `Missing param: ${paramError}`
  }
}

export default LinkController
