import { Collection, MongoClient, ObjectId } from 'mongodb'

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

  public static generateObjectId (id: string): ObjectId {
    return new ObjectId(id)
  }
}

export default MongoDB
export const database = new MongoDB()
