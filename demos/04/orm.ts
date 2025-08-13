import "reflect-metadata"

const TABLE_NAME_KEY = Symbol("tableName")
const COLUMN_NAME_KEY = Symbol("columnName")
const PRIMARY_KEY_KEY = Symbol("primaryKey")

function Table(name: string) {
  return (target: Function) => {
    Reflect.defineMetadata(TABLE_NAME_KEY, name, target)
  }
}

function Column(name: string) {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata(
      COLUMN_NAME_KEY,
      name,
      target.constructor,
      propertyKey
    )
    Reflect.defineMetadata(COLUMN_NAME_KEY, name, target, propertyKey)
  }
}

function PrimaryKey() {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata(
      PRIMARY_KEY_KEY,
      true,
      target.constructor,
      propertyKey
    )
    Reflect.defineMetadata(PRIMARY_KEY_KEY, true, target, propertyKey)
  }
}

class ORM {
  private getTableName(target: Function): string {
    const tableName = Reflect.getMetadata(TABLE_NAME_KEY, target)
    return tableName
  }

  private getColumnName(target: Function, propertyKey: string): string {
    let columnName = Reflect.getMetadata(COLUMN_NAME_KEY, target, propertyKey)
    if (!columnName) {
      columnName = Reflect.getMetadata(
        COLUMN_NAME_KEY,
        target.prototype,
        propertyKey
      )
    }
    return columnName
  }

  private isPrimaryKey(target: Function, propertyKey: string): boolean {
    let isPrimary = Reflect.getMetadata(PRIMARY_KEY_KEY, target, propertyKey)
    if (isPrimary === undefined) {
      isPrimary = Reflect.getMetadata(
        PRIMARY_KEY_KEY,
        target.prototype,
        propertyKey
      )
    }
    return isPrimary || false
  }

  generateCreateTableSQL(target: Function): string {
    const tableName = this.getTableName(target)
    const properties = Object.getOwnPropertyNames(target.prototype).filter(
      (name) => name !== "constructor"
    )

    if (properties.length === 0) {
      const instance = new (target as any)()
      const instanceProperties = Object.keys(instance)
      properties.push(...instanceProperties)
    }

    const columns = properties
      .map((prop) => {
        const columnName = this.getColumnName(target, prop)
        const isPrimary = this.isPrimaryKey(target, prop)
        return `${columnName} ${isPrimary ? "INTEGER PRIMARY KEY" : "TEXT"}`
      })
      .filter((col) => col.split(" ")[0] !== "undefined")

    return `CREATE TABLE ${tableName} (${columns.join(", ")});`
  }

  generateInsertSQL(target: Function, instance: any): string {
    const tableName = this.getTableName(target)
    const properties = Object.getOwnPropertyNames(target.prototype).filter(
      (name) => name !== "constructor"
    )

    if (properties.length === 0) {
      properties.push(...Object.keys(instance))
    }

    const columns = properties
      .map((prop) => this.getColumnName(target, prop))
      .filter((col) => col !== undefined)
    const values = properties.map((prop) => `'${instance[prop]}'`)

    return `INSERT INTO ${tableName} (${columns.join(
      ", "
    )}) VALUES (${values.join(", ")});`
  }
}

@Table("users")
class User {
  @PrimaryKey()
  @Column("id")
  id: number

  @Column("name")
  name: string

  @Column("email")
  email: string

  constructor(id: number, name: string, email: string) {
    this.id = id
    this.name = name
    this.email = email
  }
}

const orm = new ORM()

const user = new User(1, "John Doe", "john@example.com")
console.log(orm.generateInsertSQL(User, user))
