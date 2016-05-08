export class SafeToken<T> {
    constructor(private name: string){}

    toString() {
        return `Token ${this.name}`
    }
}