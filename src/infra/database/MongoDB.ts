import { Collection, MongoClient } from 'mongodb'

class MongoDB {
  private client: any

  public async connect (mongo_url: string): Promise<void> {
    this.client = await MongoClient.connect(mongo_url)
  }

  public getCollection (name: string): Collection {
    const db = this.client.db()
    return db.collection(name)
  }

  public async disconnect (): Promise<void> {
    await this.client.close()
  }
}

export default MongoDB
export const database = new MongoDB()
