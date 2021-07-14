import { v4 as uuidv4 } from 'uuid'

class Link {
  public readonly id: string

  public title: string
  public url: string

  constructor (title: string, url: string, id?: string) {
    this.title = title
    this.url = url
    this.id = id || uuidv4()
  }
}

export default Link
